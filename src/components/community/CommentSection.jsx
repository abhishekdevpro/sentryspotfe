import React, { useState } from "react";
import axios from "axios";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

const CommentSection = ({
  post,
  token,
  setLoginModal,
  confirmDeleteComment,
  fetchPosts,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const addComment = async () => {
    if (!token) {
      setLoginModal(true);
      // toast.error("You need to login first")
      return;
    }

    if (!commentContent.trim()) return;

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/feed/feed-comment",
        {
          feed_id: post.id,
          content: commentContent,
          isAnonymous: isCommentAnonymous,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.status === "success") {
        fetchPosts();
        setCommentContent("");
        setIsCommentAnonymous(false);
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const editComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const saveEditedComment = async () => {
    if (!token) {
      setLoginModal(true);
      return;
    }

    if (editedCommentContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.sentryspot.co.uk/api/feed/feed-comment/${editingCommentId}`,
          {
            feed_id: post.id,
            content: editedCommentContent,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          fetchPosts();
          setEditingCommentId(null);
          setEditedCommentContent("");
        } else {
          console.error("Error editing comment:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="mt-6">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <textarea
          className="w-full p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Join the conversation..."
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            {/* <input
              type="checkbox"
              id={`comment-anonymous-${post.id}`}
              checked={isCommentAnonymous}
              onChange={(e) => setIsCommentAnonymous(e.target.checked)}
              className="hidden"
            /> */}
            {/* <label
              htmlFor={`comment-anonymous-${post.id}`}
              className="flex items-center cursor-pointer text-gray-700"
            >
              <span
                className={`w-5 h-5 mr-2 border rounded ${
                  isCommentAnonymous
                    ? "bg-blue-900 border-blue-900"
                    : "border-gray-300"
                }`}
              >
                {isCommentAnonymous && (
                  <i className="fas fa-check text-white text-xs"></i>
                )}
              </span>
              Comment Anonymously
            </label> */}
          </div>
          <Button
          variant="default"
            disabled={!commentContent.trim()}
            onClick={addComment}
            className=""
          >
            Post Comment
          </Button>
        </div>
      </div>

      {/* Comment List */}
      {post.feed_comments && post.feed_comments.length > 0 && (
        <div className="space-y-3">
          {post.feed_comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-3 rounded-lg flex items-start"
            >
              <img
                src={
                  comment?.user_photo
                    ? `https://api.sentryspot.co.uk${comment.user_photo}`
                    : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
              />
              {editingCommentId === comment.id ? (
                <div className="flex-grow">
                  <textarea
                    className="w-full p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditedComment}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm text-gray-800">
                      {comment.user_first_name} {comment.user_last_name}
                    </p>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                  <div className="relative">
                    {comment.is_edit && <button
                      onClick={() => toggleDropdown(comment.id)}
                      className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <FaEllipsisV />
                    </button>
                    }

                    {openDropdownId === comment.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        {comment.is_edit && editingCommentId !== comment.id && (
                          <button
                            onClick={() => {
                              editComment(comment.id, comment.content);
                              setOpenDropdownId(null);
                            }}
                            className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                        )}
                        <button
                          onClick={() => {
                            confirmDeleteComment(post.id, comment.id);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;

