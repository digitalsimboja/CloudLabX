"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../../../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (provider?: string) => {
    if (provider) {
      console.log(`Logging in with ${provider}`);
      // Handle OAuth login logic here
    } else {
      console.log("Logging in with email/password", { email, password });
      // Handle traditional login logic here
    }
  };

  return (
    <>
      <Navbar isLoggedIn={false} />
      <section className="flex items-center justify-center min-h-screen bg-dark-900 px-4">
        <div className="w-full max-w-sm sm:max-w-md bg-dark-800 text-gray-300 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Welcome Back to CloudLabX
          </h2>

          {/* Email & Password Login */}
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-dark-700 text-white px-10 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-dark-700 text-white px-10 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-dark-700 text-white px-10 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-2">
                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-400 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              onClick={() => handleLogin()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* SSO Login Options */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleLogin("Google")}
              className="flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            <button
              onClick={() => handleLogin("GitHub")}
              className="flex items-center justify-center gap-3 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              <Github size={24} />
              Sign in with GitHub
            </button>

            <button
              onClick={() => handleLogin("LinkedIn")}
              className="flex items-center justify-center gap-3 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              <Linkedin size={24} />
              Sign in with LinkedIn
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
