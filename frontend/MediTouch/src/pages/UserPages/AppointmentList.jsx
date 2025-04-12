import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

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
    <div className="ml-64 p-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        📋 Appointment List
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600 text-lg">No appointments available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Weeks</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr
                  key={appt.id}
                  className={`text-sm transition-all duration-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 text-black">{appt.id}</td>
                  <td className="px-4 py-3 text-black">{appt.email}</td>
                  <td className="px-4 py-3 text-black">{appt.Weeks}</td>
                  <td className="px-4 py-3 text-black">Rs. {appt.price}</td>
                  <td className="px-4 py-3 text-black">{appt.address}</td>
                  <td className="px-4 py-3 text-black">{appt.phone}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">
                    {appt.status}
                  </td>
                  <td className="px-4 py-3">
                    {appt.status !== "Approved" && (
                      <button
                        onClick={() => handleApprove(appt.id)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow transition-all duration-200 mr-2"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(appt.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
