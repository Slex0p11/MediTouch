import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserMd } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const DoctorLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/doctor/login/", {
        email: data.email,
        password: data.password,
      });

      if (response.data && response.data.access) {
        // Store tokens and user data with correct property names
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Redirect to doctor dashboard
        navigate("/doctor/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle different error response structures
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.detail || 
                         "Invalid credentials or account not approved";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <Helmet>
        <title>Doctor Login | Meditouch</title>
        <meta name="description" content="Doctor portal sign in" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaUserMd className="text-blue-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Doctor Portal</h1>
          </div>
          
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-xl font-bold mb-6">Sign in to your account</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full text-gray-800 text-sm border ${errors.email ? "border-red-300" : "border-gray-300"} px-4 py-3 rounded-md outline-blue-600`}
                  placeholder="doctor@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  className={`w-full text-gray-800 text-sm border ${errors.password ? "border-red-300" : "border-gray-300"} px-4 py-3 rounded-md outline-blue-600 pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute left-90 bottom-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="!mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign in'}
                </button>
              </div>
            </form>

             
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;