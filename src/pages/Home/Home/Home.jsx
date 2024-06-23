
import Banner from '../Banner';
import PartnersSection from '../PartnersSection';
import HighlightedClassesSection from '../HighlightedClassesSection';
import FeedbackSection from '../FeedbackSection';
import WebsiteStatsSection from '../WebsiteStatsSection';
import TeacherSignupSection from '../TeacherSignupSection';
import { Helmet } from 'react-helmet';
const Home = () => {
    return (
        <div className='bg-gray-100'>
             <Helmet>
                <title>Edumanage - Home</title>
            </Helmet>
            <Banner/>
            <PartnersSection/>
            <HighlightedClassesSection/>
            <FeedbackSection/>
            <WebsiteStatsSection/>
            <TeacherSignupSection/>
        </div>
    );
};

export default Home;