import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Send, 
  Image as ImageIcon, 
  Sparkles, 
  Wand2,
  ArrowLeft,
  Info,
  Loader2,
  Bot
} from 'lucide-react';
import { User } from '../../App';
import { GoogleGenAI } from "@google/genai";

interface ImageStudioProps {
  user: User;
  onBack: () => void;
  onOpenMenu: () => void;
}

const suggestions = [
  {
    emoji: "🎬",
    title: "Cinematic Landscape",
    desc: "Epic wide shots, dramatic lighting",
    gradient: "rgba(255,100,50,0.15), rgba(255,154,108,0.08)",
    prompt: "A cinematic wide landscape with "
  },
  {
    emoji: "🎨",
    title: "Digital Art Portrait",
    desc: "Stylized, vivid, ultra-detailed",
    gradient: "rgba(150,50,255,0.15), rgba(100,100,255,0.08)",
    prompt: "A stylized, vivid, ultra-detailed digital art portrait of "
  },
  {
    emoji: "🔥",
    title: "YouTube Thumbnail",
    desc: "High contrast, attention-grabbing",
    gradient: "rgba(255,200,50,0.15), rgba(255,150,50,0.08)",
    prompt: "A high contrast, attention-grabbing YouTube thumbnail featuring "
  },
  {
    emoji: "🌌",
    title: "Space & Cosmos",
    desc: "Nebulas, galaxies, cosmic art",
    gradient: "rgba(50,150,255,0.15), rgba(100,50,255,0.08)",
    prompt: "A cosmic art piece showing nebulas and galaxies with "
  },
  {
    emoji: "👤",
    title: "AI Avatar",
    desc: "Futuristic profile, neon style",
    gradient: "rgba(50,255,150,0.12), rgba(50,200,255,0.08)",
    prompt: "A futuristic AI avatar profile in neon style of "
  },
  {
    emoji: "🏙️",
    title: "Cyberpunk City",
    desc: "Neon lights, rain, dark future",
    gradient: "rgba(255,50,150,0.15), rgba(150,50,255,0.08)",
    prompt: "A cyberpunk city with neon lights and rain in a dark future, "
  }
];

