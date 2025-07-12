"use client";

import { useState, useEffect, useRef } from "react";

export default function DemoAgent() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Demo Agent. Type or speak to start a demo.", sender: "ai", avatar: "🤖" },
  ]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceHistory, setVoiceHistory] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const [avatar, setAvatar] = useState("🤖");

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
          setVoiceHistory((prev) => [transcript, ...prev.slice(0, 5)]);
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
      setMessages([...messages, { text: input, sender: "user", avatar }]);
      setIsTyping(true);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Demo started! Try 'show dashboard' or 'explain pricing'.", sender: "ai", avatar: "🤖" },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setMessages((prev) => [...prev, { text: "Listening...", sender: "ai", avatar: "🤖" }]);
      }
    }
    setIsListening(!isListening);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") localStorage.setItem("theme", newTheme);
  };

  const quickCommands = ["Show Dashboard", "Explain Pricing", "Start Demo"];
  const avatars = ["🤖", "😊", "🌐"];

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} transition-all duration-500`}>
      <nav className="p-4 border-b shadow-md">
        <h1 className={`text-3xl font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"} text-center`}>
          Demo Agent
        </h1>
        <div className="flex justify-center space-x-4 mt-3">
          <button onClick={toggleTheme} className="btn btn-hover">
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={toggleVoice}
            className={`btn ${isListening ? "btn-hover bg-red-500 hover:bg-red-600" : "btn-hover bg-green-500 hover:bg-green-600"}`}
          >
            {isListening ? "Stop Listening" : "Start Voice"}
          </button>
          <select
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="btn btn-hover text-gray-800 dark:text-gray-200"
          >
            {avatars.map((av) => (
              <option key={av} value={av}>
                {av}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div className="flex-1 p-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-[70%] ${
              msg.sender === "user"
                ? `${theme === "dark" ? "bg-blue-900" : "bg-blue-200"} text-white ml-auto`
                : `${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} text-black`
            } shadow-md`}
          >
            <span className="inline-block mr-2 text-lg">{msg.avatar}</span>
            <p className="font-medium inline">{msg.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className={`my-2 p-3 rounded-lg max-w-[70%] ${theme === "dark" ? "bg-gray-700" : "bg-gray-600"} text-white`}>
            Typing...
          </div>
        )}
        {voiceHistory.length > 0 && (
          <div className={`mt-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Recent Voice: {voiceHistory.join(", ")}
          </div>
        )}
      </div>
      <div className="p-4 border-t flex flex-col">
        <div className="flex justify-around mb-3">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                handleSend(new Event("submit") as any);
              }}
              className="btn btn-hover"
            >
              {cmd}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to run a demo or give a command..."
            className={`flex-1 p-2 rounded-l-lg ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button type="submit" className="btn btn-hover">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}