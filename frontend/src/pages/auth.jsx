import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, UserPlus, LogIn } from "lucide-react";
import useAppStore from "../useAppStore";

const LoginSignup = () => {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("Mentee");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const submit = async () => {
    const endpoint = isLogin
      ? "http://localhost:5000/sign_in"
      : "http://localhost:5000/create_user";
    const payload = isLogin ? { email } : { email, name, role: userRole };

    try {
      const response = await axios.post(endpoint, payload);
      const userData = response.data;
      setUser(userData);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-900">
            {isLogin ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin
              ? "Sign in to access your account"
              : "Create a new account to get started"}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="user-role" className="sr-only">
                  Select your role
                </label>
                <div className="relative">
                  <User className="h-5 w-5 text-indigo-500 absolute top-3 left-3" />
                  <select
                    id="user-role"
                    name="user-role"
                    value={userRole}
                    onChange={handleRoleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Mentee">Mentee</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <div className="relative">
                  <User className="h-5 w-5 text-indigo-500 absolute top-3 left-3" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="h-5 w-5 text-indigo-500 absolute top-3 left-3" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={submit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLogin ? (
                  <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                ) : (
                  <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                )}
              </span>
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleForm}
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1 transition duration-150 ease-in-out"
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