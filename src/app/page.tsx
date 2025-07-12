import ThreeScene from '../app/components/ThreeScene';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main className="container mx-auto p-6 text-center relative">
      <ThreeScene />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-mirrorFade">Real-Time AI Product Demos</h1>
      <p className="text-gray-600 mb-6 text-xl">Experience the future of AI-driven demos!</p>
      <div className="space-x-4">
        <a href="/demo-agent"><button className="bg-mirror-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">Demo Agent</button></a>
        <a href="/conversational-ai"><button className="bg-mirror-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">Conversational AI</button></a>
      </div>
    </main>
  );
}