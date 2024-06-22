import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const UpdateClass = () => {
  const { id } = useParams(); // Ensure you get the id from the params
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { title, price, description, image, _id } = useLoaderData(); // Assuming useLoaderData provides these values

  const onSubmit = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/class/update/${_id}`, data); // Ensure the URL is correct
      toast.success('Class updated successfully');
      navigate('/dashboard/my-classes-list');
    } catch (err) {
      toast.error('Failed to update class');
      console.error(err); // Log error details for debugging
    }
  };

  useEffect(() => {
    if (title) setValue('title', title);
    if (price) setValue('price', price);
    if (description) setValue('description', description);
    if (image) setValue('image', image);
  }, [title, price, description, image, setValue]);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Update Class</title>
      </Helmet>
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-4">Update Class</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition duration-300"
          >
            Update Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
