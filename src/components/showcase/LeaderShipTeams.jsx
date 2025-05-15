// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Constant } from '@/utils/constant/constant';
// import { IoPlay } from 'react-icons/io5';
// import ReactQuill from 'react-quill';

// const LeadershipTeam = () => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editSelectedFile, setEditSelectedFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState({});

//   const baseUrl = "https://api.sentryspot.co.uk/api/employeer";
//   const baseImageUrl = "https://api.sentryspot.co.uk";  
//   const token = localStorage.getItem(Constant.USER_TOKEN); 

//   // Configure axios defaults
//   const api = axios.create({
//     baseURL: baseUrl,
//     headers: {
//       Authorization: `${token}`,
//     }
//   });

//   useEffect(() => {
//     fetchTeamMembers();
//   }, []);

//   const fetchTeamMembers = async () => {
//     try {
//       const response = await api.get('/company-teams');
//       console.log(response.data.data,"<<<");
//       setTeamMembers(response.data.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch team members');
//     }
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//     setEditSelectedFile(null);
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files?.[0]) {
//       setEditSelectedFile(e.target.files[0]);
//     }
//   };

//   const handleSave = async (member, e) => {
//     e.preventDefault();
//     try {
//       setActionLoading(prev => ({ ...prev, [member.id]: true }));
//       const formData = new FormData();
//       formData.append('name', member.name);
//       formData.append('description', member.description);
//       if (editSelectedFile) {
//         formData.append('media_upload', editSelectedFile);
//       }

//       const response = await api.patch(
//         `/company-teams/${member.id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setTeamMembers(prev =>
//         prev.map(m => m.id === member.id ? { ...m, ...response.data.data } : m)
//       );

//       setEditingId(null);
//       setEditSelectedFile(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update team member');
//     } finally {
//       setActionLoading(prev => ({ ...prev, [member.id]: false }));
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditSelectedFile(null);
//   };

//   return (
//     <section className="job-categories ui-job-categories border-none" id="leadership">
//       <div className="auto-container w-[90%]">
//         <div className="sec-title text-center">
//           <p className="font-bold text-xl sm:text-3xl text-black">
//             Meet our Leadership team
//           </p>
//         </div>

//         <div className="row py-1">
//           {teamMembers.map((member) => (
//             <div
//               className="flex flex-col items-center gap-4 py-4 col-lg-4 col-md-6 col-sm-12"
//               key={member.id}
//             >
//                 {console.log(`${baseImageUrl}${member.media}`)}
//               <span className="relative">
//                 <img
//                   src={`${baseImageUrl}${member.media}` || "https://picsum.photos/200/300"}
//                   alt={member.name}
//                   className="h-48 w-48 rounded-full object-cover"
//                 />
//                 <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-[-15px] left-[38%]">
//                   <IoPlay size={28} color="white" />
//                 </span>
//               </span>
//               <div className="flex flex-col items-center gap-1">
//                 {editingId === member.id ? (
//                   <form onSubmit={(e) => handleSave(member, e)} className="flex flex-col items-center gap-2">
//                     <input
//                       type="text"
//                       value={member.name}
//                       onChange={(e) => setTeamMembers(prev =>
//                         prev.map(m => m.id === member.id ? { ...m, name: e.target.value } : m)
//                       )}
//                       className="border p-1 rounded text-center"
//                     />
//                     <ReactQuill
//                       value={member.description.replace(/<[^>]+>/g, '')}
//                       onChange={(e) => setTeamMembers(prev =>
//                         prev.map(m => m.id === member.id ? { ...m, description: e.target.value } : m)
//                       )}
//                       className="border p-1 rounded text-center"
//                     />
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       className="text-sm"
//                     />
//                     <div className="flex gap-2">
//                       <button
//                         type="submit"
//                         disabled={actionLoading[member.id]}
//                         className="border p-1 px-2 text-sm bg-green-500 text-white rounded"
//                       >
//                         {actionLoading[member.id] ? 'Saving...' : 'Save'}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="border p-1 px-2 text-sm bg-gray-500 text-white rounded"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <>
//                     <p className="text-center text-gray-700 font-bold">
//                       {member.name}
//                     </p>
//                     <p className="text-center w-[80%]" dangerouslySetInnerHTML={{ __html: member.description }} />
//                     <button
//                       onClick={() => handleEdit(member.id)}
//                       className="border p-1 px-2 mt-2 text-sm bg-blue-500 text-white rounded"
//                     >
//                       Edit
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
//             See More
//           </button>
//         </div>
//       </div>
//       {error && (
//         <div className="text-red-500 text-center mt-4">
//           {error}
//         </div>
//       )}
//     </section>
//   );
// };

// export default LeadershipTeam;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';
import { IoPlay } from 'react-icons/io5';
import ReactQuill from 'react-quill';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';

const LeadershipTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editSelectedFile, setEditSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  const baseUrl = "https://api.sentryspot.co.uk/api/employeer";
  const baseImageUrl = "https://api.sentryspot.co.uk";  
  const token = localStorage.getItem(Constant.USER_TOKEN); 
  const navigate = useNavigate()

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `${token}`,
    }
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await api.get('/company-teams');
      setTeamMembers(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch team members');
    }
  };

  const handleEdit = () => {
    navigate('/employers-dashboard/company-profile/?edit=team')

  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setEditSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async (member, e) => {
    e.preventDefault();
    try {
      setActionLoading(prev => ({ ...prev, [member.id]: true }));
      const formData = new FormData();
      formData.append('name', member.name);
      formData.append('description', member.description);
      if (editSelectedFile) {
        formData.append('media_upload', editSelectedFile);
      }

      const response = await api.patch(
        `/company-teams/${member.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTeamMembers(prev =>
        prev.map(m => m.id === member.id ? { ...m, ...response.data.data } : m)
      );
      fetchTeamMembers()
      setEditingId(null);
      setEditSelectedFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update team member');
    } finally {
      setActionLoading(prev => ({ ...prev, [member.id]: false }));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditSelectedFile(null);
  };

  const EditForm = ({ member }) => (
    <form onSubmit={(e) => handleSave(member, e)} className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={member.name}
          onChange={(e) => setTeamMembers(prev =>
            prev.map(m => m.id === member.id ? { ...m, name: e.target.value } : m)
          )}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <div className="">
          <ReactQuill
            value={member.description}
            onChange={(content) => setTeamMembers(prev =>
              prev.map(m => m.id === member.id ? { ...m, description: content } : m)
            )}
            className=""
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={actionLoading[member.id]}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
        >
          {actionLoading[member.id] ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );

  return (
    <section className="py-12 bg-gray-50" id="leadership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet our team
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>

        </div>
        <div className="flex justify-end mb-4">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-200 font-medium rounded-md px-5 py-2.5 flex items-center gap-2"
                  onClick={() => handleEdit()}
                >
                  <Edit />
                  Edit 
                </button>
              </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src={`${baseImageUrl}${member.media}` || "https://picsum.photos/200/300"}
                      alt={member.name}
                      className="h-48 w-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full shadow-lg">
                        <IoPlay size={28} color="white" />
                      </span>
                    </div>
                  </div>

                  {editingId === member.id ? (
                    <EditForm member={member} />
                  ) : (
                    <div className="text-center space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                      <div 
                        className="text-gray-600 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: member.description }}
                      />
                      
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          ))}
        </div>

        {teamMembers.length > 6 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 text-base font-medium text-amber-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              See More
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </section>
  );
};

export default LeadershipTeam;