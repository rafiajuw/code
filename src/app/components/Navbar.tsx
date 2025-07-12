"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 border-b shadow-md bg-gray-900 dark:bg-gray-100 transition-all duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-gray-100 dark:text-gray-800">
          AI Demos
        </Link>
        <div className="flex space-x-6">
          <Link href="/demo-agent" className="text-lg text-gray-300 dark:text-gray-700 hover:text-blue-500 hover:shadow-md transition-all duration-300">
            Demo Agent
          </Link>
          <Link href="/conversational-ai" className="text-lg text-gray-300 dark:text-gray-700 hover:text-blue-500 hover:shadow-md transition-all duration-300">
            Conversational AI
          </Link>
        </div>
      </div>
    </nav>
  );
}