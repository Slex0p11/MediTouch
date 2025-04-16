import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/appointments/");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/appointments/${id}/`, {
        status: "Approved"
      });
      toast.success("Appointment approved successfully");
      setAppointments(prev =>
        prev.map(appt =>
          appt.id === id ? { ...appt, status: "Approved" } : appt
        )
      );
    } catch (error) {
      console.error("Approval failed:", error);
      toast.error("Failed to approve appointment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }
    
    try {
      await axios.delete(`http://localhost:8000/api/appointments/${id}/`);
      toast.success("Appointment deleted successfully");
      setAppointments(prev => prev.filter(appt => appt.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete appointment");
    }
  };

  if (loading) {
    return (
      <div className="ml-64 p-8 max-w-7xl flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 max-w-7xl">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Appointment List
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
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr
                  key={appt.id}
                  className={`text-sm transition-all duration-200 hover:bg-gray-100 ${
                    appt.status === "Approved" ? "bg-green-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3">{appt.id}</td>
                  <td className="px-4 py-3">{appt.email}</td>
                  <td className="px-4 py-3">{appt.weeks}</td>
                  <td className="px-4 py-3">Rs. {appt.price}</td>
                  <td className="px-4 py-3">{appt.address}</td>
                  <td className="px-4 py-3">{appt.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appt.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {appt.status !== "Approved" && (
                      <button
                        onClick={() => handleApprove(appt.id)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow transition-all duration-200"
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