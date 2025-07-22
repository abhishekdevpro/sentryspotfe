
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCreation from "./PostCreation";
import PostList from "./PostList";
import ConfirmationDialog from "./ConfirmationDialog";
import { Constant } from "@/utils/constant/constant";
import { LoginModal } from "../ui/LoginModal";

const FeedSection = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem(Constant.USER_TOKEN));
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    type: null,
    id: null,
    commentId: null,
  });
  const [loginModal, setLoginModal] = useState(false);

  const url = token
    ? "https://api.sentryspot.co.uk/api/feed/pro/feeds"
    : "https://api.sentryspot.co.uk/api/feed/feeds";

  const fetchPosts = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data && Array.isArray(response.data.data.feed_data)) {
        setPosts(response.data.data.feed_data);
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [posts.length]);

  const addPost = async (content, image, isAnonymous) => {
    if (!token) {
      setLoginModal(true);
      return;
    }
    if (content.trim()) {
      try {
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
          const imageBlob = await fetch(image).then((r) => r.blob());
          formData.append("image_upload", imageBlob, "uploaded-image.jpg");
        }

        const response = await axios.post(
          "https://api.sentryspot.co.uk/api/feed/feed-create",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          const newPost = response.data.data;
          setPosts([newPost, ...posts]);
        } else {
          console.error("Error creating post:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const deletePost = async () => {
    const { type, id, commentId } = confirmationDialog;

    try {
      let endpoint;

      if (commentId) {
        endpoint = `https://api.sentryspot.co.uk/api/feed/feed/comment/${id}/${commentId}`;
      } else {
        endpoint = `https://api.sentryspot.co.uk/api/feed/feed/${id}`;
      }

      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data && response.data.status === "success") {
        fetchPosts();
        if (commentId) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === id
                ? {
                    ...post,
                    feed_comments: post.feed_comments.filter(
                      (comment) => comment.id !== commentId
                    ),
                  }
                : post
            )
          );
        } else {
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        }

        setConfirmationDialog({
          isOpen: false,
          type: null,
          id: null,
          commentId: null,
        });
      } else {
        console.error("Error deleting:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const confirmDeletePost = (postId) => {
    setConfirmationDialog({
      isOpen: true,
      type: "post",
      id: postId,
      commentId: null,
    });
  };

  const confirmDeleteComment = (postId, commentId) => {
    setConfirmationDialog({
      isOpen: true,
      type: "comment",
      id: postId,
      commentId: commentId,
    });
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: false,
      type: null,
      id: null,
      commentId: null,
    });
  };

  return (
    <div className="mx-auto px-4 py-6 bg-gray-50">
      <PostCreation addPost={addPost} token={token} setLoginModal={setLoginModal} />
      <PostList
        posts={posts}
        token={token}
        setLoginModal={setLoginModal}
        confirmDeletePost={confirmDeletePost}
        confirmDeleteComment={confirmDeleteComment}
        fetchPosts={fetchPosts}
      />
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmationDialog}
        onConfirm={deletePost}
        title={
          confirmationDialog.type === "post"
            ? "Delete Post"
            : "Delete Comment"
        }
        message={
          confirmationDialog.type === "post"
            ? "Are you sure you want to delete this post? This action cannot be undone."
            : "Are you sure you want to delete this comment? This action cannot be undone."
        }
        
      />
      {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}

    </div>
  );
};

export default FeedSection;


