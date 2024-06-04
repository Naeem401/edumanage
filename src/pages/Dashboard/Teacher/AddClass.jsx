
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const AddClass = () => {
  const { user } = useAuth();
  console.log(user)
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-class`, classData);
      return data;
    },
    onSuccess: () => {
      toast.success('Class Added Successfully!');
      navigate('/dashboard/my-classes-list');
    },
    onError: (error) => {
      console.error('Error adding class:', error);
      toast.error('Failed to add class. Please try again.');
    }
  });

  const onSubmit = async (data) => {
    const classData = {
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        teacher: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        }
      };

    await mutateAsync(classData);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Add Class</title>
      </Helmet>
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-4">Add a New Class</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
              <input
                type="text"
                {...register('title', { required: true })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                value={user?.displayName}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                value={user?.email}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
              <input
                type="number"
                {...register('price', { required: true, min: 0 })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <span className="text-red-500">Price is required and must be non-negative</span>}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                {...register('description', { required: true })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <span className="text-red-500">Description is required</span>}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
              <input
                type="text"
                {...register('image', { required: true })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && <span className="text-red-500">Image URL is required</span>}
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm"
          >
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
