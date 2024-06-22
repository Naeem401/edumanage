import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const TeachApplicationForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data.name,
        experience: data.experience,
        title: data.title,
        category: data.category,
        email: user.email,
        imageURL: data.imageURL,
      };
      // Send POST request to submit teacher request
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/teacher/request`, formData);
      console.log(response.data); // Log the response data
      toast.success('Application submitted successfully!');
      
      reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Apply for Teaching Position</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={user.displayName}
              {...register('name', { required: 'Name is required' })}
              className="input-field border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-md rounded-md px-3 py-2 mt-1 w-full"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={user.email}
              readOnly
              className="input-field border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-md rounded-md px-3 py-2 mt-1 bg-gray-100 w-full"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
            <select
              id="experience"
              {...register('experience', { required: 'Experience is required' })}
              className="input-field border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-md rounded-md px-3 py-2 mt-1 w-full"
            >
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && <span className="text-red-500 text-sm">{errors.experience.message}</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="input-field border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-md rounded-md px-3 py-2 mt-1 w-full"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="input-field border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-md rounded-md px-3 py-2 mt-1 w-full"
            >
              <option value="web development">Web Development</option>
              <option value="digital marketing">Digital Marketing</option>
              <option value="data science">Data Science</option>
              <option value="graphic design">Graphic Design</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
            {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              id="imageURL"
              type="url"
              {...register('imageURL', { required: 'Image URL is required' })}
              className="input-field border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-md rounded-md px-3 py-2 mt-1 w-full"
            />
            {errors.imageURL && <span className="text-red-500 text-sm">{errors.imageURL.message}</span>}
          </div>
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="btn-submit bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out w-full"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachApplicationForm;
