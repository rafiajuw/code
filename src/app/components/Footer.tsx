"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-100 text-gray-400 dark:text-gray-600 p-4 border-t border-gray-800 dark:border-gray-300">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-100 dark:text-gray-800">AI Demos</h3>
        </div>
        <p className="text-sm mb-2">© 2025 AI Demos. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-500 transition-all duration-300">About</a>
          <a href="#" className="hover:text-blue-500 transition-all duration-300">Contact</a>
          <a href="#" className="hover:text-blue-500 transition-all duration-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
}