import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClassDetails = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
  
    useEffect(() => {
      const fetchClassDetails = async () => {
        try {
          const response = await axios.get(`/${import.meta.env.VITE_API_URL}/classes/${id}`);
          setClassDetails(response.data);
        } catch (error) {
          console.error('Error fetching class details:', error);
        }
      };
  
      fetchClassDetails();
    }, [id]);
  
    return (
      <div>
        {classDetails ? (
          <div>
            <h2>{classDetails.title}</h2>
            <p>{classDetails.description}</p>
            <p>Teacher: {classDetails.teacher}</p>
            <p>Price: {classDetails.price}</p>
            <button>Enroll Now</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
};

export default ClassDetails;