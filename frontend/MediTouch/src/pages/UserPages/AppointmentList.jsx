import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/appointments/");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Approve handler
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8000/appointments/${id}/approve/`);
      alert("Appointment approved and email sent.");
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: "Approved" } : appt
        )
      );
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Failed to approve appointment.");
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/appointments/${id}/delete/`);
      alert("Appointment deleted.");
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Appointment List</h1>

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Weeks</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="text-center">
                <td className="border p-2">{appt.id}</td>
                <td className="border p-2">{appt.email}</td>
                <td className="border p-2">{appt.Weeks}</td>
                <td className="border p-2">Rs. {appt.price}</td>
                <td className="border p-2">{appt.address}</td>
                <td className="border p-2">{appt.phone}</td>
                <td className="border p-2 font-semibold">{appt.status}</td>
                <td className="border p-2">
                  {appt.status !== "Approved" && (
                    <button
                      onClick={() => handleApprove(appt.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(appt.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
