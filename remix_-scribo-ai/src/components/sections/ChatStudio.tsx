import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { User } from '../../App';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Clock, 
  LogOut, 
  Send, 
  Plus,
  Youtube,
  PenTool,
  Instagram,
  Lightbulb,
  Menu,
  X,
  Mic,
  Shield,
  Info,
  Loader2,
  Play,
  Hexagon,
  Circle,
  AlertTriangle,
  Mail
} from 'lucide-react';

const SYSTEM_PROMPT = `
You are SCRIBO — the most advanced creative 
AI built specifically for next-gen content 
creators, storytellers, and digital artists.

You are not a regular chatbot.
You are a creative partner, a script doctor,
a storytelling genius, and a hype machine
all rolled into one.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 LANGUAGE INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You automatically detect and match 
the user's language. You support:

- Pure Bengali (বাংলা)
- Pure Hindi (हिंदी)  
- Pure English
- Hinglish (Hindi + English mix)
- Banglish (Bengali + English mix)
- Tamil, Telugu, Marathi, Gujarati
- Any mix the user naturally writes in

RULE: Mirror EXACTLY how the user writes.
If they write "bhai ye script banao yaar"
you reply in Hinglish naturally.
If they write "এই স্ক্রিপ্টটা একটু fix করো"
you reply in Banglish naturally.
Never force one language. Flow with them.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 CREATIVE PERSONALITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You talk like the smartest, most creative
friend in the room — not a corporate AI.

Your energy levels:
- Default: Warm, excited, encouraging
- For dark/horror content: Deep, atmospheric
- For comedy: Loose, funny, quick
- For educational: Clear, punchy, engaging
- For emotional stories: Gentle, powerful

You use emojis naturally — not spamming,
just where they add energy or emotion.

You NEVER say:
❌ "Certainly!" 
❌ "Of course!"
❌ "Great question!"
❌ "As an AI..."
❌ "I'd be happy to..."

You DO say things like:
✅ "Yaar this is gonna be 🔥"
✅ "Okay okay I see the vision—"
✅ "Bro this hook is STRONG"
✅ "চল এটা আরো powerful করি"
✅ "Suno, ek kaam karo—"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ SCRIPT WRITING — MASTER RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When writing any script, ALWAYS follow
this cinematic structure:

HOOK (0-8 seconds):
  Must create an IMMEDIATE emotional reaction.
  Options: Shocking visual, haunting question,
  unbelievable claim, or mid-action scene.
  The viewer must be FROZEN in place.
  Never start with "Hello" or channel intro.

VISUAL STORYTELLING:
  Every scene needs:
  📍 VISUAL — what the camera sees
  🎵 SOUND/MUSIC — atmosphere builders  
  🎙️ VOICEOVER — emotional narration
  💬 DIALOGUE — natural human speech
  💡 DIRECTION NOTE — camera angle/mood

HUMANISTIC DIALOGUE RULES:
  Characters speak like REAL people:
  - Use filler words (um, yaar, arre, dekh)
  - Incomplete sentences when emotional
  - Regional slang based on setting
  - Contradictions (brave people get scared)
  - Subtext — what they DON'T say matters
  - Characters interrupt each other
  - Silence is a dialogue tool too

  WRONG: "I am very frightened right now."
  RIGHT: "Yaar... kuch theek nahi lag raha."
  
  WRONG: "The ghost appeared before them."
  RIGHT: "Aur tab... jal bujh gaya. Sab kuch."

PACING RULES:
  - Scene 1-2: Build the world + characters
  - Scene 3-4: First hint of danger/conflict
  - Scene 5-6: Point of no return
  - Scene 7-8: Maximum tension/climax
  - Final scene: Resolution + plot twist
  - OUTRO: Direct camera, emotional CTA

SENSORY WRITING:
  Don't just describe what is SEEN.
  Describe: smell, temperature, texture,
  sound, physical sensations of fear/joy.
  Example: "The water wasn't just cold —
  it was the kind of cold that reaches
  your bones before your skin."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 CONTENT TYPES YOU MASTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HORROR SCRIPTS:
  - Psychological horror > jump scares
  - Build dread through small details
  - Ambiguous endings work better
  - Real folklore elements (Indian myths)
  - The monster is always more scary 
    when half-hidden

YOUTUBE SCRIPTS:
  - Hook must work WITHOUT sound too
    (many watch on mute)
  - Pattern interrupt every 45-60 seconds
  - B-roll suggestions in brackets
  - Retention trick: tease the ending early
    "By the end of this video, you'll never 
     look at [X] the same way again"

REELS/SHORTS SCRIPTS:
  - First frame must be the CLIMAX moment
  - Text overlay suggestions included
  - Trending audio recommendations
  - Hook → Value → CTA in 60 seconds flat

EMOTIONAL/MOTIVATIONAL:
  - Start with universal pain point
  - Personal story structure (even if fictional)
  - The "dark moment" must be VERY dark
  - Triumph feels earned only after real struggle
  - End with actionable hope, not empty words

COMEDY SCRIPTS:
  - Rule of 3 with subverted 3rd beat
  - Callback jokes (reference earlier in video)
  - Self-deprecation works better than 
    making fun of others
  - Timing notes in script [PAUSE] [BEAT]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 OUTPUT FORMATTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For SCRIPTS, always use this format:

━━━━━━━━━━
🎬 [SCRIPT TITLE]
📺 Platform: [YouTube/Reels/Shorts]
⏱️ Duration: [estimated time]
🎭 Genre: [Horror/Comedy/Educational etc]
━━━━━━━━━━

🪝 HOOK:
[hook content]

🎬 SCENE 1 — [scene title]:
📍 VISUAL: [what we see]
🎵 SOUND: [music/ambient]
💬 DIALOGUE:
  CHARACTER: "line here"
  CHARACTER: "line here"
🎙️ VOICEOVER: [narration if any]
💡 DIRECTOR NOTE: [camera/mood tip]

[continue scenes...]

🎯 OUTRO + CTA:
[closing and call to action]

━━━━━━━━━━
📌 PRODUCTION NOTES:
[3-5 practical tips for filming this]
━━━━━━━━━━

For PROMPTS use [PROMPT_START]...[PROMPT_END]

For CAPTIONS give 3 variations:
  Version 1: Emotional hook
  Version 2: Curiosity gap  
  Version 3: Controversial/bold

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ RESPONSE ENERGY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Use **bold** for 3-5 key words per response
- Short punchy lines mixed with rich detail
- Always end with next-step question or 
  an invitation to go deeper
- If user shares their work, ALWAYS find 
  what's genuinely strong before suggesting 
  improvements — creators need real feedback,
  not empty hype
- If their idea is weak, say so kindly but
  directly — "Yaar sach bolun? Ye hook 
  nahi chalega kyunki... try karein yeh:"
- Max paragraph length: 4 lines
- Always leave space between sections

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 ABSOLUTE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEVER output HTML, CSS, or any code
in conversational responses.

NEVER use [PROMPT_START] outside of 
actual image prompt generation.

NEVER write walls of text.

NEVER give generic advice.
Everything must be specific to 
what the user is creating.

ALWAYS be the most useful creative 
partner the user has ever had.
`;

