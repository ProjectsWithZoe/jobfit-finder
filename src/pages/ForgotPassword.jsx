import { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { auth } from "./firebaseAuth";
//import { Button } from "./Button";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Error: Unable to send password reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="md:w-[80%] max-w-md space-y-8">
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        {message && (
          <div className="p-4 rounded-full bg-green-500 text-white">
            {message}
          </div>
        )}
        {error && <div className="p-4 bg-red-500 text-white">{error}</div>}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <label>Email: </label>
          <input
            className="w-full px-2 py-2 rounded-lg bg-purple-100 border border-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder-gray-500"
            label="Enter your email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="text-purple bg-purple-400 p-4 rounded-full"
            disabled={isLoading}
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
