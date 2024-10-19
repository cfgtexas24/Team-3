import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

import useAppStore from "../useAppStore";

const LoginSignup = () => {
  const navigate = useNavigate();
  const setUser = useAppStore(state => state.setUser);

  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("Mentee"); // State for user role
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // State for name input in signup

  const toggleForm = () => setIsLogin(!isLogin);

  const handleRoleChange = (event) => {
    setUserRole(event.target.value); // Update userRole state
  };

  const submit = async () => {
    const endpoint = isLogin ? "http://localhost:5000/sign_in" : "http://localhost:5000/create_user"; // Choose login or signup route
    const payload = isLogin
      ? { email }
      : { email, name, role: userRole };

    try {
      // Call API with axios
      const response = await axios.post(endpoint, payload);

      // Handle the response (assuming it includes user data)
      const userData = response.data;

      setUser(userData);

      // Check role and navigate accordingly
      if (userData.isMentor === false) {
        navigate("/mentee");
        navigate("/chat", { state: "Mentee" });
      } else if (userData.isMentor === true) {
        navigate("/mentor");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <div className="space-y-6" onSubmit={submit}>
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-4">
            {/* Role Selection Dropdown */}
            {!isLogin && (
              <div className="relative">
                <label htmlFor="user-role" className="block text-sm text-gray-700">
                  Select your role
                </label>
                <select
                  id="user-role"
                  name="user-role"
                  value={userRole}
                  onChange={handleRoleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Mentee">Mentee</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>
            )}

            {/* Name input (only for signup) */}
            {!isLogin && (
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            {/* Email input */}
            <div className="relative">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={submit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>

        {/* Toggle between sign-in and sign-up */}
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleForm}
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
