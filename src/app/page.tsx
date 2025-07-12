"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") || "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-gray-50 via-gray-100 to-white"} transition-all duration-700`}>
      <div className="text-center p-6">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse mb-6">
          Real-Time AI Product Demos
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 mb-8 font-medium">
          Experience the future of AI-driven innovations!
        </p>
        <div className="space-x-4 flex justify-center flex-wrap">
          <Link href="/demo-agent">
            <button className="glass glass-hover px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
              Demo Agent
            </button>
          </Link>
          <Link href="/conversational-ai">
            <button className="glass glass-hover px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
              Conversational AI
            </button>
          </Link>
        </div>
        <div className="mt-8">
          <button
            onClick={toggleTheme}
            className="glass glass-hover px-4 py-2 text-md font-medium text-gray-800 dark:text-gray-200 mt-4 rounded-lg transition-all duration-500"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
}