import { useEffect, useState } from 'react';
import axios from 'axios';
import TeachApplicationForm from '../components/TeachApplicationForm';
import useAuth from '../hooks/useAuth';

const TeachPage = () => {
  const { user } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/requests/${user.email}`);
        
        const status = response.data.status;
        if (status === 'pending' || status === 'accepted') {
          setApplicationStatus(status);
        } else {
          setApplicationStatus(null); // Reset status if not found or invalid
        }
      } catch (error) {
        console.error('Failed to fetch application status:', error);
        setApplicationStatus(null); // Reset status in case of error
      }
    };

    fetchApplicationStatus();
  }, [user.email]);

  if (applicationStatus === 'accepted') {
    return <div className="text-green-600 min-h-screen flex justify-center items-center text-7xl font-bold">You are approved as a teacher!</div>;
  }

  if (applicationStatus === 'pending') {
    return <div className="text-yellow-600 min-h-screen flex justify-center items-center text-7xl font-bold">Your application is under review.</div>;
  }

  return <TeachApplicationForm />;
};

export default TeachPage;
