import { useEffect, useState } from 'react';
import ClassCard from '../ClassCard';
import axios from 'axios';
import { Helmet } from 'react-helmet';

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
         <Helmet>
          <title>All Classes - Edumanage</title>
        </Helmet>
        <h2 className="text-3xl font-bold mb-6 text-center underline mt-8">All Classes</h2>
        <p className="text-gray-600 px-8 mt-4 text-center max-w-[70%] mx-auto mb-4">Browse through a diverse selection of classes available on our platform. Each class, meticulously curated and approved by our admin team, is presented in a visually appealing card format. Explore titles, instructors, pricing, short descriptions, current enrollment numbers, and easily enroll with a click of a button. Start your learning journey today!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      </div>
    )
};

export default AllClassesByStudent;