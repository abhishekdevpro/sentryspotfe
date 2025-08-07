// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Constant } from '@/utils/constant/constant';
// import DashboardCandidatesHeader from '../header/DashboardCandidatesHeader';

// const SinglePostPage = () => {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { postId } = useParams();

//   useEffect(() => {
//     const fetchSinglePost = async () => {
//       try {
//         const token = localStorage.getItem(Constant.USER_TOKEN);
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`,
//           {
//             headers: {
//               Authorization: token || '',
//             },
//           }
//         );
//         if (response.data && response.data.status === 'success') {
//           setPost(response.data.data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching single post:', error);
//         setLoading(false);
//       }
//     };
//     fetchSinglePost();
//   }, [postId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!post) {
//     return <div>Post not found</div>;
//   }

//   const postUrl = `https://sentryspotfe.vercel.app/community/${post.id}`;
//   const imageUrl = post.feed_image
//     ? `https://api.sentryspot.co.uk${post.feed_image}`
//     : 'https://sentryspotfe.vercel.app/default-og-image.png';

//   const title = `${post.user_first_name} ${post.user_last_name}'s Post`;
//   const description = post.content.substring(0, 160);

//   return (
//     <>
//       <Helmet>
//         {/* Basic Meta Tags */}
//         <title>{title}</title>
//         <meta name="description" content={description} />

//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="og:url" content={postUrl} />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:image:alt" content="Post Image" />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={title} />
//         <meta name="twitter:description" content={description} />
//         <meta name="twitter:image" content={imageUrl} />

//         {/* Additional tags to ensure proper rendering */}
//         <meta property="og:site_name" content="SentrySpot" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//       </Helmet>
//       <DashboardCandidatesHeader/>
//       <div className="max-w-xl mx-auto p-6 bg-white shadow-md">
//         <div className="flex items-center mb-4">
//           <img
//             src={post.user_photo ? `https://api.sentryspot.co.uk${post.user_photo}` : '/default-profile.jpg'}
//             alt="User Profile"
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <h2 className="font-bold text-lg">
//               {post.user_first_name} {post.user_last_name}
//             </h2>
//             <p className="text-gray-500 text-sm">
//               {new Date(post.created_at).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//         <p className="text-gray-800 mb-4">{post.content}</p>
//         {post.feed_image && (
//           <img
//             src={`https://api.sentryspot.co.uk${post.feed_image}`}
//             alt="Post"
//             className="w-full rounded-lg mb-4"
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default SinglePostPage;
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Constant } from "@/utils/constant/constant";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";
import { formatDaysAgo } from "../common/DateUtils";
import LikeButton from "./LikeButton";
import LinkedInShareButton from "./ShareButton";
import { Button } from "../ui/button";

const SinglePostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`,
          {
            headers: {
              Authorization: token || "",
            },
          }
        );
        if (response.data?.status === "success") {
          setPost(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching single post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, [postId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!post)
    return <div className="text-center mt-10 text-red-600">Post not found</div>;

  const postUrl = `https://sentryspotfe.vercel.app/community/${post.id}`;
  const imageUrl = post.feed_image
    ? `https://api.sentryspot.co.uk${post.feed_image}`
    : "https://sentryspotfe.vercel.app/default-og-image.png";

  const title = `${post.user_first_name} ${post.user_last_name}'s Post`;
  const description = post.content.substring(0, 160);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta property="og:site_name" content="SentrySpot" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <div className="h-screen flex items-center justify-center ">
        <DashboardCandidatesHeader />

        <div className="max-w-4xl mx-auto px-4">
          <Link to="/community">
            <Button
              type="button"
            >
              Back to Community
            </Button>
          </Link>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* User Info */}
            <div className="flex items-center mb-4">
              <img
                src={
                  post.user_photo
                    ? `https://api.sentryspot.co.uk${post.user_photo}`
                    : "/default-profile.jpg"
                }
                alt="User Profile"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">
                  {post.user_first_name} {post.user_last_name}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDaysAgo(post.created_at)}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-800 text-base mb-4 whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Post Image */}
            {post.feed_image && (
              <div className="mb-4">
                <img
                  src={`https://api.sentryspot.co.uk${post.feed_image}`}
                  alt="Post Visual"
                  className="w-full max-h-[500px] object-cover rounded-md"
                />
              </div>
            )}

            {/* Social Buttons */}
            <div className="flex items-center gap-6 mt-6 text-gray-500 border-t pt-4">
              {/* <button className="hover:text-blue-600 transition">👍 Like</button> */}
              <LikeButton
                post={post}
                token={localStorage.getItem(Constant.USER_TOKEN)}
                // setLoginModal={setLoginModal}
                // fetchPosts={fetchSinglePost}
              />
              <button className="hover:text-blue-600 transition">
                💬 Comment
              </button>
              <LinkedInShareButton post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
