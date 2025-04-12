import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      // Fetch user data from the backend
      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/user/profile/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const userEmail = user ? user.email : null;
  const userName = user ? user.username : null;
  const userProfilePicture = user ? user.profile_picture : "https://i.imgur.com/Pul2AD6.png"; // Use profile picture if available, else fallback to default

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while fetching data
  }

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-[#0076C1] font-poppin min-h-[70px] tracking-wide relative z-50 m-0">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="">
          <img
            src="https://i.imgur.com/Pul2AD6.png"
            alt="logo"
            className="md:w-[70px] w-10 mx-auto"
          />
        </Link>

        <ul className="lg:flex gap-x-12 max-lg:space-y-3">
          <li>
            <Link to="/" className="hover:text-[#FF0000] text-[#000000] font-semibold text-[15px]">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pharmacy" className="hover:text-[#FF0000] text-[#000000] font-semibold text-[15px]">
              Pharmacy
            </Link>
          </li>
          <li>
            <Link to="/appointment" className="hover:text-[#FF0000] text-[#000000] font-semibold text-[15px]">
              Appointments
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-[#FF0000] text-[#000000] font-semibold text-[15px]">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#FF0000] text-[#000000] font-semibold text-[15px]">
              About Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          {accessToken ? (
            // User Profile Dropdown
            <div className="relative">
              <img
                id="avatarButton"
                className="w-10 h-10 rounded-full cursor-pointer"
                src={userProfilePicture} // Dynamically update the profile picture
                alt="User dropdown"
                onClick={toggleDropdown} // Toggle dropdown using state
              />
              {isDropdownVisible && (
                <div id="userDropdown" className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-44">
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div>{userName || "User"}</div>  {/* Display username */}
                    <div className="text-gray-600">{userEmail}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/profile" className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-gray-100">My Profile</Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login & Signup buttons (if user is not logged in)
            <>
              <button
                className="px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-transparent hover:text-[#007bff]"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;