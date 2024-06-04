import React from 'react';
import Banner from '../Banner';
import PartnersSection from '../PartnersSection';
import HighlightedClassesSection from '../HighlightedClassesSection';
import FeedbackSection from '../FeedbackSection';
import WebsiteStatsSection from '../WebsiteStatsSection';
import TeacherSignupSection from '../TeacherSignupSection';
import StudentAchievements from '../StudentAchievements';
import EducationalBlogs from '../EducationalBlogs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PartnersSection/>
            <HighlightedClassesSection/>
            <FeedbackSection/>
            <WebsiteStatsSection/>
            <TeacherSignupSection/>
            <StudentAchievements/>
            <EducationalBlogs/>
        </div>
    );
};

export default Home;