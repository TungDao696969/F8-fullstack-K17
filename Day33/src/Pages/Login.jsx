import React, { useState, useEffect } from "react";
import { useAuth } from "../stores/authStore";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Login() {
  const { login, loading, error, token } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const continueUrl = params.get("continue");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    login(email, password);
  };

  useEffect(() => {
    if (isSubmit && token) {
      navigate(continueUrl || "/users", { replace: true });
    }
  }, [token]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
          <h1 className="font-bold text-3xl text-center mb-6">Login</h1>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition cursor-pointer">
              {loading ? "Loading..." : "Login"}
            </button>

            {/* Extra */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?
              <span className="text-blue-500 cursor-pointer ml-1">Sign up</span>
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
