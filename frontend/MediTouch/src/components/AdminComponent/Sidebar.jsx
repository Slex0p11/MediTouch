import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="bg-gradient-to-b from-blue-800 to-blue-900 h-screen fixed top-0 left-0 w-64 py-6 px-4 overflow-auto shadow-2xl">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <Link to="/">
          <img
            src="https://i.imgur.com/Pul2AD6.png"
            alt="logo"
            className="w-40 filter brightness-0 invert"
          />
        </Link>
      </div>

      {/* Main Menu */}
      <div className="space-y-1">
        <Link
          to="/medicineadmin/dashboard"
          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="font-medium">Dashboard</span>
        </Link>
      </div>

      {/* Medicine Section */}
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-4 mb-3">
          Medicine Management
        </h3>
        <div className="space-y-1">
          <Link
            to="/medicineadmin/medicinelist"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                clipRule="evenodd"
              />
            </svg>
            <span>Medicine List</span>
          </Link>

          <Link
            to="/medicineadmin/addmedicine"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Medicine</span>
          </Link>

          <Link
            to="/medicineadmin/categorylist"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M17 10a7 7 0 11-14 0 7 7 0 0114 0zm-7-3a3 3 0 00-3 3v1a1 1 0 01-1 1H5a1 1 0 000 2h1a1 1 0 011 1v1a3 3 0 006 0v-1a1 1 0 011-1h1a1 1 0 100-2h-1a1 1 0 01-1-1v-1a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>Category List</span>
          </Link>

          <Link
            to="/medicineadmin/addcategory"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Category</span>
          </Link>

          <Link
            to="/medicineadmin/medicineorders"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>Medicine Orders</span>
          </Link>
        </div>
      </div>

      {/* Doctor Section */}
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-4 mb-3">
          Doctor Management
        </h3>
        <div className="space-y-1">
          <Link
            to="/medicineadmin/viewdoctor"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
            <span>Register Doctor</span>
          </Link>

          <Link
            to="/medicineadmin/approveddoctors"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Approved Doctors</span>
          </Link>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-4 mb-3">
          Account
        </h3>
        <div className="space-y-1">
          <Link
            to="/adminlogin"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-4 mb-3">
          Appointment
        </h3>
        <div className="space-y-1">
          <Link
            to="/medicineadmin/list"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>View Appointments</span>
          </Link>
        </div>
      </div>
      
    </nav>
  );
};

export default Sidebar;
