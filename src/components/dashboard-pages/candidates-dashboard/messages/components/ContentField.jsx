import React, { useEffect, useState, useRef } from 'react';
import { FaTelegram, FaUserCircle } from "react-icons/fa";
import EnhancedChatboxContactList, { getDummyImage } from './ContactList';
import SearchBox from './SearchBox';
import { Constant } from "@/utils/constant/constant";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { userInfo } = useSelector((state) => (state.auth));
  
  const handleImageError = () => {
    setImageError(true);
  };

  const loadChatMessages = async (chatUserId, lastId) => {
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/chat-user-list-messages?chat_user_id=${chatUserId}&last_message_id=${lastId}`,
        {
          headers: {
            'Authorization': `${token}`,
          }
        }
      );

      if (response.data.status === "success") {
        return response.data.data.map(msg => ({
          id: msg.id,
          content: msg.message,
          time: msg.created_at || new Date().toLocaleTimeString(),
          sender: msg.sender_id,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading older messages:', error);
      return [];
    }
  };

  const fetchChatHistory = async (chatUserId) => {
    try {
      setLoadingMessages(true);
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/chat-user-list-messages?chat_user_id=${chatUserId}&last_message_id=0`,
        {
          headers: {
            'Authorization': `${token}`,
          }
        }
      );

      if (response.data.status === "success") {
        const formattedMessages = response.data.data.map(msg => ({
          id: msg.id,
          content: msg.message,
          time: msg.created_at || new Date().toLocaleTimeString(),
          sender: msg.sender_id,
        }));
        setMessages(formattedMessages);
        if (formattedMessages.length > 0) {
          setLastMessageId(formattedMessages[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = async () => {
      if (!messagesContainerRef.current || isLoadingMore) return;

      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0 && activeUser?.chat_user_id) {
        setIsLoadingMore(true);
        const olderMessages = await loadChatMessages(activeUser.chat_user_id, lastMessageId);
        
        if (olderMessages.length > 0) {
          setMessages(prev => [...olderMessages, ...prev]);
          setLastMessageId(olderMessages[0].id);
        }
        setIsLoadingMore(false);
      }
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeUser?.chat_user_id, lastMessageId, isLoadingMore]);
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      console.log('Message received:', incomingMessage);

      // Check if message already exists to prevent duplicates
      setMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => 
          msg.id === incomingMessage.id || 
          (msg.content === incomingMessage.message && 
           msg.sender === incomingMessage.sender_id)
        );
        
        if (messageExists) {
          return prevMessages;
        }

        return [...prevMessages, {
          id: incomingMessage.id,
          content: incomingMessage.message,
          time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
          sender: incomingMessage.sender_id,
        }];
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/chat-user-list', {
          headers: {
            'Authorization': ` ${localStorage.getItem(Constant.USER_TOKEN)}`
          }
        });
        if (response.data.status === "success") {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userInfo?.token]);

  const handleSelectUser = async (user) => {
    if (!user || !user.chat_user_id) return;

    setActiveUser(user);
    setImageError(false); // Reset image error state for new user
    // Clear existing messages
    setMessages([]);
    setLastMessageId(0);
    // Fetch chat history for the selected user
    await fetchChatHistory(user.chat_user_id);
  };

  const sendMessage = () => {
    if (inputValue.trim() === '' || !activeUser || !userInfo?.id) return;

    const messageId = Date.now(); // Generate a temporary ID for optimistic update
    const data = {
      message: inputValue,
      receiver_id: activeUser.chat_user_id,
      sender_id: userInfo.id
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      
      // Optimistically add message to UI with temporary ID
      setMessages(prev => [...prev, {
        id: messageId,
        content: inputValue,
        time: new Date().toLocaleTimeString(),
        sender: userInfo.id
      }]);
      
      console.log('Message sent:', data);
      setInputValue('');
    } else {
      console.error('WebSocket is not open');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-blue-100 shadow-lg">
        <div className="search-box-one p-2">
          <SearchBox onSearch={(searchTerm) => {
            // Reset users to original list when search is cleared
            if (!searchTerm.trim()) {
              const fetchUsers = async () => {
                try {
                  const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/chat-user-list', {
                    headers: {
                      'Authorization': ` ${localStorage.getItem(Constant.USER_TOKEN)}`
                    }
                  });
                  if (response.data.status === "success") {
                    setUsers(response.data.data);
                  }
                } catch (error) {
                  console.error('Error fetching users:', error);
                }
              };
              fetchUsers();
              return;
            }

            // Filter users based on search term
            const filteredUsers = users.filter(user => {
              const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
              const email = (user.email || '').toLowerCase();
              return fullName.includes(searchTerm) || email.includes(searchTerm);
            });
            setUsers(filteredUsers);
          }} />
        </div>
        <EnhancedChatboxContactList 
          onSelectUser={handleSelectUser}
          activeUserId={activeUser?.chat_user_id}
          users={users}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-sm flex items-center border-b border-blue-100">
              <img
                src={!imageError && activeUser.photo ? activeUser.photo : getDummyImage(`${activeUser.first_name} ${activeUser.last_name}`)}
                alt="User avatar"
                className="w-12 h-12 rounded-full mr-4 object-cover"
                onError={handleImageError}
              />
              <div>
                <h2 className="text-lg font-semibold text-blue-800">
                  {activeUser.first_name} {activeUser.last_name || ''}
                </h2>
                <p className="text-sm text-green-500">Online</p>
              </div>
              {activeUser.email && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {activeUser.email}
                </span>
              )}
            </div>

            {/* Messages Display */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 bg-blue-50 scrollbar-custom"
            >
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {isLoadingMore && (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === userInfo?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          max-w-xs p-3 rounded-xl shadow-sm
                          ${msg.sender === userInfo?.id 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white text-blue-800 border border-blue-100 rounded-bl-none'}
                        `}>
                          <p className={`break-words ${msg.sender === userInfo?.id ? 'text-white' : 'text-blue-800'}`}>
                            {msg.content}
                          </p>
                          <div className={`text-xs text-opacity-70 text-right mt-1 
                            ${msg.sender === userInfo?.id ? 'text-blue-200' : 'text-blue-500'}
                          `}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <svg className="w-16 h-16 mb-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-blue-100">
              <div className="flex items-center space-x-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaUserCircle size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button 
                  onClick={sendMessage}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <FaTelegram size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No active chat
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <svg className="w-24 h-24 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a job seeker from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBoxContentField;