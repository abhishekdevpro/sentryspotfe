

// // const ChatboxContactList = () => {
// //   return (
// //     <ul className="contacts">
// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-1.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
               
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Darlene Robertson</span>
// //               <p> Head of Development</p>
// //             </div>
// //             <span className="info">35 mins</span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-2.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
               
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Jane Cooper</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">
// //               35 mins <span className="count">2</span>
// //             </span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-3.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
               
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Arlene McCoy</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">
// //               35 mins <span className="count bg-success">2</span>
// //             </span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-4.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
               
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Albert Flores</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">35 mins</span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li className="active">
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-5.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
               
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Williamson</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">
// //               35 mins <span className="count bg-warning">2</span>
// //             </span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-6.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
             
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Kristin Watson</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">35 mins</span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-7.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
               
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Annette Black</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">35 mins</span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}

// //       <li>
// //         <a href="#">
// //           <div className="d-flex bd-highlight">
// //             <div className="img_cont">
// //               <img
// //                 src="/images/resource/candidate-8.png"
// //                 className="rounded-circle user_img"
// //                 alt="chatbox avatar"
              
// //               />
// //             </div>
// //             <div className="user_info">
// //               <span>Jacob Jones</span>
// //               <p>Head of Development</p>
// //             </div>
// //             <span className="info">35 mins</span>
// //           </div>
// //         </a>
// //       </li>
// //       {/* End single Contact List */}
// //     </ul>
// //   );
// // };

// // export default ChatboxContactList;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";

// const ChatboxContactList = ({ onSelectUser, activeUserId }) => {
//     const [jobSeekers, setJobSeekers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchJobSeekers = async () => {
//             try {
//                 setLoading(true);
                
//                 // Get token from localStorage
//                 const token = localStorage.getItem(Constant.USER_TOKEN);
                
//                 const response = await axios.get('https://api.sentryspot.co.uk/api/employeer/job-seekers', {
//                     headers: {
//                         'Authorization': `${token}`,
//                     }
//                 });
                
//                 setJobSeekers(response.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching job seekers:", err);
//                 setError(err.response?.data?.message || err.message);
//                 setLoading(false);
//             }
//         };

//         fetchJobSeekers();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 my-4">
//                 <p className="font-medium">Error: {error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="contacts-container h-full">
//             <ul className="contacts overflow-y-auto h-full max-h-[calc(100vh-200px)] scrollbar-custom pr-1">
//                 {jobSeekers.length > 0 ? (
//                     jobSeekers.map((jobSeeker, index) => {
//                         const userId = jobSeeker.jobskkers_detail.id;
//                         const isActive = userId === activeUserId;
                        
//                         return (
//                             <li 
//                                 key={userId || index} 
//                                 className={`hover:bg-gray-100 rounded-lg transition-all duration-200 mb-2 ${isActive ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
//                                 onClick={() => onSelectUser(jobSeeker)}
//                             >
//                                 <div className="cursor-pointer">
//                                     <div className="flex items-center p-3">
//                                         <div className="relative flex-shrink-0">
//                                             <img
//                                                 src={jobSeeker.jobskkers_detail.profileImage || `/images/resource/candidate-${(index % 8) + 1}.png`}
//                                                 className="rounded-full h-12 w-12 object-cover border border-gray-200"
//                                                 alt={`${jobSeeker.jobskkers_detail.first_name}'s avatar`}
//                                             />
//                                             <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
//                                         </div>
//                                         <div className="ml-3 flex-grow">
//                                             <div className="font-medium text-gray-900">{jobSeeker.jobskkers_detail.first_name || "Unnamed Candidate"}</div>
//                                             <p className="text-sm text-gray-500 truncate">{jobSeeker.jobskkers_detail.job_title || "Job Seeker"}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </li>
//                         );
//                     })
//                 ) : (
//                     <li className="py-8">
//                         <div className="flex flex-col items-center justify-center text-gray-500">
//                             <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                             </svg>
//                             <p className="text-center">No job seekers found</p>
//                         </div>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// // Add this CSS to your global stylesheet or a component-level <style> tag
// const ScrollbarStyles = () => (
//     <style jsx global>{`
//         .scrollbar-custom::-webkit-scrollbar {
//             width: 6px;
//         }
        
//         .scrollbar-custom::-webkit-scrollbar-track {
//             background: #f1f1f1;
//             border-radius: 10px;
//         }
        
//         .scrollbar-custom::-webkit-scrollbar-thumb {
//             background: #c1c1c1;
//             border-radius: 10px;
//         }
        
//         .scrollbar-custom::-webkit-scrollbar-thumb:hover {
//             background: #a8a8a8;
//         }
//     `}</style>
// );

// export default function EnhancedChatboxContactList({ onSelectUser, activeUserId }) {
//     return (
//         <>
//             <ScrollbarStyles />
//             <ChatboxContactList onSelectUser={onSelectUser} activeUserId={activeUserId} />
//         </>
//     );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const ChatboxContactList = ({ onSelectUser, activeUserId }) => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobSeekers = async () => {
            try {
                setLoading(true);
                
                // Get token from localStorage
                const token = localStorage.getItem(Constant.USER_TOKEN);
                
                const response = await axios.get('https://api.sentryspot.co.uk/api/employeer/job-seekers', {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });

                // Add static user to the fetched jobSeekers list
                const staticUser = {
                    jobskkers_detail: {
                        id: 34,
                        first_name: "Test",
                        job_title: "Software Engineer",
                        profileImage: `/images/resource/candidate-1.png`
                    }
                };

                setJobSeekers([staticUser]); // Add static user at the beginning
                setLoading(false);
            } catch (err) {
                console.error("Error fetching job seekers:", err);
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchJobSeekers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 my-4">
                <p className="font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="contacts-container h-full">
            <ul className="contacts overflow-y-auto h-full max-h-[calc(100vh-200px)] scrollbar-custom pr-1">
                {jobSeekers.length > 0 ? (
                    jobSeekers.map((jobSeeker, index) => {
                        const userId = jobSeeker.jobskkers_detail.id;
                        const isActive = userId === activeUserId;
                        
                        return (
                            <li 
                                key={userId || index} 
                                className={`hover:bg-gray-100 rounded-lg transition-all duration-200 mb-2 ${isActive ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
                                onClick={() => onSelectUser(jobSeeker)}
                            >
                                <div className="cursor-pointer">
                                    <div className="flex items-center p-3">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={jobSeeker.jobskkers_detail.profileImage || `/images/resource/candidate-${(index % 8) + 1}.png`}
                                                className="rounded-full h-12 w-12 object-cover border border-gray-200"
                                                alt={`${jobSeeker.jobskkers_detail.first_name}'s avatar`}
                                            />
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                        </div>
                                        <div className="ml-3 flex-grow">
                                            <div className="font-medium text-gray-900">{jobSeeker.jobskkers_detail.first_name || "Unnamed Candidate"}</div>
                                            <p className="text-sm text-gray-500 truncate">{jobSeeker.jobskkers_detail.job_title || "Job Seeker"}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="py-8">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-center">No job seekers found</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

// Add this CSS to your global stylesheet or a component-level <style> tag
const ScrollbarStyles = () => (
    <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
            width: 6px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    `}</style>
);

export default function EnhancedChatboxContactList({ onSelectUser, activeUserId }) {
    return (
        <>
            <ScrollbarStyles />
            <ChatboxContactList onSelectUser={onSelectUser} activeUserId={activeUserId} />
        </>
    );
}
