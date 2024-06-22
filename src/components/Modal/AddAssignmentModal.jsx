
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddAssignmentModal = ({ isOpen, onRequestClose, classId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/class/${classId}/assignments`, data);
      toast.success('Assignment added successfully');
      onRequestClose(); // Close the modal after successful submission
    } catch (error) {
      toast.error('Failed to add assignment');
    }
  };

  return (
    <Modal className="w-[100px] mx-auto" isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assignment Title
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
            Assignment Deadline
            <input
              type="date"
              {...register('deadline', { required: true })}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${errors.deadline ? 'border-red-500' : ''}`}
            />
            {errors.deadline && <span className="text-red-500">Deadline is required</span>}
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assignment Description
            <textarea
              {...register('description', { required: true })}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <span className="text-red-500">Description is required</span>}
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm"
        >
          Add Assignment
        </button>
      </form>
    </Modal>
  );
};

export default AddAssignmentModal;
