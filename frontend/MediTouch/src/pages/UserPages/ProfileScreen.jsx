import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/UserComponents/Header";
import Footer from "../../components/UserComponents/Footer";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");

  // Ensure userData is valid before parsing
  const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [image, setImage] = useState(null);

  // Retrieve accessToken from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Format date for display (Optional)
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("first_name", editedUser.first_name);
    formData.append("last_name", editedUser.last_name);
    formData.append("email", editedUser.email);
    formData.append("username", editedUser.username);
    formData.append("dob", editedUser.dob);
    if (image) formData.append("profile_picture", image);
  
    try {
      const response = await axios.put("http://localhost:8000/api/profile/update/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log(response.data); // Check the server response
  
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data)); // Update user data in localStorage
        setEditedUser(response.data.data); // Update state with new user data
        alert("Profile updated successfully!");
        setIsEditMode(false); // Disable editing mode after successful update
      } else {
        alert("Error: User data is missing in the response.");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Error updating profile!");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser(user);
    setImage(null);
    setIsEditMode(false); // Disable editing mode on cancel
  };

  // If no user data, prompt login
  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center">My Profile</h2>
        <div className="flex justify-center mt-4">
          <img
            src={image ? URL.createObjectURL(image) : user.profile_picture || "https://i.imgur.com/Pul2AD6.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
        </div>

        {isEditMode && (
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Change Profile Picture</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        )}

        <div className="mt-6">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="text"
            value={editedUser.email}
            disabled={!isEditMode}
            name="email"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-semibold">Username</label>
          <input
            type="text"
            value={editedUser.username}
            disabled={!isEditMode}
            name="username"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-semibold">First Name</label>
          <input
            type="text"
            value={editedUser.first_name}
            disabled={!isEditMode}
            name="first_name"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-semibold">Last Name</label>
          <input
            type="text"
            value={editedUser.last_name}
            disabled={!isEditMode}
            name="last_name"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-semibold">Date of Birth</label>
          <input
            type="date"
            value={isEditMode ? editedUser.dob : formatDate(editedUser.dob)}
            disabled={!isEditMode}
            name="dob"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mt-6 text-center">
          {!isEditMode ? (
            <button
              onClick={() => setIsEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
