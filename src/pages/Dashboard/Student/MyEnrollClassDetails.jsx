import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet';

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const {user} = useAuth()
  const [classDetails, setClassDetails] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [terDescription, setTerDescription] = useState('');
  const [rating, setRating] = useState(0); // Ensure rating state is initialized properly

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/class/${id}`);
        setClassDetails(response.data);
        setAssignments(response.data.assignments || []); // Ensure assignments are properly set
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };
    fetchClassDetails();
  }, [id]);

  const handleSubmitAssignment = async (assignmentId) => {
      await axios.patch(`${import.meta.env.VITE_API_URL}/class/${id}/assignment/${assignmentId}/submit`);
      setAssignments(assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, submissionCount: (assignment.submissionCount || 0) + 1 }
          : assignment
      ));
  };

  const handleTerSubmit = async (e) => {
    e.preventDefault();
    const terData = {
      description: terDescription,
      ratings: rating,
      classId: id,
      name: user.displayName,
      image: user.photoURL,
      title: classDetails.title
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/teaching-evaluation-report`, terData);
      console.log('TER submitted successfully:', response.data);
      setModalIsOpen(false);
      setTerDescription('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting TER:', error);
    }
  };

  return (
    <div className="my-enroll-class-details p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>{classDetails.title || 'Class Details'} - Edumanage</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">{classDetails.title}</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/4 px-4 py-2 text-left">Title</th>
            <th className="w-1/2 px-4 py-2 text-left">Description</th>
            <th className="w-1/4 px-4 py-2 text-left">Deadline</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id} className="border-t">
              <td className="px-4 py-2">{assignment.title}</td>
              <td className="px-4 py-2">{assignment.description}</td>
              <td className="px-4 py-2">{assignment.deadline}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleSubmitAssignment(assignment._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setModalIsOpen(true)}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Create Teaching Evaluation Report (TER)
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Create TER</h2>
        <form onSubmit={handleTerSubmit}>
          <label className="block mb-4">
            Description:
            <textarea
              value={terDescription}
              onChange={(e) => setTerDescription(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-4">
            Rating:
            <ReactStars
              count={5}
              onChange={(newRating) => setRating(newRating)}
              size={24}
              activeColor="#ffd700"
              className="mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MyEnrollClassDetails;
