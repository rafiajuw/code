"use client";

import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
          AI Demos
        </Link>
        <div className="space-x-4">
          <Link href="/demo-agent" className="text-gray-600 hover:text-blue-600 transition">
            Demo Agent
          </Link>
          <Link href="/conversational-ai" className="text-gray-600 hover:text-blue-600 transition">
            Conversational AI
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;