interface ChatStudioProps {
  user: User;
  onLogout: () => void;
  onNavigateImage: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activePage: 'chat' | 'history';
  setActivePage: (page: 'chat' | 'history') => void;
  newChatTrigger: number;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  images?: string[];
  isThinking?: boolean;
}

interface UploadedImage {
  file: File;
  base64: string;
  name: string;
}

// Custom Markdown Renderer
function renderMarkdown(text: string) {
  let processedText = text;
  
  // 1. Extract Prompt Cards and replace with placeholders
  const promptRegex = /\[PROMPT_START\]([\s\S]*?)\[PROMPT_END\]/g;
  const promptCards: string[] = [];
  processedText = processedText.replace(promptRegex, (match, promptContent) => {
    const promptOnly = promptContent.trim();
    const safePrompt = promptOnly
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/`/g, '\\`');
    
    const cardHTML = `
<div style="background:linear-gradient(135deg,#FFF5EE,#FFE8D6);border:1.5px solid rgba(255,154,108,0.35);border-radius:18px;padding:22px 24px;margin:14px 0;box-sizing:border-box;width:100%;overflow:hidden;box-shadow:0 4px 20px rgba(255,154,108,0.1),0 1px 4px rgba(0,0,0,0.04);">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:nowrap;overflow:hidden;">
    <span style="background:linear-gradient(135deg,#FF9A6C,#FFC87A);color:white;font-size:11px;font-weight:700;padding:6px 14px;border-radius:20px;letter-spacing:1px;white-space:nowrap;flex-shrink:0;text-transform:uppercase;">✦ RECREATE PROMPT</span>
    <button onclick="document.getElementById('hamburger-btn').click()" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:rgba(255,154,108,0.1);border:1.5px solid rgba(255,154,108,0.25);border-radius:20px;font-size:11px;font-weight:600;color:#FF9A6C;cursor:pointer;white-space:nowrap;flex-shrink:0;font-family:inherit;transition:all 0.2s ease;" onmouseover="this.style.background='rgba(255,154,108,0.22)'" onmouseout="this.style.background='rgba(255,154,108,0.1)'">🖼️ Image Studio →</button>
  </div>
  <p style="font-size:14px;line-height:2.0;color:#2A2A3E;margin:0 0 18px;word-break:break-word;white-space:pre-wrap;letter-spacing:0.01em;">${promptOnly}</p>
  <button style="width:100%;display:flex;justify-content:center;padding:10px 20px;background:rgba(255,154,108,0.12);border:1.5px solid rgba(255,154,108,0.3);border-radius:20px;font-size:14px;font-weight:600;color:#FF9A6C;cursor:pointer;" onclick="navigator.clipboard.writeText('${safePrompt}').then(()=>{this.textContent='✅ Copied!';setTimeout(()=>{this.textContent='📋 Copy Prompt'},2000)})">📋 Copy Prompt</button>
</div>`;
    promptCards.push(cardHTML);
    return `__PROMPT_CARD_${promptCards.length - 1}__`;
  });

  // 2. Extract Code Blocks and replace with placeholders
  const codeRegex = /```([\s\S]*?)```/g;
  const codeBlocks: string[] = [];
  processedText = processedText.replace(codeRegex, (match, code) => {
    if (code.includes('RECREATE PROMPT')) return match; // Should not happen due to step 1
    
    const codeHTML = `
      <div style="
        background: linear-gradient(135deg, rgba(255,248,244,0.9), rgba(255,240,230,0.9));
        border: 1.5px solid rgba(255,154,108,0.3);
        border-radius: 16px;
        padding: 18px 20px;
        margin: 14px 0;
        position: relative;
        font-family: 'Inter', monospace;
        font-size: 14px;
        line-height: 1.7;
        color: #1A1A2E;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-x: auto;
      ">
        <div style="margin-top:12px">${code.trim()}</div>
        <button 
          onclick="navigator.clipboard.writeText(\`${code.trim().replace(/`/g, '\\`')}\`).then(() => {
            const toast = document.createElement('div');
            toast.textContent = 'Copied! ⚡';
            toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1A1A2E;color:white;padding:8px 16px;border-radius:20px;font-size:12px;font-weight:500;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:fadeInOut 2s forwards';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
          })"
          style="
            position: absolute;
            top: 12px; right: 12px;
            background: rgba(255,154,108,0.15);
            border: 1px solid rgba(255,154,108,0.3);
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 12px;
            color: #FF9A6C;
            cursor: pointer;
            font-weight: 600;
          ">
          📋 Copy
        </button>
      </div>
    `;
    codeBlocks.push(codeHTML);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // 3. Process the remaining text (Sanitize and Format)
  let html = processedText
    // Escape stray HTML-like content first
    .replace(/style="[^"]*">/g, '')
    .replace(/<(?!span|\/span|strong|\/strong|em|\/em|br|p|\/p|div|\/div)[^>]*>/g, '')
    
    // Bold → orange span
    .replace(/\*\*(.*?)\*\*/g,
      '<strong style="color:#FF9A6C;font-weight:700">$1</strong>')
    
    // Headers
    .replace(/^## (.+)$/gm,
      '<div style="font-size:17px;font-weight:700;color:#1A1A2E;margin:14px 0 6px 0">$1</div>')
    
    // Bullet points  
    .replace(/^[-•] (.+)$/gm,
      '<div style="display:flex;gap:8px;margin:5px 0"><span style="color:#FF9A6C;flex-shrink:0">›</span><span>$1</span></div>')
    
    // Paragraphs — double newline
    .replace(/\n\n/g, '<br><br>')
    
    // Single newline
    .replace(/\n/g, '<br>');

  // 4. Restore Prompt Cards and Code Blocks
  html = html.replace(/__PROMPT_CARD_(\d+)__/g, (match, index) => promptCards[parseInt(index)] || match);
  html = html.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => codeBlocks[parseInt(index)] || match);
  
  return html;
}

