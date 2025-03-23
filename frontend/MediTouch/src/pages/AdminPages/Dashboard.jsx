import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Useredit from "./Useredit";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    totalCategories: 0,
    totalUsers: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/dashboard-stats/"
        );
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

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingUser(userToEdit); // Set the user to be edited
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/users/update/${id}/`,
        updatedData
      );
      if (response.status === 200) {
        // Update the user in the state
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, ...updatedData } : user
          )
        );
        setEditingUser(null); // Close the modal
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/users/delete/${id}/`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="max-w-7xl w-full mt-1 px-4 sm:px-6 lg:py-12 lg:px-8 ml-60">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h5 className="text-gray-500">Total Medicines</h5>
          <h2 className="text-3xl font-semibold text-indigo-600">
            {stats.totalMedicines}
          </h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h5 className="text-gray-500">Total Categories</h5>
          <h2 className="text-3xl font-semibold text-indigo-600">
            {stats.totalCategories}
          </h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h5 className="text-gray-500">Total Users</h5>
          <h2 className="text-3xl font-semibold text-indigo-600">
            {stats.totalUsers}
          </h2>
        </div>
      </div>

      {/* User Management Table */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
          User Management
        </h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    <td className="px-5 py-3 text-gray-900">{user.id}</td>
                    <td className="px-5 py-3 text-gray-900">
                      {user.first_name}
                    </td>
                    <td className="px-5 py-3 text-gray-900">
                      {user.last_name}
                    </td>
                    <td className="px-5 py-3 text-gray-900">{user.username}</td>
                    <td className="px-5 py-3 text-gray-900">{user.dob}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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

      {/* Edit User Modal */}
      {editingUser && (
        <Useredit
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
