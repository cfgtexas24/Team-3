import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* User SVG Icon Could have used other icons */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {" "}
                    {/*Followed a guide on implementing the icons */}
                    <path
                      fillRule="evenodd"
                      d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 6a7 7 0 0114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Mail SVG Icon A little different from the norm*/}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.94 6.07A2 2 0 004 5h12a2 2 0 011.06.07L10 11 2.94 6.07z" />
                  <path d="M18 8v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8l8 5 8-5z" />
                </svg>
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Lock SVG Icon same here chose a interesting lock icon*/}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 1110 0v2h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h1zm6 0V7a3 3 0 00-6 0v2h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
              >
                {/* Eye / EyeOff SVG Icon / toggles open close like an eye :)*/}
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {/* This was kind of odd fron the positioning in css that I was used to but I found this very intresing to learn*/}

                    <path d="M2.293 2.293a1 1 0 011.414 0l14 14a1 1 0 01-1.414 1.414l-1.768-1.768A9.969 9.969 0 0110 18C4.477 18 0 12 0 12s1.871-2.682 5.014-4.387L2.293 4.707a1 1 0 010-1.414zm14.475 10.475A9.969 9.969 0 0020 12s-1.871 2.682-5.014 4.387L16.768 12.768z" />
                    <path d="M9.293 7.293a1 1 0 011.414 0l1 1a1 1 0 11-1.414 1.414l-1-1a1 1 0 010-1.414z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2C4.477 2 0 7 0 7s1.871 2.682 5.014 4.387A9.969 9.969 0 0010 12c5.523 0 10-5 10-5s-1.871-2.682-5.014-4.387A9.969 9.969 0 0010 2zm0 8a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {isLogin && (
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="group relative w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
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
