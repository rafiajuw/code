"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-100 transition-all duration-500">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-5xl font-semibold text-gray-100 dark:text-gray-800 mb-6 leading-tight">
          Real-Time AI Product Demos
        </h1>
        <p className="text-lg text-gray-400 dark:text-gray-600 mb-8">
          Discover cutting-edge AI solutions with seamless demos and interactive experiences designed for professionals.
        </p>
        <div className="space-x-4 flex justify-center flex-wrap">
          <Link href="/demo-agent">
            <button className="btn btn-hover px-6 py-3 text-lg">Demo Agent</button>
          </Link>
          <Link href="/conversational-ai">
            <button className="btn btn-hover px-6 py-3 text-lg">Conversational AI</button>
          </Link>
        </div>
      </div>
    </div>
  );
}