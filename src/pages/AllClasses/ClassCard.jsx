const ClassCard = ({ classData }) => {
    const { title, description, instructor, image } = classData;
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={image} alt={title} className="w-full h-32 object-cover mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-sm text-gray-500">Instructor: {instructor}</p>
      </div>
    );
  };

export default ClassCard;