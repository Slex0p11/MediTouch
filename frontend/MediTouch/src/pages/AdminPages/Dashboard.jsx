import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    totalCategories: 0,
    totalUsers: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard-stats/");
        setStats(response.data);
      } catch (err) {
        setError("Failed to load statistics.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users.");
      }
    };

    fetchStats();
    fetchUsers();
    setLoading(false);
  }, []);

  const handleEdit = (username) => {
    console.log("Edit user:", username);
    // Redirect or open a modal for editing
  };

  const handleDelete = async (username) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${username}/`);
        // Update the state to remove the deleted user from the UI
        setUsers(users.filter(user => user.username !== username));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen w-full dark:bg-gray-700 flex flex-col items-center p-6">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:py-12 lg:px-8 ml-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white text-center">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-6">
          <div className="bg-white shadow rounded-lg dark:bg-gray-900 p-6 text-center">
            <h5 className="text-gray-500 dark:text-gray-400">Total Medicines</h5>
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">{stats.totalMedicines}</h2>
          </div>
          <div className="bg-white shadow rounded-lg dark:bg-gray-900 p-6 text-center">
            <h5 className="text-gray-500 dark:text-gray-400">Total Categories</h5>
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">{stats.totalCategories}</h2>
          </div>
          <div className="bg-white shadow rounded-lg dark:bg-gray-900 p-6 text-center">
            <h5 className="text-gray-500 dark:text-gray-400">Total Users</h5>
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">{stats.totalUsers}</h2>
          </div>
        </div>

        {/* User Management Table */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">User Management</h3>
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-300">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg dark:bg-gray-900 p-6">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.username} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-5 py-3 text-gray-900 dark:text-gray-300">{user.first_name}</td>
                      <td className="px-5 py-3 text-gray-900 dark:text-gray-300">{user.last_name}</td>
                      <td className="px-5 py-3 text-gray-900 dark:text-gray-300">{user.username}</td>
                      <td className="px-5 py-3 text-gray-900 dark:text-gray-300">{user.dob}</td>
                      <td className="px-5 py-3 text-gray-900 dark:text-gray-300">{user.role}</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => handleEdit(user.username)}
                          className="text-blue-500 hover:text-blue-700 mr-3"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.username)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
