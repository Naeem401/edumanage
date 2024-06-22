
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';

const UserInfo = () => {
  const {user} = useAuth()
const [role] = useRole();
  return (
   <div className='h-screen flex justify-center items-center w-full'>
     <div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-lg">
    <img
      className="w-24 h-24 rounded-full mb-4"
      src={user?.photoURL}
      alt={`${user.name}'s profile`}
    />
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.displayName}</h2>
    <p className="text-lg text-gray-600 mb-2">{role}</p>
    <p className="text-lg text-gray-600">{user.email}</p>
  </div>
   </div>
  );
};

export default UserInfo;
