import teacher from '../../assets/img/Teacher.jpg'
import { Link } from 'react-router-dom';

const TeacherSignupSection = () => {
    return (
       <div className=' bg-gray-100'>
         <h2 className='text-center font-bold text-3xl p-6 underline'>Join as a Teacher</h2>
         <p className="text-gray-600 px-8 mt-4 text-center max-w-[70%] mx-auto">
         Inspire and educate by joining our community as a teacher. On the left side, an image represents our vibrant teaching environment. On the right, learn about the benefits of teaching with us and how you can make a difference. Click the "Start Teaching Today" button to get started and be redirected to the Teach on Edumanage page.
         </p>
         <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-gray-100">
          <div className="w-full md:w-1/2">
          <img
            src={teacher}
            alt="Teacher Join Image"
            className="rounded-lg shadow-lg min-h-[350px]"
          />
          </div>
        <div className="bg-white shadow-lg rounded-lg py-20 px-6 mb-6 md:mb-0 md:mr-6 w-full md:w-1/2 min-h-[410px]">
          <h2 className="text-2xl font-bold mb-4">Become a Teacher</h2>
          <p className="mb-4">
            Are you passionate about teaching? <br /> Join us and start sharing your knowledge today.
          </p>
          <Link
            to="/teach" // Replace with the actual URL to teach on your website page
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Start Teaching Today
          </Link>
        </div>
      </div>
       </div>
    );
};

export default TeacherSignupSection;
