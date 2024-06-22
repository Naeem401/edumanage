import { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherRequestshandle = () => {
  const [teacherRequests, setTeacherRequests] = useState([]);

  useEffect(() => {
    fetchTeacherRequests();
  }, []);

  const fetchTeacherRequests = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/requests`);
      setTeacherRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch teacher requests:', error);
    }
  };

  const approveRequest = async (id, userId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/teacher/request/approve/${id}`, { userId });
      // Update status locally after approval
      const updatedRequests = teacherRequests.map(request =>
        request._id === id ? { ...request, status: 'accepted' } : request
      );
      setTeacherRequests(updatedRequests);
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/teacher/request/reject/${id}`);
      // Update status locally after rejection
      const updatedRequests = teacherRequests.map(request =>
        request._id === id ? { ...request, status: 'rejected' } : request
      );
      setTeacherRequests(updatedRequests);
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Teacher Requests</h2>
      <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teacherRequests.map(request => (
              <tr key={request._id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => approveRequest(request._id, request.userId)}
                        className="mr-2 text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(request._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status !== 'pending' && (
                    <span className="text-gray-400">Action disabled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequestshandle;
