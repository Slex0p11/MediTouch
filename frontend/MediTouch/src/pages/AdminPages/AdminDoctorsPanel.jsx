import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDoctorsPanel = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/doctors/pending/"
      );
      setPendingDoctors(response.data.doctors);
    } catch (error) {
      toast.error("Failed to fetch pending doctors");
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/admin/doctors/approve/${doctorId}/`
      );

      toast.success(
        <div>
          <p>Doctor approved successfully!</p>
          {response.data.message.includes("email sent") && (
            <p>Notification email was sent to the doctor.</p>
          )}
        </div>
      );

      fetchPendingDoctors(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to approve doctor");
      console.error("Error approving doctor:", error);
    }
  };

  const handleReject = async (doctorId) => {
    const rejectionReason = prompt('Please enter the reason for rejection:');
    if (!rejectionReason) return;
  
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/admin/doctors/reject/${doctorId}/`,
        { rejection_reason: rejectionReason }
      );

      setPendingDoctors(prevDoctors => 
        prevDoctors.filter(doctor => doctor.id !== doctorId)
      );
      
      toast.success(
        <div>
          <p>Doctor registration rejected</p>
          {response.data.email_status.includes('sent') && (
            <p>Notification email was sent to the doctor.</p>
          )}
        </div>
      );
      
      fetchPendingDoctors(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to reject doctor');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header remains on the left */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Approvals</h1>
          <p className="text-gray-600 mt-2">
            Review and approve pending doctor registrations
          </p>
        </div>

        {/* Right-aligned content container */}
        <div className="flex justify-end">
          {/* Grid container with max-width */}
          <div className="w-full max-w-5xl">
            {pendingDoctors.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-500 text-lg">
                  No pending doctor registrations
                </div>
                <div className="mt-4 text-gray-400">All clear! 🎉</div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {doctor.first_name} {doctor.last_name}
                          </h3>
                          <p className="text-gray-500">
                            {doctor.specialization}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {doctor.email}
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(doctor.dob).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                            />
                          </svg>
                          <div className="flex space-x-3">
                            <a
                              href={doctor.license_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View License
                            </a>
                            <a
                              href={doctor.degree_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Degree
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Registered:{" "}
                          {new Date(doctor.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => handleApprove(doctor.id)}
                          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(doctor.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminDoctorsPanel;
