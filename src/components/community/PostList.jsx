import React from "react";
import Post from "./Post";

const PostList = ({
  posts,
  token,
  setLoginModal,
  confirmDeletePost,
  confirmDeleteComment,
  fetchPosts,
}) => {
  return (
    <div className="space-y-4 max-h-[80vh] min-h-[400px] overflow-y-auto pr-2" style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
          }}>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-8 bg-blue-50 rounded-lg shadow-md">
          No posts available. Be the first to post!
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            token={token}
            setLoginModal={setLoginModal}
            confirmDeletePost={confirmDeletePost}
            confirmDeleteComment={confirmDeleteComment}
            fetchPosts={fetchPosts}
          />
        ))
      )}
    </div>
  );
};

export default PostList;

