import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { SimulationStep, ChatMessage } from '../types';
import { getTutorResponse, getStepIntroduction } from '../services/geminiService';

interface ChatTutorProps {
  currentStep: SimulationStep;
}

export const ChatTutor: React.FC<ChatTutorProps> = ({ currentStep }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load initial explanation when step changes
  useEffect(() => {
    const loadIntro = async () => {
      setIsLoading(true);
      const intro = await getStepIntroduction(currentStep);
      setMessages(prev => [
        ...prev, 
        { role: 'model', text: intro, isInitial: true }
      ]);
      setIsLoading(false);
    };
    loadIntro();
  }, [currentStep]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for API (exclude isInitial markers if needed, strictly text)
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const response = await getTutorResponse(currentStep, userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 shadow-lg w-80 sm:w-96 absolute right-0 top-0 bottom-0 z-20">
      <div className="p-4 border-b border-gray-200 bg-blue-600 text-white flex items-center gap-2">
        <Bot size={24} />
        <div>
          <h2 className="font-semibold text-sm">Network Tutor AI</h2>
          <p className="text-xs text-blue-100">Powered by Gemini</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-600'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-lg text-sm max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
               <Bot size={16} />
             </div>
             <div className="p-3 bg-white border border-gray-200 rounded-lg rounded-tl-none shadow-sm flex items-center">
               <Loader2 className="animate-spin text-gray-400" size={16} />
             </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Ask about this step..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};