import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MyClassesList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchClasses = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/classes/teacher/${user.email}`);
    return data;
  };

  const {
    data: classes,
    refetch,
    isLoading,
    error
  } = useQuery({
    queryKey: ['myClasses', user?.email],
    queryFn: fetchClasses
  });

  // Log classes for debugging purposes
  console.log(classes);

  // Delete mutation
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/class/${id}`);
      return data;
    },
    onSuccess: data => {
      console.log(data);
      refetch();
      toast.success('Successfully deleted.');
    },
  });

  // Handle Delete
  const handleDelete = async id => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-2xl font-semibold mb-4">My Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes?.map((classItem) => (
          <div key={classItem._id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={classItem.image} alt={classItem.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{classItem?.title}</h2>
            <p><strong>Name:</strong> {classItem?.teacher?.name}</p>
            <p><strong>Email:</strong> {classItem?.teacher?.email}</p>
            <p><strong>Price:</strong> ${classItem?.price}</p>
            <p><strong>Description:</strong> {classItem?.description}</p>
            <p><strong>Status:</strong> {classItem?.status}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                onClick={() => navigate(`/dashboard/update-class/${classItem._id}`)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(classItem._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={classItem.status === 'pending'}
                onClick={() => navigate(`/dashboard/class-details/${classItem._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClassesList;
