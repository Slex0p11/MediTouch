import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("dob", data.dob);
    formData.append("password", data.password);
    if (data.profile_picture[0]) {
      formData.append("profile_picture", data.profile_picture[0]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Registration successful! Please log in.");
      console.log(response.data);
      navigate("/login");
      reset();
    } catch (error) {
      console.error(error.response?.data || "Error occurred");
      if (error.response?.data) {
        const errorMessages = Object.values(error.response.data)
          .flat()
          .join("\n");
        alert(`Error: ${errorMessages}`);
      } else {
        alert("Error during registration. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded shadow">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img
            src="https://i.imgur.com/Pul2AD6.png"
            alt="Logo"
            className="w-24 mx-auto"
          />
          <h4 className="text-gray-600 text-lg mt-4">
            Sign up into your account
          </h4>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                First Name
              </label>
              <input
                {...register("first_name", {
                  required: "First name is required",
                })}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter first name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Last Name
              </label>
              <input
                {...register("last_name", {
                  required: "Last name is required",
                })}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter last name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <label className="text-gray-600 text-sm mb-2 block">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                  type="date"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all appearance-none"
                  max={new Date().toISOString().split("T")[0]} // Prevent future dates
                />
                {/* Calendar icon - only shows when browser doesn't support native picker */}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                </span>
              </div>
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            {/* Password with toggle */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute left-50 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    boxShadow: "none",
                    background: "transparent",
                    outline: "none",
                    border: "none",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Profile Picture */}
            <div className="sm:col-span-2">
              <label className="text-gray-600 text-sm mb-2 block">
                Profile Picture
              </label>
              <input
                {...register("profile_picture")}
                type="file"
                accept="image/*"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
