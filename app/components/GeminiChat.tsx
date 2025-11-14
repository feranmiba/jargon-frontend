"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(true);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.text);
    setPrompt("");
  };

  return (
    <div className="relative">

      {/* Floating Chat Box */}
      {open && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 text-white p-3 text-sm font-semibold flex justify-between items-center">
            <span>Chat with Jargon — Learn About Encrypting Data 🔐</span>
            <button onClick={() => setOpen(false)} className="text-white">
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
            {!response && (
              <p className="text-gray-400">
                Ask me anything about encryption, data privacy, or cybersecurity…
              </p>
            )}

            {response && (
              <div className="bg-gray-100 rounded-xl p-3 text-gray-700 shadow">
                {response}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 p-3 border-t bg-gray-50">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Jargon something..."
              className="flex-1 p-2 rounded-xl border text-sm"
            />
            <button
              onClick={sendPrompt}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl"
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}

      {/* Floating Bubble Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl"
        >
          <MessageCircle size={22} />
        </button>
      )}
    </div>
  );
}
