import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth.jsx";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to the main app after sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-white">
      <div className="w-full font-pricing font-pricing max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-purple-700">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full py-2 rounded-lg border border-gray-300 p-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-smfont-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full py-2 rounded-lg border border-gray-300 p-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <span className="">
            Don't have an account?
            <Link to="/sign-up" className="text-primary">
              Sign Up
            </Link>
          </span>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
