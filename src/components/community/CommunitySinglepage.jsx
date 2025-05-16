
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Constant } from '@/utils/constant/constant';

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

//   // Debugging helper function
//   const debugMetaTags = () => {
//     console.log('Post data:', post);
//     const metaTags = document.querySelectorAll('meta');
//     metaTags.forEach(tag => {
//       if (tag.getAttribute('property')?.startsWith('og:') || 
//           tag.getAttribute('name')?.startsWith('twitter:')) {
//         console.log(
//           `Meta Tag - Property/Name: ${tag.getAttribute('property') || tag.getAttribute('name')}, 
//           Content: ${tag.getAttribute('content')}`
//         );
//       }
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!post) {
//     return <div>Post not found</div>;
//   }

//   // More robust image URL handling
//   const postUrl = `https://sentryspotfe.vercel.app/community/${post.id}`;
//   const imageUrl = post.feed_image 
//     ? `https://api.sentryspot.co.uk${post.feed_image
//       ? post.feed_image 
//       : `/${post.feed_image}`}` 
//     : 'https://yourwebsite.com/default-og-image.png';

//   // Call debugging function
//   debugMetaTags();
  
//   return (
//     <>
//       <Helmet>
//         {/* Explicitly set meta tags */}
//         <title>{`${post.user_first_name} ${post.user_last_name}'s Post`}</title>
//         <meta name="description" content={post.content.substring(0, 160)} />
        
//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={`Post by ${post.user_first_name} ${post.user_last_name}`} />
//         <meta property="og:description" content={post.content.substring(0, 160)} />
//         <meta property="og:url" content={postUrl} />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:image:alt" content="Post Image" />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`Post by ${post.user_first_name} ${post.user_last_name}`} />
//         <meta name="twitter:description" content={post.content.substring(0, 160)} />
//         <meta name="twitter:image" content={imageUrl} />
//       </Helmet>

//       {/* Rest of the component remains the same */}
//       <div className="max-w-xl mx-auto p-6 bg-white shadow-md">
//         <div className="flex items-center mb-4">
//           <img
//             src={post.user_photo || 'default-profile.jpg'}
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

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Constant } from '@/utils/constant/constant';
import DashboardCandidatesHeader from '../header/DashboardCandidatesHeader';

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
              Authorization: token || '',
            },
          }
        );
        if (response.data && response.data.status === 'success') {
          setPost(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching single post:', error);
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const postUrl = `https://sentryspotfe.vercel.app/community/${post.id}`;
  const imageUrl = post.feed_image 
    ? `https://api.sentryspot.co.uk${post.feed_image}`
    : 'https://sentryspotfe.vercel.app/default-og-image.png';

  const title = `${post.user_first_name} ${post.user_last_name}'s Post`;
  const description = post.content.substring(0, 160);

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content="Post Image" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Additional tags to ensure proper rendering */}
        <meta property="og:site_name" content="SentrySpot" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <DashboardCandidatesHeader/>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={post.user_photo ? `https://api.sentryspot.co.uk${post.user_photo}` : '/default-profile.jpg'}
            alt="User Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="font-bold text-lg">
              {post.user_first_name} {post.user_last_name}
            </h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-800 mb-4">{post.content}</p>
        {post.feed_image && (
          <img
            src={`https://api.sentryspot.co.uk${post.feed_image}`}
            alt="Post"
            className="w-full rounded-lg mb-4"
          />
        )}
      </div>
    </>
  );
};

export default SinglePostPage;

