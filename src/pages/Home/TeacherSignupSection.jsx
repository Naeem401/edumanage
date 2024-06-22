import teacher from '../../assets/img/Teacher.jpg'
import { Link } from 'react-router-dom';

const TeacherSignupSection = () => {
    return (
       <div className=' bg-gray-100'>
         <h2 className='text-center font-bold text-3xl p-6'>Become a Teacher</h2>
         <div className='flex justify-center items-center p-6'>
          <img
            src={teacher}
            alt="Teacher Join Image"
            className="rounded-lg shadow-lg w-1/3"
          />
        <div className="bg-white p-10 py-20">
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
