"use client";

import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaSun, FaMoon } from "react-icons/fa";

interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function DemoAgent() {
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi! I'm your Demo Agent. Type or speak to start a demo.",
    sender: "ai",
  }]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceHistory, setVoiceHistory] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const quickCommands = ["Show Dashboard", "Explain Pricing", "Start Demo"];

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
        setVoiceHistory((prev) => [transcript, ...prev.slice(0, 4)]);
        handleSend(new Event("submit") as any);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        text: "Demo started! Try 'show dashboard' or 'explain pricing'.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setMessages((prev) => [...prev, { text: "Listening...", sender: "ai" }]);
    }
    setIsListening((prev) => !prev);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const MessageBubble = ({ msg }: { msg: Message }) => {
    const base = "my-2 p-4 rounded-2xl max-w-[80%] shadow-xl text-sm transition-all";
    const userStyle = theme === "dark" ? "bg-indigo-500 text-white ml-auto" : "bg-indigo-100 text-black ml-auto";
    const aiStyle = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black";

    return (
      <div className={`${base} ${msg.sender === "user" ? userStyle : aiStyle}`}>{msg.text}</div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#0f1117] text-white" : "bg-white text-gray-900"} transition-all`}>
      <nav className="px-6 py-4 border-b shadow-md flex justify-between items-center bg-opacity-80 backdrop-blur-md">
        <h1 className="text-2xl font-semibold">Demo Agent</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-xl hover:text-yellow-400 transition-colors">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={toggleVoice}
            className={`text-xl ${isListening ? "text-red-500" : "text-green-400"} hover:opacity-80 transition`}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        {isTyping && (
          <div className="my-2 p-3 rounded-xl max-w-[70%] bg-yellow-500 text-white animate-pulse">
            Typing...
          </div>
        )}
        {voiceHistory.length > 0 && (
          <div className={`mt-6 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <strong>Recent Voice Commands:</strong>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              {voiceHistory.map((vh, idx) => (
                <li key={idx}>{vh}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="px-6 py-4 border-t bg-opacity-80 backdrop-blur-md">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                handleSend(new Event("submit") as any);
              }}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm shadow"
            >
              {cmd}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
            className={`flex-1 px-5 py-3 rounded-l-xl text-sm focus:outline-none ${
              theme === "dark"
                ? "bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
                : "bg-white text-black border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            }`}
          />
          <button type="submit" className="px-6 py-3 text-sm bg-indigo-500 text-white rounded-r-xl hover:bg-indigo-600 transition">
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
