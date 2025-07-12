import ThreeScene from '../../components/ThreeScene';

export default function ConversationalAI() {
  return (
    <main className="container mx-auto p-6 text-center relative">
      <ThreeScene />
      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-mirrorFade">Conversational AI</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg animate-rotate3d">
        <p className="text-gray-600 text-lg">Joins calls, shares screen, guides users through products, and understands commands like 'Show me the dashboard' with real-time explanations.</p>
        <a href="/"><button className="bg-gray-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-gray-600 transition duration-300">Back to Home</button></a>
      </div>
    </main>
  );
}