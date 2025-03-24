import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    dob: "",
    profile_picture: null,
  });

  // Fetch user profile
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/profile/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserProfile(response.data);
      setFormData({ ...response.data, profile_picture: null }); // Reset file input
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const token = localStorage.getItem("accessToken");
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      await axios.put(
        "http://127.0.0.1:8000/api/user/profile/update/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated successfully");

      // Fetch updated profile data immediately
      fetchUserProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const profilePictureUrl = userProfile?.profile_picture?.startsWith("/media/")
    ? `http://127.0.0.1:8000${userProfile.profile_picture}`
    : userProfile?.profile_picture;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        {!isEditing ? (
          <>
            <div className="flex flex-col items-center">
              {profilePictureUrl ? (
                <img
                  src={profilePictureUrl}
                  alt="Profile"
                  className="w-40 h-40 rounded-lg border-4 border-blue-500 shadow-lg object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-4xl">
                  <i className="fas fa-user"></i>
                </div>
              )}
              <h2 className="text-3xl font-bold mt-6 text-gray-800">
                {userProfile?.first_name} {userProfile?.last_name}
              </h2>
              <p className="text-gray-600 text-lg">{userProfile?.username}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  First Name
                </label>
                <p className="text-gray-800 text-lg">
                  {userProfile?.first_name}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Last Name
                </label>
                <p className="text-gray-800 text-lg">
                  {userProfile?.last_name}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Username
                </label>
                <p className="text-gray-800 text-lg">{userProfile?.username}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="text-gray-800 text-lg">{userProfile?.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Date of Birth
                </label>
                <p className="text-gray-800 text-lg">{userProfile?.dob}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
