import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateUserRole = async () => {
    if (loggedInUser.email === user.email) {
      toast.error('Action Not Allowed');
      return;
    }

    try {
      setIsUpdating(true);
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/make-admin/${user._id}`);
      if (response.status === 200) {
        toast.success('User role updated successfully!');
        refetch(); // Refresh user data after successful update
      } else {
        toast.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setIsUpdating(false);
    }
  };

  const getUserStatus = () => {
    if (user.role === 'admin') {
      return 'Verified';
    } else {
      return 'Not Verified';
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user?.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user?.role}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUserStatus()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end">
          <button
            onClick={updateUserRole}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isUpdating || user.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUpdating || user.role === 'admin'}
          >
            {isUpdating ? 'Updating...' : 'Make Admin'}
          </button>
          {user.role === 'admin' && <span className="ml-2 text-green-600">Admin</span>}
        </div>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  refetch: PropTypes.func.isRequired,
};

export default UserDataRow;
