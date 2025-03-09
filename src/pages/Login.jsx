import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebaseAuth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        setDropdownOpen(true);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        setIsLoading(false);
        return;
      }

      navigate("/");
    } catch (err) {
      setError(
        "Error: No account found with this email and password. Please sign up or click forgot password"
      );
      setIsLoading(false);
    }
  }

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      setSuccess(true);
      setIsLoading(false);
    } catch (err) {
      console.log("Email already in use");
      console.log(err);
      setError(
        err instanceof Error ? "Email already in use" : "An error occurred"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-400 p-4">
      <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-2xl p-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl text-purple-500 font-bold text-purple-700">
            Welcome to <span className="text-purple-500">MatchMe</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-100 border border-red-500 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {!error && success && (
            <div className="p-4 bg-green-100 border border-green-500 text-green-700 rounded-lg text-sm">
              A verification email has been sent. Please check your inbox.
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full py-2 m-2 rounded-lg border border-purple-500 bg-primary-200 text-black font-medium transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            >
              Sign in
            </button>
            <button
              type="button"
              className="w-full py-2 m-2 rounded-lg bg-primary text-white font-medium transition hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={handleSignUp}
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>

          <Link
            className="text-xs flex justify-end text-purple-500 hover:underline"
            to="/forgot-password"
          >
            Forgotten Password?
          </Link>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
