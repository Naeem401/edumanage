import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ClassDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    deadline: '',
    description: '',
  });
  const [classDetails, setClassDetails] = useState(null); // State to store class details

  // Function to fetch class details by ID
  const fetchClassDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/class/${id}`);
      setClassDetails(response.data); // Assuming response.data contains class details
    } catch (error) {
      console.error('Error fetching class details:', error);
    }
  };

  // Fetch class details on component mount
  useEffect(() => {
    fetchClassDetails();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  };

  const handleCreateAssignment = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/class/assignment/${id}`, {
        ...assignmentData,
      });
      // Optionally refetch class details or update state if needed
      handleClose();
    } catch (error) {
      console.error('Error creating assignment:', error);
      // Handle error (e.g., display a user-friendly message)
    }
  };

  if (!classDetails) return <div className="container mx-auto px-4 sm:px-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <Typography variant="h4" className="text-2xl font-semibold mb-4">
        {classDetails.title}
      </Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="text-lg font-semibold">
            Class Progress
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div>
              <Typography>Total Enrollment:</Typography>
              <Typography>{classDetails.totalEnrollment}</Typography>
            </div>
            <div>
              <Typography>Total Assignments:</Typography>
              <Typography>{classDetails.totalAssignments}</Typography>
            </div>
            <div>
              <Typography>Assignments Submitted Today:</Typography>
              <Typography>{classDetails.assignmentsSubmittedToday}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Assignment
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box className="bg-white p-6 mx-auto mt-10 max-w-md">
          <Typography variant="h6" className="text-xl font-semibold mb-4">
            Create New Assignment
          </Typography>
          <TextField
            name="title"
            label="Assignment Title"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={assignmentData.title}
            onChange={handleChange}
          />
          <TextField
            name="deadline"
            label="Assignment Deadline"
            variant="outlined"
            fullWidth
            type="date"
            className="mb-4"
            value={assignmentData.deadline}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Assignment Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            className="mb-4"
            value={assignmentData.description}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleCreateAssignment}>
            Add Assignment
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ClassDetails;
