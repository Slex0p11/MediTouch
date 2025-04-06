import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaUser, FaUserMd } from "react-icons/fa";
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
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
        Admin Dashboard
      </h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
        {[
          { title: "Total Medicines", value: stats.totalMedicines, color: "bg-blue-100 text-blue-800" },
          { title: "Total Categories", value: stats.totalCategories, color: "bg-green-100 text-green-800" },
          { title: "Total Users", value: stats.totalUsers, color: "bg-purple-100 text-purple-800" }
        ].map((stat, index) => (
          <div key={index} className={`rounded-xl p-6 shadow-md ${stat.color}`}>
            <h5 className="text-lg font-medium mb-2">{stat.title}</h5>
            <h2 className="text-4xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* User Management Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            User Management
          </h3>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg m-4">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "User", "Username", "DOB", "Role", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          {user.role === "Doctor" ? (
                            <FaUserMd className="text-indigo-600" />
                          ) : (
                            <FaUser className="text-indigo-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.dob).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === "Doctor" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        title="Edit"
                      >
                        <FaEdit className="inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash className="inline" />
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
