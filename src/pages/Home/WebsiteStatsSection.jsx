import axios from "axios";
import { useEffect, useState } from "react";
import elearnningimg from '../../assets/img/E-Learnning.jpg'


const WebsiteStatsSection = () => {
    const [users, setUsers] = useState([])
    const [classes, setClasses] = useState([])
    const [totalEnrollments, setTotalEnrollments] = useState([])
    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
            setUsers(response.data);
        };
        fetchStats();
      }, []);
    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/approved`);
            setClasses(response.data);
        };
        fetchStats();
      }, []);
    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);
            setTotalEnrollments(response.data);
        };
        fetchStats();
      }, []);



    return (
     <div>
      <h2 className="text-center text-black text-2xl font-bold underline">User Statistics</h2>
      <p className="text-gray-600 px-8 mt-4 text-center max-w-[70%] mx-auto">This section provides a snapshot of our website's activity. On the left, cards display the total user count, the number of classes created, and total student enrollments. On the right, an engaging image represents our educational community.</p>
       <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg py-20 p-6 mb-6 md:mb-0 md:mr-6 w-full md:w-1/2 min-h-72">
          <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
          <div className="mb-2">
            <span className="font-semibold">Total Users: {users.length}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Total Classes: {classes.length}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Total Enrollments: {totalEnrollments.length}</span>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={elearnningimg}
            alt="Relevant to website"
            className="rounded-lg shadow-lg min-h-72"
          />
        </div>
      </div>
     </div>
  );
};

export default WebsiteStatsSection;
