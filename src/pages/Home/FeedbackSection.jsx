
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackSection = () => {
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        const fetchClassDetails = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/teaching-evaluation-reports`);
            setFeedback(response.data);
        };
        fetchClassDetails();
      }, []);

    return (
        <div className="w-1/2 mx-auto">
            <h2 className='text-center font-bold text-3xl mb-8'>Students Feedback</h2>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    feedback.map(feed => <SwiperSlide key={feed._id}>
                        <div className='flex flex-col justify-center items-center space-y-5 pb-4'>
                        <p className='text-xl text-black'>{feed.description}</p>
                        <h2 className='text-xl font-semibold text-black'>Name: {feed.name}</h2>
                            <div className='flex mx-auto'>
                                <img className='w-[15%] rounded-full mx-auto' src={feed.image} alt="" />
                            </div>
                            
                            <h2 className='text-xl font-semibold text-black'>Class Title: {feed.title}</h2>
                        </div>
                    </SwiperSlide>)
                }
        
      </Swiper>
        </div>
    );
};

export default FeedbackSection;