export default function ImageStudio({ user, onBack, onOpenMenu }: ImageStudioProps) {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai', text: string, images?: string[] }>>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  
  const genStatuses = [
    "🔍 Analyzing your vision...",
    "🎨 Understanding composition...",
    "✨ Crafting the elements...",
    "🌌 Generating your image...",
    "⚡ Almost there..."
  ];

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    // Show welcome banner on mount
    const timer = setTimeout(() => {
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3500);
    }, 500);

    // Create stars
    const container = document.getElementById('image-studio-page');
    if (container) {
      for (let i = 0; i < 120; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: white;
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          opacity: ${Math.random() * 0.7 + 0.2};
          animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite;
          pointer-events: none;
          z-index: 0;
        `;
        container.appendChild(star);
      }

      // Create asteroids
      for (let i = 0; i < 8; i++) {
        const asteroid = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 10;
        const startX = Math.random() * 100;
        const angle = Math.random() * 20 + 30;
        
        asteroid.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size * 0.4}px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,220,180,0.9) 50%,
            rgba(255,255,255,0) 100%
          );
          border-radius: 50%;
          top: -10px;
          left: ${startX}%;
          transform: rotate(${angle}deg);
          animation: asteroidFall ${duration}s linear ${delay}s infinite;
          pointer-events: none;
          z-index: 0;
          box-shadow: 0 0 6px rgba(255,200,150,0.6);
        `;
        container.appendChild(asteroid);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % genStatuses.length);
      }, 1800);
    } else {
      setStatusIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text && uploadedImages.length === 0) return;
    if (isGenerating) return;

    setHasStarted(true);
    setIsGenerating(true);
    
    // Add user message
    const userMsg = { role: 'user' as const, text, images: [...uploadedImages] };
    setMessages(prev => [...prev, userMsg]);
    
    // Clear input
    setInput("");
    setUploadedImages([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const prompt = `The user wants to generate this image:
      "${text}". 
      Give them detailed feedback on:
      - How to improve their prompt
      - What style/mood this will create
      - 3 variations they could try
      Keep it encouraging and creative.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      // Artificial delay
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Failed to analyze prompt." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Something went wrong while analyzing your prompt. Please try again." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (suggestion: typeof suggestions[0]) => {
    setInput(suggestion.prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }
      }, 0);
    }
  };

  return (
    <motion.div 
      id="image-studio-page"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[10000] flex flex-col overflow-hidden"
      style={{
        background: '#050510'
      }}
    >
      {/* Space Effects Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Nebula 1 */}
        <div 
          className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full animate-[nebulaDrift1_15s_ease-in-out_infinite]" 
          style={{
            background: 'radial-gradient(circle, rgba(255,100,150,0.08) 0%, rgba(150,50,255,0.05) 50%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        {/* Nebula 2 */}
        <div 
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full animate-[nebulaDrift2_18s_ease-in-out_infinite]" 
          style={{
            background: 'radial-gradient(circle, rgba(50,150,255,0.07) 0%, rgba(255,154,108,0.04) 50%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        {/* Nebula 3 */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full animate-[nebulaDrift3_12s_ease-in-out_infinite]" 
          style={{
            background: 'radial-gradient(circle, rgba(255,200,100,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        {/* Shooting Star */}
        <div 
          className="absolute top-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent rounded-[2px] animate-[shootingStar_1.2s_ease-in_8s_infinite]" 
          style={{ width: '120px' }}
        />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 py-3 min-h-[60px] bg-[rgba(5,5,16,0.8)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.06)] shrink-0 sticky top-0 z-[100] anim-fadeDown">
        <button 
          onClick={onOpenMenu}
          className="w-10 h-10 rounded-xl bg-white/8 border border-white/12 flex flex-col items-center justify-center gap-[4px] cursor-pointer hover:bg-white/15 transition-colors relative z-[200]"
        >
          <div className="w-[18px] h-[1.5px] bg-white rounded-full" />
          <div className="w-[18px] h-[1.5px] bg-white rounded-full" />
          <div className="w-[18px] h-[1.5px] bg-white rounded-full" />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFBFA6" />
                  <stop offset="100%" stopColor="#FF9A6C" />
                </linearGradient>
              </defs>
              <path d="M25,60 A15,15 0 0,1 40,45 A20,20 0 0,1 80,45 A15,15 0 0,1 85,70 L25,70 Z" fill="url(#logoGrad)" />
            </svg>
            <span className="font-display font-extrabold text-white text-base tracking-tight">Scribo AI</span>
          </div>
          <span className="text-[rgba(255,154,108,0.9)] text-[10px] font-bold tracking-[2px] uppercase mt-0.5">Image Studio</span>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </nav>

      {/* Welcome Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            className="bg-[rgba(255,154,108,0.12)] border-b border-[rgba(255,154,108,0.15)] py-3 px-5 flex items-center justify-center text-center sticky top-0 z-50"
          >
            <span className="text-[rgba(255,154,108,0.95)] text-sm font-semibold">
              🎨 Welcome to Image Studio, {user.name.split(' ')[0]}! Describe your vision and bring it to life ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur Overlay */}
      <div 
        id="studio-blur-overlay"
        className={`absolute inset-0 z-[1] backdrop-blur-[3px] bg-[rgba(5,5,16,0.3)] transition-opacity duration-500 pointer-events-none ${hasStarted ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div 
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center z-10 w-full px-6"
            >
              <div className="relative w-20 h-20 flex items-center justify-center mb-5 anim-popIn delay-1">
                {/* Orbital Ring */}
                <div 
                  className="absolute w-[120px] h-[120px] rounded-full border border-[rgba(255,154,108,0.15)] animate-[orbitRing_8s_linear_infinite]"
                  style={{
                    animation: 'orbitRing 8s linear infinite, popIn 0.8s cubic-bezier(0.23,1,0.32,1) 0.3s forwards',
                    opacity: 0,
                    transform: 'scale(0)'
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-[#FF9A6C] rounded-full absolute top-[-3px] left-1/2 -translate-x-1/2 shadow-[0_0_8px_#FF9A6C]" />
                </div>
                
                <div className="w-20 h-20 rounded-[24px] bg-transparent border-[1.5px] border-dashed border-[rgba(255,154,108,0.4)] flex items-center justify-center relative z-10">
                  <Wand2 className="w-9 h-9 text-white animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              
              <h2 className="font-display text-2xl font-extrabold text-white mb-2 tracking-[0.5px] [text-shadow:0_0_40px_rgba(255,154,108,0.3)] anim-fadeUp delay-2" style={{ animation: 'fadeUp 0.55s cubic-bezier(0.23,1,0.32,1) 0.1s forwards, textGlow 3s ease-in-out 0.65s infinite' }}>Describe Your Vision</h2>
              <p className="text-white/50 text-sm max-w-[300px] mb-8 font-inter anim-fadeUp delay-3">
                Type a prompt below to generate stunning images with AI
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px] w-full max-w-[640px] mt-6 mx-auto">
                {suggestions.map((card, i) => (
                  <button
                    key={i}
                    onClick={() => handleChipClick(card)}
                    className={`group relative flex flex-col gap-[6px] p-[18px_16px] rounded-[16px] border border-[rgba(255,255,255,0.08)] text-left transition-all duration-250 hover:-translate-y-1 hover:scale-[1.02] hover:border-[rgba(255,154,108,0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_20px_rgba(255,154,108,0.1)] overflow-hidden anim-popIn delay-${i+1} studio-card`}
                    style={{ background: `linear-gradient(135deg, ${card.gradient})` }}
                  >
                    <div className="text-[28px] mb-1">{card.emoji}</div>
                    <div className="text-[13px] font-bold text-white/90 font-jakarta">{card.title}</div>
                    <div className="text-[11px] text-white/45 leading-[1.4] font-inter">{card.desc}</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 w-full max-w-[800px] flex flex-col z-10 overflow-hidden"
            >
              <div ref={chatAreaRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 space-y-6 scroll-smooth">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-${msg.role === 'user' ? 'right' : 'left'}-5 duration-300`}>
                    {msg.role === 'user' ? (
                      <div className="max-w-[75%] bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] rounded-[20px_20px_4px_20px] p-[14px_18px] text-white shadow-[0_4px_20px_rgba(255,154,108,0.4)]">
                        {msg.images && msg.images.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap mb-2.5">
                            {msg.images.map((img, i) => (
                              <img key={i} src={img} alt="upload" className="w-16 h-16 object-cover rounded-[10px] border-[1.5px] border-white/30" />
                            ))}
                          </div>
                        )}
                        <p className="text-sm leading-[1.7] whitespace-pre-wrap font-inter">{msg.text}</p>
                      </div>
                    ) : (
                      <div className="max-w-[85%] bg-white/7 border border-[rgba(255,154,108,0.2)] rounded-[4px_20px_20px_20px] p-6 md:p-8 text-white shadow-xl backdrop-blur-md">
                        <div className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-[#FF9A6C] to-[#FFC87A] text-white text-xs font-bold uppercase tracking-wider mb-6">
                          💡 Prompt Analysis
                        </div>
                        <div className="prose prose-invert max-w-none text-white/90 leading-relaxed whitespace-pre-wrap font-inter text-sm md:text-base">
                          {msg.text}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 text-[rgba(255,154,108,0.7)] text-sm font-medium">
                          🚀 Full image generation coming in Phase 2!
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isGenerating && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-left-5 duration-350">
                    <div className="max-w-[80%] bg-white/6 backdrop-blur-[16px] border border-[rgba(255,154,108,0.2)] rounded-[4px_20px_20px_20px] p-[16px_20px] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center shrink-0 shadow-lg">
                        <Bot size={20} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[13px] text-white/70 italic font-inter flex items-center gap-1">
                          {genStatuses[statusIndex]}
                          <div className="flex gap-1 ml-1">
                            <div className="w-[5px] h-[5px] rounded-full bg-[rgba(255,154,108,0.7)] animate-[studioDotBounce_1.4s_infinite]" />
                            <div className="w-[5px] h-[5px] rounded-full bg-[rgba(255,154,108,0.7)] animate-[studioDotBounce_1.4s_infinite_0.2s]" />
                            <div className="w-[5px] h-[5px] rounded-full bg-[rgba(255,154,108,0.7)] animate-[studioDotBounce_1.4s_infinite_0.4s]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <div className="shrink-0 p-4 md:p-5 bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] border-t border-[rgba(255,255,255,0.06)] z-20 anim-fadeUp delay-4">
        <div className="max-w-[720px] mx-auto">
          <div className={`
            flex items-end gap-2 bg-[rgba(255,255,255,0.06)] border-[1.5px] border-[rgba(255,255,255,0.1)] rounded-[20px] p-2.5 transition-all
            focus-within:border-[rgba(255,154,108,0.6)] focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_rgba(255,154,108,0.08),0_0_20px_rgba(255,154,108,0.1)]
          `}>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUploadedImages(prev => [...prev, reader.result as string]);
                    };
                    reader.readAsDataURL(file);
                  });
                }
              }} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-[38px] h-[38px] rounded-xl bg-white/8 border border-white/12 flex items-center justify-center text-white hover:bg-[rgba(255,154,108,0.2)] hover:border-[rgba(255,154,108,0.4)] transition-all shrink-0"
              title="Upload Image"
            >
              <ImageIcon size={18} />
            </button>
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the image you want to create..."
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[42px] max-h-[160px] py-2 px-1 text-[15px] text-white placeholder:text-white/35 font-inter"
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className={`
                w-[42px] h-[42px] rounded-xl flex items-center justify-center transition-all shrink-0
                ${input.trim() && !isGenerating 
                  ? 'bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] opacity-100 shadow-[0_4px_20px_rgba(255,154,108,0.5),0_0_40px_rgba(255,154,108,0.2)] animate-[sendPulse_2s_ease-in-out_infinite]' 
                  : 'bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] opacity-40 cursor-not-allowed'}
              `}
            >
              {isGenerating ? <Loader2 size={18} className="text-white animate-spin" /> : <Send size={18} className="text-white ml-0.5" />}
            </button>
          </div>
          
          <div className="text-[11px] text-white/30 text-center mt-2 font-inter">
            ⚡ Scribo AI Image Studio — Powered by AI • Results may vary
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes nebulaDrift1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-40px,30px) scale(1.1); }
          66% { transform: translate(20px,-20px) scale(0.95); }
        }
        @keyframes nebulaDrift2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.15); }
        }
        @keyframes nebulaDrift3 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes shootingStar {
          0% { 
            transform: translateX(-100px) translateY(-100px) rotate(45deg);
            opacity: 0;
            width: 0;
          }
          10% { opacity: 1; width: 120px; }
          100% { 
            transform: translateX(800px) translateY(800px) rotate(45deg);
            opacity: 0;
            width: 120px;
          }
        }
        @keyframes asteroidFall {
          0% {
            transform: rotate(35deg) translateX(0) translateY(-50px);
            opacity: 0;
          }
          5% { opacity: 1; }
          90% { opacity: 0.8; }
          100% {
            transform: rotate(35deg) translateX(600px) translateY(900px);
            opacity: 0;
          }
        }
        @keyframes orbitRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sendPulse {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(255,154,108,0.5); 
          }
          50% { 
            box-shadow: 0 4px 32px rgba(255,154,108,0.9),
                        0 0 60px rgba(255,154,108,0.3);
          }
        }
        @keyframes studioDotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1) rotate(10deg); }
        }
        @keyframes textGlow {
          0%,100% { text-shadow: 0 0 0 transparent; }
          50% { text-shadow: 0 0 30px rgba(255,154,108,0.4); }
        }
        .studio-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.06),
            transparent
          );
          transition: left 0.5s ease;
        }
        .studio-card:hover::after {
          left: 200%;
        }
      `}} />
    </motion.div>
  );
}
