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
    <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} transition-all duration-500`}>
      <div className="text-center p-8">
        <h1 className={`text-5xl font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"} mb-6`}>
          Real-Time AI Product Demos
        </h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-8`}>
          Experience professional AI-driven solutions.
        </p>
        <div className="space-x-4 flex justify-center">
          <Link href="/demo-agent">
            <button className="btn btn-hover">Demo Agent</button>
          </Link>
          <Link href="/conversational-ai">
            <button className="btn btn-hover">Conversational AI</button>
          </Link>
        </div>
        <div className="mt-6">
          <button onClick={toggleTheme} className="btn btn-hover mt-4">
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
}