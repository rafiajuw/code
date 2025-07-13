"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaSun,
  FaMoon,
  FaRobot,
  FaUser,
} from "react-icons/fa";

export default function ConversationalAI() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Assistant. Type or speak to interact.", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceHistory, setVoiceHistory] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(transcript);
        setVoiceHistory((prev) => [transcript, ...prev.slice(0, 5)]);
        handleSend(new Event("submit") as any);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
    }
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMsg = input;
      setMessages([...messages, { text: userMsg, sender: "user" }]);
      setIsTyping(true);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `You said: ${userMsg}. How can I assist?`, sender: "ai" },
        ]);
        setIsTyping(false);
      }, 1200);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setMessages((prev) => [...prev, { text: "Listening...", sender: "ai" }]);
    }
    setIsListening(!isListening);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const quickCommands = ["Help", "Info", "Status"];

  return (
    <div className={`flex h-screen font-sans ${theme === "dark" ? "bg-[#0f1117] text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-between shadow-xl">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FaRobot /> AI Assistant</h2>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Quick Commands</h4>
          <div className="space-y-2">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  handleSend(new Event("submit") as any);
                }}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-left text-sm shadow-sm"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-opacity-50 backdrop-blur-md">
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleTheme}
              className="text-2xl hover:text-yellow-400 transition-colors"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={toggleVoice}
              className="text-2xl hover:text-red-400 transition-colors"
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-transparent">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow-lg flex items-start gap-3 transition-all duration-300 ease-in-out animate-fadeIn ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none"
              }`}
            >
              <div className="pt-1">
                {msg.sender === "user" ? <FaUser /> : <FaRobot />}
              </div>
              <div>{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 items-center text-sm text-gray-400 animate-pulse">
              <FaRobot /> <span>AI is typing...</span>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </section>

        <form
          onSubmit={handleSend}
          className="flex px-6 py-4 border-t bg-[#181a1f]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 px-5 py-3 rounded-l-full text-sm bg-white text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 text-sm bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
