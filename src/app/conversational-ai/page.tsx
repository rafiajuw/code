"use client";

import { useState, useEffect, useRef } from "react";

export default function ConversationalAI() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Voice AI Assistant. Speak or type to interact!", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setInput(transcript);
          handleSend(new Event("submit") as any);
        };
        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };
      }
      setTheme(localStorage.getItem("theme") || "dark");
    }
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }, { text: "Processing your request...", sender: "ai" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { text: `You said: ${input}. How can I assist further? (Try 'tell me a joke' or 'explain AI')`, sender: "ai" },
        ]);
      }, 1000);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setMessages((prev) => [...prev, { text: "Listening...", sender: "ai" }]);
      }
    }
    setIsListening(!isListening);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-gray-50 via-gray-100 to-white"} transition-all duration-700`}>
      <nav className="p-6 border-b shadow-2xl">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Voice AI Assistant
        </h1>
        <div className="flex justify-center space-x-6 mt-4">
          <button
            onClick={toggleTheme}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-500 transform hover:scale-105"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={toggleVoice}
            className={`px-6 py-3 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 ${
              isListening
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold`}
          >
            {isListening ? "Stop Listening" : "Start Voice"}
          </button>
        </div>
      </nav>
      <div className="flex-1 p-8 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 p-5 rounded-2xl max-w-[75%] shadow-xl ${
              msg.sender === "user"
                ? `${theme === "dark" ? "bg-blue-900" : "bg-blue-200"} text-white ml-auto`
                : `${theme === "dark" ? "bg-gray-800" : "bg-gray-300"} text-black`
            } transform transition-all duration-500 hover:shadow-2xl hover:scale-102`}
          >
            <p className="font-medium">{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-6 border-t-2 border-gray-300 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or speak your message..."
          className={`flex-1 p-4 rounded-l-2xl ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } border-2 border-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-500`}
        />
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-700 text-white font-semibold rounded-r-2xl shadow-lg hover:from-green-700 hover:to-teal-800 transition-all duration-500 transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  );
}