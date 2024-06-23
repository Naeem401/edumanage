import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet';

const MyEnrollClasses = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch the enrolled classes from the backend
    const fetchClasses = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/my-enroll-class/${user.email}`);
      setClasses(response.data);
    };
    fetchClasses();
  }, [user.email]);
console.log(classes)
  return (
    <div className="my-enroll-classes bg-gray-100 min-h-screen py-8">
      <Helmet>
        <title>My Enrolled Classes - EduManage</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {classes.map((cls) => (
          <div key={cls._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={cls.enrolldClassDetails.image} alt={cls.enrolldClassDetails.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{cls.enrolldClassDetails.title}</h3>
              <p className="text-gray-600 mb-2">Posted by: {cls.enrolldClassDetails.teacher.name}</p>
              <Link to={`/dashboard/myenroll-class/${cls.enrolldClassDetails._id}`} className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Continue
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClasses;
