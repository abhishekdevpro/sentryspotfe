
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const NotificationProvider = () => {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    const eventSourceUrl = 'https://api.sentryspot.co.uk/api/sse/notifications';
    let eventSource = null;

    console.log(eventSourceUrl, "eventSourceUrl");

    try {
      eventSource = new EventSource(eventSourceUrl, {
        withCredentials: true,
      });

      // Log when the connection is successfully opened
      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setConnectionStatus('Connected to notifications.');
      };

      // Log messages received from the server
      eventSource.onmessage = (event) => {
        try {
          // Parse the JSON string
          const parsedMessage = JSON.parse(event.data);
          
          // Show toast with just the message
          console.log(parsedMessage.message);
          toast.success(parsedMessage.message);

          // Update messages state
          setMessages((prev) => [...prev, parsedMessage]);
        } catch (parseError) {
          console.error('Error parsing message:', parseError);
          toast.error('Failed to parse notification');
        }
      };

      // Handle errors
      eventSource.onerror = () => {
        console.error('SSE connection error');
        setConnectionStatus('Failed to connect. Retrying...');
        if (eventSource) {
          eventSource.close(); // Close the connection on error
        }
      };

    } catch (error) {
      console.error('Error initializing SSE:', error);
      setConnectionStatus('Error initializing notifications.');
    }

    // Cleanup when the component unmounts
    return () => {
      if (eventSource) {
        eventSource.close();
        console.log('SSE connection closed');
      }
    };
  }, []);

  return (
    <div>
      {/* <div style={{ margin: '10px 0' }}>{connectionStatus}</div> */}
      {/* <div>
        <h4>Messages:</h4>
        {messages.length === 0 && <p>No messages received yet.</p>}
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.message} (received at {msg.created_at})
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NotificationProvider;