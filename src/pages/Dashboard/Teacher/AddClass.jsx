import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AddClass = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const classData = {
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        image: data.image,
        status: 'pending', // Set the initial status to 'pending'
        teacher: {
          name: user.displayName,
          email: user.email,
        },
      };

      // Assuming your backend API endpoint for adding classes
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/addclasses`, classData);
      console.log(response);
      toast.success('Class Added Successfully!');
      setSubmitting(false);
      navigate('/dashboard/my-classes-list');
    } catch (error) {
      console.error('Error adding class:', error);
      toast.error('Failed to add class. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Add Class</title>
      </Helmet>
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-4">Add a New Class</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
              <input
                id="title"
                type="text"
                {...register('title', { required: true })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </label>
          </div>
          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
              <input
                id="price"
                type="number"
                {...register('price', { required: true, min: 0 })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <span className="text-red-500">Price is required and must be non-negative</span>}
            </label>
          </div>
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                id="description"
                {...register('description', { required: true })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <span className="text-red-500">Description is required</span>}
            </label>
          </div>
          <div className="space-y-1">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
              <input
                id="image"
                type="text"
                {...register('image', { required: true })}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && <span className="text-red-500">Image URL is required</span>}
            </label>
          </div>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
              <input
                id="name"
                type="text"
                value={user.displayName}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-gray-100"
              />
            </label>
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-gray-100"
              />
            </label>
          </div>
          <button
            type="submit"
            className="col-span-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition duration-300"
            disabled={loading || submitting}
          >
            {submitting ? 'Adding Class...' : 'Add Class'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
