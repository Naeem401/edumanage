import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HighlightedClassesSection = () => {

const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchPopularClasses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/popular-classes`);
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching popular classes:', error);
      }
    };

    fetchPopularClasses();
  }, []);

console.log(classes)

    return (
        <div className="py-10 w-[75%] mx-auto">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl text-center font-bold underline">Popular Classes and Courses</h2>
                <p className="text-center mt-4 md:px-8 mb-8 text-gray-500">
                In our platform, we feature several classes and courses that stand out due to their popularity and high enrollment rates. These classes have been chosen based on the number of students enrolled, reflecting their widespread appeal and demand. Additionally, we consider the highest-reviewed classes, ensuring that the courses we recommend are not only popular but also highly rated by students. Here are some highlights:
                </p>
                <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                340: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {classes.map(cls => (
                <SwiperSlide key={cls._id}>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <img src={cls.image} alt={cls.title} className="w-full h-32 object-cover mb-4" />
                        <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                        <p className="text-gray-600 mb-2">Posted by: {cls.teacher.name}</p>
                        <p className="text-gray-600 mb-2">Price: ${cls.price}</p>
                        <p className="text-gray-600 mb-2">{cls.description}</p>
                        <p className="text-sm text-gray-500">Total Enrollment: {cls.totalEnrollment}</p>
                        <Link to={`/class-details-for-student/${cls._id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                                Enroll
                            </button>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
            </div>
        </div>
    );
};

export default HighlightedClassesSection;
