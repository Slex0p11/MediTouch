import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleRegister = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", data);
      alert("Registration successful!");
      console.log(response.data);
      reset();
      
      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || "Error occurred");
      alert("Error during registration. Please try again.");
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
                {...register("first_name", { required: "First name is required" })}
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
                {...register("last_name", { required: "Last name is required" })}
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
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Date of Birth
              </label>
              <input
                {...register("dob", { required: "Date of birth is required" })}
                type="date"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
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
