import React, { useState } from "react";
import axios from "axios";

const LogIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/admin/login", {
        identifier,
        password,
      });

      console.log("Login successful:", response.data);
      // TODO: Handle success (e.g., redirect or save token)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Admin Login
        </h2>

        {error && (
          <div className="mb-6 text-base text-red-600 bg-red-100 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-lg font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              placeholder="Enter your email or username"
              required
              className="w-full mt-2 px-5 py-3 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className="w-full mt-2 px-5 py-3 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer py-3 text-lg text-white font-semibold rounded-xl transition duration-200 ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-green-500 hover:underline">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
