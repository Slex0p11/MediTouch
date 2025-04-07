// BookAppointment.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { id } = useParams(); // doctor ID
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get('date');

  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [doctorName, setDoctorName] = useState('');

  // Optional: Fetch doctor's name for display
  useEffect(() => {
    axios.get(`http://localhost:8000/api/doctor/${id}/`) // adjust URL based on your API
      .then(res => {
        const user = res.data.user;
        setDoctorName(`Dr. ${user.first_name} ${user.last_name}`);
      })
      .catch(err => {
        console.error("Error fetching doctor info", err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // use your auth logic

    try {
      const res = await axios.post('http://localhost:8000/api/appointments/create/', {
        doctor: id,
        date: selectedDate,
        time,
        reason,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Appointment booked successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to book appointment.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Appointment with {doctorName || "Doctor"}</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-2">Date: <strong>{selectedDate}</strong></p>

        <label className="block mb-2 text-sm font-medium text-gray-700">Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full border rounded p-2 mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Reason (optional):</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="3"
          className="w-full border rounded p-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Confirm Appointment
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default BookAppointment;
