import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        console.log(response.data);

        // Store the tokens and admin info
        localStorage.setItem("accessToken", response.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.refreshtoken);
        localStorage.setItem("userEmail", response.data.email);
        
        // Automatically set the user role as "Admin"
        localStorage.setItem("userRole", "Admin");

        // Redirect to the admin dashboard
        navigate("/medicineadmin/dashboard");

        reset();
      }
    } catch (error) {
      console.error(error.response?.data || "Login error");
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="bg-gray-100 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl shadow-xl">
          <div className="text-center text-white mb-6">
            <h2 className="text-3xl font-bold">Admin Panel Login</h2>
            <a href="#">
            <img
              src="https://i.imgur.com/Pul2AD6.png"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>

          
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            
            {/* Email Input */}
            <div>
              <label className="text-white text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="text"
                {...register("email", { required: true })}
                className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md bg-blue-900 outline-none"
                placeholder="Enter admin email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-white text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md bg-blue-900 outline-none"
                placeholder="Enter password"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium tracking-wide rounded-lg text-white bg-green-300 hover:bg-blue-300 focus:outline-none"
              >
                Sign in
              </button>
            </div>

             
             
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
