import { useEffect, useState } from 'react';
import ClassCard from '../ClassCard';
import axios from 'axios';

const AllClassesByStudent = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
      // Fetch data from server when component mounts
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/approved`);
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
  
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">All Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      </div>
    )
};

export default AllClassesByStudent;