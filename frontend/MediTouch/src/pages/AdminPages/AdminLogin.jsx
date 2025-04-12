import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Icon for password toggle

const AdminLogin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("accessToken", response.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.refreshtoken);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userRole", "Admin");
        navigate("/medicineadmin/dashboard");
        reset();
      }
    } catch (error) {
      console.error(error.response?.data || "Login error");
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <img
            src="https://i.imgur.com/Pul2AD6.png"
            alt="Admin Logo"
            className="w-28 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Panel Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please enter your credentials
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field with toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-88 bottom-1 -translate-y-1/2 p-1 text-gray-500 rounded-full hover:bg-gray;"
              style={{
                boxShadow: 'none',
                background: 'transparent',
                outline: 'none',
                border: 'none',
              }}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
