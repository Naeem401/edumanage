
import { Link } from 'react-router-dom';

const ClassCard = ({ classData }) => {
  const { title, teacher, image, price, description, totalEnrollment, _id } = classData;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={image} alt={title} className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">Posted by: {teacher.name}</p>
      <p className="text-gray-600 mb-2">Price: ${price}</p>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500">Total Enrollment: {totalEnrollment}</p>
      <Link to={`/class-details-for-student/${_id}`}>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Enroll
      </button>
      </Link>
      
    </div>
  );
};

export default ClassCard;
