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
      setError(err.response?.data?.message || '');
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the experienced professionals leading our organization to success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src={`${baseImageUrl}${member.media}` || "https://picsum.photos/200/300"}
                      alt={member.name}
                      className="h-40 w-40 sm:h-48 sm:w-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <span className="flex justify-center items-center bg-pink-500 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg">
                        <IoPlay size={24} color="white" />
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
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length > 6 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 text-base font-medium text-amber-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
              See More
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          {error}
        </div>
      )}
    </section>
  );
};

export default LeadershipTeam;