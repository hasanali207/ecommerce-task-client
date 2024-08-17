// Login.jsx
import { useSnackbar } from 'notistack';
import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log(result);
        enqueueSnackbar("Login successful!", { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Login failed. Please try again.", { variant: 'error' });
      });
  };

  const handleGoogleSignIn = () => {
    loginUserWithGoogle()
      .then(() => {
        enqueueSnackbar("Login with Google successful!", { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Google sign-in failed. Please try again.", { variant: 'error' });
      });
  };

  return (
    <div>
     
      {/* login card */}
      <div className="flex items-center justify-center min-h-screen ">
        <section className="w-full max-w-md p-8 mx-auto bg-gray-200 rounded-lg shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Login</h2>
           
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-customPurple focus:ring-customPurple focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-customPurple focus:ring-customPurple focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-customPurple rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <p>Don't have an account?<span className="text-[#22c55e] font-bold underline"><Link to={'/signup'}>Sign Up</Link></span> </p>
          </div>
        </section>
      </div>
    </div>
  );
}