export default function ChatStudio({ 
  user, 
  onLogout, 
  onNavigateImage, 
  onNavigateAbout, 
  onNavigateContact,
  sidebarOpen,
  setSidebarOpen,
  activePage,
  setActivePage,
  newChatTrigger
}: ChatStudioProps) {
  // UI State
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showShortcutHint, setShowShortcutHint] = useState(false);
  const [greeting, setGreeting] = useState("Hello");
  const [typedName, setTypedName] = useState("");
  // activePage is now managed by App.tsx
  
  // Chat State
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("Thinking");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");

  // Chat History System
  const storageKey = 'scribo_history_' + user.uid;
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const generateTitle = (message: string) => {
    const cleaned = message.replace(/[^\w\s]/g, '');
    const words = cleaned.split(' ').slice(0, 6);
    return words.join(' ') + (words.length >= 6 ? '...' : '');
  };

  const getAllSessions = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [];
      const all = JSON.parse(raw);
      return all.filter((s: any) => s.expiresAt > Date.now());
    } catch(e) {
      return [];
    }
  };

  const clearExpiredSessions = () => {
    const valid = getAllSessions();
    localStorage.setItem(storageKey, JSON.stringify(valid));
  };

  const saveSession = (session: any) => {
    try {
      const allSessions = getAllSessions();
      const idx = allSessions.findIndex((s: any) => s.id === session.id);
      if (idx >= 0) {
        allSessions[idx] = session;
      } else {
        allSessions.unshift(session);
      }
      localStorage.setItem(storageKey, JSON.stringify(allSessions));
    } catch(e) {
      console.log('Storage full, clearing old chats');
      clearExpiredSessions();
    }
  };

  const startChatSession = (firstMessage: string) => {
    const session = {
      id: 'chat_' + Date.now(),
      title: generateTitle(firstMessage),
      createdAt: Date.now(),
      expiresAt: Date.now() + (48 * 60 * 60 * 1000),
      messages: []
    };
    setCurrentSessionId(session.id);
    saveSession(session);
    return session;
  };

  const saveMessage = (role: 'user' | 'ai', content: string, sessionId: string | null) => {
    if (!sessionId) return;
    const allSessions = getAllSessions();
    const session = allSessions.find((s: any) => s.id === sessionId);
    if (!session) return;
    
    session.messages.push({
      role: role,
      content: content,
      timestamp: Date.now()
    });
    session.expiresAt = Date.now() + (48 * 60 * 60 * 1000);
    saveSession(session);
  };

  const stripHTML = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours/24)}d ago`;
  };

  const loadChatSession = (sessionId: string) => {
    const sessions = getAllSessions();
    const session = sessions.find((s: any) => s.id === sessionId);
    if (!session) return;
    
    setCurrentSessionId(sessionId);
    setActivePage('chat');
    
    // Restore history for Gemini
    const restoredHistory = session.messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));
    setChatHistory(restoredHistory);
    
    // Restore messages for UI
    const restoredMessages: Message[] = session.messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      text: m.content
    }));
    setMessages(restoredMessages);
    
    showToast('✅ Chat restored! Continue where you left off 🚀');
  };

  // Constants
  const MAX_MEMORY = 40;

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Working Late");
  }, []);

  // Welcome Banner Logic
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingStr = '';
    if (hour >= 5 && hour < 12) greetingStr = 'Good Morning';
    else if (hour >= 12 && hour < 17) greetingStr = 'Good Afternoon';
    else if (hour >= 17 && hour < 21) greetingStr = 'Good Evening';
    else greetingStr = 'Working Late';
    
    const firstName = user.name.split(' ')[0];
    setWelcomeText(`${greetingStr}, ${firstName}! Ready to create something amazing today? ✨`);
    
    setTimeout(() => {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 4000);
    }, 500);

    // Typewriter effect for greeting
    const fullGreeting = `${greeting}, ${firstName}! 👋`;
    let i = 0;
    const interval = setInterval(() => {
      setTypedName(fullGreeting.slice(0, i + 1));
      i++;
      if (i === fullGreeting.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [user.name, greeting]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Mobile viewport fix
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const height = window.visualViewport.height;
        document.getElementById('chat-studio-page')!.style.height = `${height}px`;
      }
    };
    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  // Thinking text cycle
  useEffect(() => {
    if (!isThinking) return;
    const states = ["Thinking", "Analyzing", "Creating", "Crafting response", "Almost ready"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % states.length;
      setThinkingText(states[i]);
    }, 1200);
    return () => clearInterval(interval);
  }, [isThinking]);

  // New Chat Trigger
  useEffect(() => {
    if (newChatTrigger > 0) {
      startNewChat();
    }
  }, [newChatTrigger]);

  // Shortcut hint timer
  useEffect(() => {
    const timer = setTimeout(() => setShowShortcutHint(true), 3000);
    const hideTimer = setTimeout(() => setShowShortcutHint(false), 9000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Scroll Reveal Trigger
  useEffect(() => {
    if (activePage === 'history') {
      setTimeout(() => {
        (window as any).observeScrollElements?.('chat-history-page-content');
      }, 100);
    }
  }, [activePage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const startNewChat = () => {
    setChatHistory([]);
    setMessages([]);
    setUploadedImages([]);
    setInput("");
    setCurrentSessionId(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setSidebarOpen(false);
    showToast('✨ New chat started!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (uploadedImages.length + files.length > 5) {
        showToast('⚠️ Maximum 5 images per message');
        return;
      }
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, {
            file,
            base64: e.target?.result as string,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const translateText = async (text: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [{
            text: `Translate this to English naturally. Keep the meaning exactly. Return ONLY the translation, nothing else: "${text}"`
          }]
        }
      });
      return response.text || text;
    } catch (e) {
      console.error("Translation failed", e);
      return text;
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      showToast("Voice not supported on this browser");
      return;
    }

    if (isRecording) return;

    setIsRecording(true);
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'mul'; // Auto-detect

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (event.results[0].isFinal) {
        setIsRecording(false);
        setInput("Translating...");
        const translated = await translateText(transcript);
        setInput(translated);
        showToast("✅ Translated to English");
      } else {
        setInput(transcript + "...");
      }
    };

    recognition.onerror = () => {
      setIsRecording(false);
      showToast("❌ Voice input failed");
    };

    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const sendMessageToGemini = async (userMsg: string, images: UploadedImage[]) => {
    // Prepare history
    let history = [...chatHistory];
    
    // Add user message to history
    const userParts: any[] = [];
    images.forEach(img => {
      userParts.push({
        inlineData: {
          mimeType: img.file.type,
          data: img.base64.split(',')[1]
        }
      });
    });
    userParts.push({ text: userMsg });
    
    history.push({ role: "user", parts: userParts });

    // Trim history if too long (keep last MAX_MEMORY)
    if (history.length > MAX_MEMORY) {
      history = history.slice(-MAX_MEMORY);
    }

    setChatHistory(history);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });
      
      const aiText = response.text;
      
      if (!aiText) throw new Error("No response text");

      // Add AI response to history
      setChatHistory(prev => [...prev, { role: "model", parts: [{ text: aiText }] }]);
      
      return aiText;
    } catch (error) {
      console.error(error);
      // Remove failed user message from history
      setChatHistory(prev => prev.slice(0, -1));
      return "Oops, something broke! Try again? 🔄";
    }
  };

  const handleSend = async () => {
    const msgText = input.trim();
    if (!msgText && uploadedImages.length === 0) return;

    // 1. Add user message
    const newMsg: Message = {
      role: 'user',
      text: msgText,
      images: uploadedImages.map(img => img.base64)
    };
    setMessages(prev => [...prev, newMsg]);
    
    let activeSessionId = currentSessionId;
    if (messages.length === 0) {
      const session = startChatSession(msgText || "Image Upload");
      activeSessionId = session.id;
    }
    saveMessage('user', msgText || "Image Upload", activeSessionId);
    
    // 2. Clear input
    setInput("");
    const currentImages = [...uploadedImages];
    setUploadedImages([]);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // 3. Show thinking
    setIsThinking(true);

    // 4. Call API
    const aiResponse = await sendMessageToGemini(msgText, currentImages);

    // 5. Add AI message
    setIsThinking(false);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    saveMessage('ai', stripHTML(aiResponse), activeSessionId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (text: string) => {
    let fillText = "";
    if (text === "Write a YouTube Script") fillText = "Write a YouTube script about ";
    else if (text === "Build a Prompt") fillText = "Build me an AI prompt for ";
    else if (text === "Instagram Captions") fillText = "Write Instagram captions for ";
    else if (text === "Brainstorm Ideas") fillText = "Help me brainstorm ideas about ";
    
    setInput(fillText);
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Trigger resize
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
      }, 0);
    }
  };

  return (
    <motion.div 
      id="chat-studio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[10000] flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF8F4 0%, #FFF0E6 25%, #FFF5EC 50%, #FFF8F4 75%, #FFFAF7 100%)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" 
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <motion.div 
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FFBFA6] rounded-full blur-[100px] opacity-20 pointer-events-none" 
      />
      <motion.div 
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#FFC87A] rounded-full blur-[80px] opacity-15 pointer-events-none" 
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white/85 backdrop-blur-[20px] border-b border-[rgba(255,154,108,0.15)] sticky top-0 z-50 min-h-[60px] anim-fadeDown">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button 
            id="hamburger-btn"
            title="Open Menu"
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-xl bg-[rgba(255,154,108,0.1)] border border-[rgba(255,154,108,0.2)] flex items-center justify-center cursor-pointer hover:bg-[rgba(255,154,108,0.2)] transition-colors"
          >
            <Menu className="w-5 h-5 text-[var(--text-dark)]" />
          </button>
          <span className="font-display font-semibold text-sm text-[var(--text-mid)] opacity-70 hidden sm:block">Chat Studio</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <svg width="28" height="28" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="headerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFBFA6" />
                <stop offset="100%" stopColor="#FF9A6C" />
              </linearGradient>
            </defs>
            <path d="M25,60 A15,15 0 0,1 40,45 A20,20 0 0,1 80,45 A15,15 0 0,1 85,70 L25,70 Z" fill="url(#headerLogoGrad)" />
            <circle cx="55" cy="55" r="5" fill="white" />
          </svg>
          <span className="font-display font-bold text-base text-gradient">Scribo AI</span>
        </div>

        {/* Right */}
        <div className="relative">
          <button 
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center text-white text-[13px] font-bold shadow-sm hover:shadow-md transition-shadow"
          >
            {user.avatar}
          </button>
          
          <AnimatePresence>
            {userDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-64 bg-white/90 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 overflow-hidden z-50"
              >
                <div className="p-3 border-b border-gray-100 mb-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center text-white font-bold shadow-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-dark)] text-sm">{user.name}</div>
                      <div className="text-xs text-[var(--text-mid)]">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-md w-fit">
                    <Shield size={10} />
                    {user.plan}
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-red-50 text-red-500 transition-colors text-sm font-medium"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Welcome Banner */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            id="welcome-banner"
            initial={{ maxHeight: 0, opacity: 0, padding: 0 }}
            animate={{ maxHeight: 60, opacity: 1, padding: '10px 20px' }}
            exit={{ maxHeight: 0, opacity: 0, padding: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[rgba(255,154,108,0.15)] to-[rgba(255,200,122,0.15)] border-b border-[rgba(255,154,108,0.2)] overflow-hidden sticky top-[60px] z-[49]"
          >
            <span className="text-base">👋</span>
            <span id="welcome-banner-text" className="font-display text-sm font-semibold text-[#FF9A6C] tracking-[0.3px]">
              {welcomeText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activePage === 'chat' ? (
          <motion.div 
            key="chat-page"
            id="chat-studio-page-content"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.98 }}
            transition={{ 
              duration: 0.45, 
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex-1 flex flex-col overflow-hidden relative"
          >
            {/* Main Chat Area */}
      <div 
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative z-10"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {messages.length === 0 ? (
          // Welcome Screen
          <div className="min-h-full flex flex-col items-center justify-center p-6 text-center anim-slideUp delay-1">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-[#FF9A6C]/20 to-[#FFC87A]/20 rounded-full flex items-center justify-center mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,154,108,0.5)]"
            >
              <svg width="40" height="40" viewBox="0 0 100 100" className="animate-pulse">
                <path d="M25,60 A15,15 0 0,1 40,45 A20,20 0 0,1 80,45 A15,15 0 0,1 85,70 L25,70 Z" fill="url(#headerLogoGrad)" />
                <circle cx="55" cy="55" r="5" fill="white" />
              </svg>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--text-dark)] mb-3 min-h-[1.2em]">
              {typedName}
            </h1>
            
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="text-[var(--text-mid)] text-lg mb-10 font-sans"
            >
              What would you like to create today?
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
              {[
                { 
                  icon: Play, 
                  title: "Write a YouTube Script", 
                  desc: "Hooks, intros, full scripts",
                  grad: "from-[#FF9A6C] to-[#FFC87A]" 
                },
                { 
                  icon: Hexagon, 
                  title: "Build a Prompt", 
                  desc: "Engineer perfect AI prompts",
                  grad: "from-[#A78BFA] to-[#8B5CF6]" 
                },
                { 
                  icon: Circle, 
                  title: "Instagram Captions", 
                  desc: "Viral captions & hashtags",
                  grad: "from-[#F472B6] to-[#EC4899]" 
                },
                { 
                  icon: Lightbulb, 
                  title: "Brainstorm Ideas", 
                  desc: "Unlock creative possibilities",
                  grad: "from-[#34D399] to-[#10B981]" 
                }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleChipClick(item.title)}
                  className={`flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-md border-[1.5px] border-[rgba(255,154,108,0.2)] hover:-translate-y-1 hover:border-[rgba(255,154,108,0.4)] hover:shadow-[0_8px_24px_rgba(255,154,108,0.15)] transition-all text-left group anim-popIn delay-${i+1}`}
                >
                  <div className={`w-9 h-9 rounded-[10px] bg-gradient-to-br ${item.grad} flex items-center justify-center text-white shadow-sm shrink-0`}>
                    <item.icon size={16} fill="currentColor" className="opacity-90" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-dark)] text-sm mb-0.5">{item.title}</div>
                    <div className="text-xs text-[var(--text-light)]">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Chat Messages
          <div className="p-5 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto pb-32">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'self-end max-w-[85%]' : 'self-start w-full'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center shrink-0 shadow-sm">
                    {/* Robot Face SVG */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="4" y="8" width="16" height="12" rx="2" />
                      <path d="M12 2v6" />
                      <circle cx="12" cy="2" r="1" fill="white" />
                      <path d="M9 14h.01" strokeLinecap="round" strokeWidth="3" />
                      <path d="M15 14h.01" strokeLinecap="round" strokeWidth="3" />
                    </svg>
                  </div>
                )}
                
                <div className={`
                  p-4 rounded-2xl shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] text-white rounded-tr-sm whitespace-pre-wrap max-w-[85%]' 
                    : 'bg-white/93 backdrop-blur-md border border-[rgba(255,154,108,0.15)] text-[var(--text-dark)] rounded-tl-sm flex-1 min-w-0 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] p-6'}
                `}>
                  {msg.images && msg.images.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {msg.images.map((img, idx) => (
                        <img key={idx} src={img} alt="Uploaded" className="w-20 h-20 object-cover rounded-lg border border-white/20" />
                      ))}
                    </div>
                  )}
                  {msg.role === 'user' ? (
                    <div className="text-[15px] leading-relaxed">{msg.text}</div>
                  ) : (
                    <>
                      <div 
                        className="text-[15px] leading-[1.75] text-[#1A1A2E] overflow-hidden max-w-full"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                      />

                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {isThinking && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="self-start flex gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center shrink-0 shadow-sm">
                  {/* Blinking Robot */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="4" y="8" width="16" height="12" rx="2" />
                    <path d="M12 2v6" />
                    <circle cx="12" cy="2" r="1" fill="white" />
                    <path d="M9 14h.01" strokeLinecap="round" strokeWidth="3" className="animate-pulse" />
                    <path d="M15 14h.01" strokeLinecap="round" strokeWidth="3" className="animate-pulse" />
                  </svg>
                </div>
                <div className="bg-white/90 backdrop-blur-md border border-[rgba(255,154,108,0.2)] rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-2 shadow-sm">
                  <span className="text-sm text-[var(--text-mid)] italic">{thinkingText}</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-[thinkDot_1.2s_infinite]" />
                    <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-[thinkDot_1.2s_infinite_0.2s]" />
                    <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-[thinkDot_1.2s_infinite_0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 md:p-6 z-20 sticky bottom-0 anim-fadeUp delay-2">
        <div className="max-w-[720px] mx-auto relative">
          
          {/* Image Preview */}
          <AnimatePresence>
            {uploadedImages.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-2 mb-2 flex-wrap bg-white/80 backdrop-blur-md p-2 rounded-xl border border-[rgba(255,154,108,0.15)]"
              >
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 group">
                    <img 
                      src={img.base64} 
                      alt="preview" 
                      className="w-full h-full object-cover rounded-[10px] border border-[rgba(255,154,108,0.3)]" 
                    />
                    <button 
                      onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                <div className="text-[10px] text-[var(--text-light)] self-center ml-2">
                  {uploadedImages.length}/5
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`
            group flex items-end gap-2 bg-white/90 backdrop-blur-[20px] border-[1.5px] rounded-[20px] p-3 pl-4 shadow-[0_4px_24px_rgba(255,154,108,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300
            ${isThinking ? 'border-[rgba(255,154,108,0.1)] opacity-80 pointer-events-none' : 'border-[rgba(255,154,108,0.2)] focus-within:border-[#FF9A6C] focus-within:shadow-[0_0_0_4px_rgba(255,154,108,0.1),0_4px_24px_rgba(255,154,108,0.15)]'}
          `}>
            {/* Left Actions */}
            <div className="flex gap-2 pb-1">
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handleImageUpload} 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 rounded-[10px] bg-[rgba(255,154,108,0.1)] hover:bg-[rgba(255,154,108,0.2)] hover:scale-105 flex items-center justify-center text-[#FF9A6C] transition-all"
                title="Upload Image"
              >
                <ImageIcon size={20} />
              </button>
              <button 
                onClick={handleVoiceInput}
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-all hover:scale-105 ${
                  isRecording 
                    ? 'bg-red-100 text-red-500 animate-pulse' 
                    : 'bg-[rgba(255,154,108,0.1)] text-[#FF9A6C] hover:bg-red-50 hover:text-red-500'
                }`}
                title="Voice Input"
              >
                <Mic size={18} />
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening..." : "Ask Scribo AI anything..."}
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-[200px] min-h-[44px] py-2.5 px-1 text-[15px] text-[var(--text-dark)] placeholder:text-[rgba(150,150,170,0.7)] leading-relaxed"
              rows={1}
              disabled={isThinking}
            />
            
            <button 
              onClick={handleSend}
              disabled={(!input.trim() && uploadedImages.length === 0) || isThinking}
              className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] text-white shadow-md transition-all shrink-0 ${
                (input.trim() || uploadedImages.length > 0) && !isThinking
                  ? 'opacity-100 shadow-[0_4px_12px_rgba(255,154,108,0.4)] hover:scale-105 hover:shadow-[0_6px_16px_rgba(255,154,108,0.5)] active:scale-95' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {isThinking ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className={input.trim() ? "ml-0.5" : ""} />}
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-3 mt-2 opacity-60">
            <div className="flex items-center gap-1.5">
              <Info size={11} className="text-[var(--text-mid)]" />
              <p className="text-[11px] text-[var(--text-mid)] font-inter">
                Scribo AI can make mistakes. Please double-check important information.
              </p>
            </div>
            {chatHistory.length > 5 && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(255,154,108,0.08)]">
                <span className="text-[10px] font-medium text-[#FF9A6C]">
                  {chatHistory.length >= MAX_MEMORY 
                    ? `⚡ Keeping last ${MAX_MEMORY / 2} exchanges in memory` 
                    : `💬 ${chatHistory.length} messages in context`}
                </span>
              </div>
            )}
          </div>

          {/* Shortcut Hint */}
          <AnimatePresence>
            {showShortcutHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-medium bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm"
              >
                Press Enter to send • Shift+Enter for new line
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toast */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-[var(--text-dark)] text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl whitespace-nowrap flex items-center gap-2 z-50"
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div 
      key="history-page"
      id="chat-history-page-content"
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.98 }}
            transition={{ 
              duration: 0.45, 
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex-1 flex flex-col overflow-hidden relative"
          >
            {/* Navbar */}
            <nav className="flex items-center justify-between px-5 py-3 bg-white/85 backdrop-blur-[20px] border-b border-[rgba(255,154,108,0.15)] shrink-0">
              <button 
                onClick={() => setActivePage('chat')}
                className="flex items-center gap-2 text-[#FF9A6C] font-semibold text-sm hover:opacity-80 transition-opacity"
              >
                <Plus className="rotate-45" size={18} />
                Back to Chat
              </button>
              <h2 className="font-display font-bold text-base text-[#1A1A2E]">Chat History</h2>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center text-white font-bold text-xs">
                {user.avatar}
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 max-w-[800px] mx-auto w-full box-border">
              {/* History Greeting */}
              <div 
                className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-white/80 to-[rgba(255,154,108,0.05)] border border-[rgba(255,154,108,0.1)] shadow-sm anim-fadeUp delay-1"
              >
                <h3 className="text-2xl font-display font-bold text-[var(--text-dark)] mb-2">
                  Welcome back, {user.name.split(' ')[0]}!
                </h3>
                <p className="text-[var(--text-mid)] text-sm">
                  You have <span className="font-bold text-[#FF9A6C]">{getAllSessions().length}</span> saved conversations. 
                  Chats are automatically deleted after 48 hours to keep your workspace clean.
                </p>
              </div>

              {getAllSessions().length === 0 ? (
                <div className="text-center py-20 opacity-60">
                  <div className="text-5xl mb-4 anim-popIn">💬</div>
                  <div className="text-lg font-bold text-[#1A1A2E] mb-2 anim-fadeUp delay-2">No chats yet</div>
                  <div className="text-sm text-gray-500 anim-fadeUp delay-2">Your conversations will appear here for 48 hours after creation.</div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(() => {
                    const sessions = getAllSessions();
                    const today = new Date().toDateString();
                    const yesterday = new Date(Date.now() - 86400000).toDateString();
                    
                    const grouped: Record<string, any[]> = {};
                    sessions.forEach(session => {
                      const d = new Date(session.createdAt).toDateString();
                      const label = d === today ? 'Today' : d === yesterday ? 'Yesterday' : d;
                      if (!grouped[label]) grouped[label] = [];
                      grouped[label].push(session);
                    });

                    return Object.entries(grouped).map(([label, chats]) => (
                      <div key={label}>
                        <div className="text-[11px] font-bold text-gray-400 tracking-[1.5px] uppercase mb-3 anim-fadeUp">{label}</div>
                        <div className="space-y-3">
                          {chats.map((session, i) => {
                            const timeAgo = getTimeAgo(session.createdAt);
                            const msgCount = session.messages.length;
                            const preview = session.messages[session.messages.length - 1]?.content?.slice(0, 80) || '';
                            const hoursLeft = Math.round((session.expiresAt - Date.now()) / 3600000);
                            
                            return (
                              <div 
                                key={session.id}
                                onClick={() => loadChatSession(session.id)}
                                className="scroll-reveal relative bg-white/85 backdrop-blur-md border border-[rgba(255,154,108,0.15)] rounded-[20px] p-5 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100 hover:border-[rgba(255,154,108,0.35)] transition-all overflow-hidden group"
                              >
                                <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-[#FF9A6C] to-[#FFC87A] rounded-r-full transition-all duration-300 group-hover:top-[15%] group-hover:bottom-[15%]" />
                                <div className="pl-3">
                                  <div className="font-bold text-[#1A1A2E] text-sm mb-1 truncate">{session.title}</div>
                                  <div className="text-xs text-gray-500 mb-3 truncate opacity-70">{preview}...</div>
                                  <div className="flex items-center gap-4 text-[10px] text-gray-400">
                                    <span>🕐 {timeAgo}</span>
                                    <span>💬 {msgCount} messages</span>
                                    <span className={`ml-auto ${hoursLeft < 6 ? 'text-red-500 font-bold' : ''}`}>⏳ {hoursLeft}h left</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay removed - now global in App.tsx */}
    </motion.div>
  );
}
