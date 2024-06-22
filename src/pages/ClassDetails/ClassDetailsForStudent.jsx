import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import ClassEnrollment from '../AllClasses/ClassEnrollment/ClassEnrollment';

const ClassDetailsForStudent = () => {
  const { id } = useParams(); // Fetch the class ID from URL params
  const [classDetails, setClassDetails] = useState(null);
  const {user} = useAuth()

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/class/${id}`);
        setClassDetails(response.data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  const { title, teacher, price, description, image, _id} = classDetails;

  return (
    <div className="container mx-auto mt-8">
    
       <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {classDetails && (
        <div className='max-w-screen-lg mx-auto'>
          {/* Header */}
          <div className='flex flex-col gap-6'>
            <div>
              {title}
              <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                <img
                  className='object-cover w-full'
                  src={image}
                  alt='header image'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            {/* Room Info */}
            <div className='col-span-4 flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <div
                  className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                >
                  <div>Instructor: {teacher.name}</div>
                </div>
              </div>

              <hr />
              <div
                className='
          text-lg font-light text-neutral-500'
              >
                {description}
              </div>
              <hr />
            </div>

            <div className='md:col-span-3 order-first md:order-last mb-10'>
              {/* enroll class */}
              <ClassEnrollment  classDetails={classDetails}/>
              
            </div>
          </div>
        </div>
      )}
    </Container>
    </div>
  );
};

export default ClassDetailsForStudent;