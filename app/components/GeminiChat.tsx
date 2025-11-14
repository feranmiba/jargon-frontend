"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(true);
  // ✅ New state for loading
  const [isLoading, setIsLoading] = useState(false); 
  const inputRef = useRef<HTMLInputElement>(null);

  const sendPrompt = async () => {
    // Only send if not loading and prompt has content
    if (isLoading || !prompt.trim()) return;

    // Save current prompt to display (optional, but good practice)
    const userPrompt = prompt.trim();
    setPrompt(""); // Clear input immediately
    setResponse(""); // Clear previous response to show loading state

    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await res.json();
      
      // Handle API errors gracefully
      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse(`Error: ${data.error || "Could not connect to the model."}`);
      }

    } catch (error) {
      setResponse("Network error: Could not reach the API server.");
    } finally {
      setIsLoading(false);
      // Optional: Focus back on input after sending
      if (inputRef.current) inputRef.current.focus(); 
    }
  };
  
  // ✅ Function to handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendPrompt();
    }
  };

  // Determine button state/content
  const sendButtonContent = isLoading ? (
    <Loader2 size={18} className="animate-spin" />
  ) : (
    <Send size={18} />
  );

  return (
    <div className="fixed bottom-4 right-4 z-50"> 
      {/* Floating Chat Box */}
      {open && (
        <div className="w-80 h-[420px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300">

          {/* Header (Refined Look) */}
          <div className="bg-blue-600 text-white p-4 text-base font-semibold flex justify-between items-center shadow-md">
            <span>Chat with Jargon 🔐</span>
            <button 
              onClick={() => setOpen(false)} 
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Body (Refined Padding/Layout) */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
            
            {/* Initial Placeholder */}
            {!response && !isLoading && (
              <p className="text-gray-500 italic">
                Ask me anything about encryption, data privacy, or cybersecurity...
              </p>
            )}
            
            {/* ✅ Loading State */}
            {isLoading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader2 size={16} className="animate-spin" />
                <span>Jargon is typing...</span>
              </div>
            )}

            {/* Response Display */}
            {response && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-gray-800 shadow-sm whitespace-pre-wrap">
                {response}
              </div>
            )}
          </div>

          {/* Input Area (Refined Look) */}
          <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
            <input
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress} // ✅ Added Enter key handler
              placeholder="Ask Jargon something..."
              className="flex-1 p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow"
              disabled={isLoading} // ✅ Disable while loading
            />
            <button
              onClick={sendPrompt}
              disabled={isLoading || !prompt.trim()} // ✅ Disable while loading or empty
              className={`p-3 rounded-full text-white transition-colors flex items-center justify-center
                ${(isLoading || !prompt.trim()) 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
              aria-label="Send Prompt"
            >
              {sendButtonContent}
            </button>
          </div>

        </div>
      )}

      {/* Floating Bubble Button (Refined Look/Placement) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-105"
          aria-label="Open Chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}