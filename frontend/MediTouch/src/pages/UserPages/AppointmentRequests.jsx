import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentRequests = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from API (replace with your actual API URL)
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleAcceptRequest = (appointmentId) => {
    // API call to accept the appointment (replace with your actual API URL)
    fetch(`/api/appointments/${appointmentId}/accept`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Appointment Accepted!");
        // Optionally, update the state to reflect the change
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      })
      .catch((error) => console.error("Error accepting appointment:", error));
  };

  const handleRejectRequest = (appointmentId) => {
    // API call to reject the appointment (replace with your actual API URL)
    fetch(`/api/appointments/${appointmentId}/reject`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Appointment Rejected!");
        // Optionally, update the state to reflect the change
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      })
      .catch((error) => console.error("Error rejecting appointment:", error));
  };

  const handleBookAppointment = (appointment) => {
    // Pass appointment details to AppointmentForm for payment
    navigate("/appointment-form", {
      state: {
        doctorId: appointment.doctorId,
        doctorEmail: appointment.doctorEmail,
        doctorData: appointment.doctorData,
        userEmail: appointment.userEmail,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-10">Appointment Requests</h1>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {appointments.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No appointment requests available.</p>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id} className="p-6 sm:p-8 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xl font-semibold text-blue-700">
                        Dr. {appointment.doctorData.first_name} {appointment.doctorData.last_name}
                      </p>
                      <p className="text-gray-600">Date: {appointment.appointmentDate}</p>
                      <p className="text-gray-600">Time: {appointment.appointmentTime}</p>
                    </div>

                    <div className="space-x-4">
                      <button
                        className="bg-green-600 text-white py-2 px-4 rounded-md"
                        onClick={() => handleAcceptRequest(appointment.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white py-2 px-4 rounded-md"
                        onClick={() => handleRejectRequest(appointment.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-md"
                        onClick={() => handleBookAppointment(appointment)}
                      >
                        Book & Pay with eSewa
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequests;
