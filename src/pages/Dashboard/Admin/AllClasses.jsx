import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const fetchClasses = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/classes`);
  return data;
};

const AllClasses = () => {
  const navigate = useNavigate();

  const {
    data: classes,
    refetch,
    isLoading,
    error
  } = useQuery({
    queryKey: ['allClasses'],
    queryFn: fetchClasses
  });

  const approveClassMutation = useMutation({
    mutationFn: async id => {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/class/approve/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success('Class approved successfully.');
    },
    onError: () => {
      toast.error('Failed to approve class.');
    }
  });

  const rejectClassMutation = useMutation({
    mutationFn: async id => {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/class/reject/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success('Class rejected successfully.');
    },
    onError: () => {
      toast.error('Failed to reject class.');
    }
  });

  if (isLoading) return <div className="container mx-auto px-4 sm:px-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 sm:px-8">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-2xl font-semibold mb-4">All Classes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Short Description</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes?.map((classItem) => (
              <tr key={classItem._id} className="border-t border-gray-200">
                <td className="py-3 px-6">{classItem.title}</td>
                <td className="py-3 px-6">
                  <img src={classItem.image} alt={classItem.title} className="w-20 h-20 object-cover" />
                </td>
                <td className="py-3 px-6">{classItem.teacher.email}</td>
                <td className="py-3 px-6">{classItem.description}</td>
                <td className="py-3 px-6">{classItem.status}</td>
                <td className="py-3 px-6">
                  <div className="flex gap-2">
                    <button
                      className={`bg-green-500 text-white px-4 py-2 rounded-md ${classItem.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => approveClassMutation.mutate(classItem._id)}
                      disabled={classItem.status === 'approved'}
                    >
                      Approve
                    </button>
                    <button
                      className={`bg-red-500 text-white px-4 py-2 rounded-md ${classItem.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => rejectClassMutation.mutate(classItem._id)}
                      disabled={classItem.status === 'rejected'}
                    >
                      Reject
                    </button>
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-md ${classItem.status !== 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={classItem.status !== 'approved'}
                      onClick={() => navigate(`/dashboard/class/${classItem._id}`)}
                    >
                      See Progress
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
