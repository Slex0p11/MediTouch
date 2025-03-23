import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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

        // Store the tokens
        localStorage.setItem("accessToken", response.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.refreshtoken);

        // Store user data properly
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to the home page
        navigate("/");
        reset();
      }
    } catch (error) {
      console.error(error.response?.data || "Login error");
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="#">
            <img
              src="https://i.imgur.com/Pul2AD6.png"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(handleLogin)}>
              {/* Email Input */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter email"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>

              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <span
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;