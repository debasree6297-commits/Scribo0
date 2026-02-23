import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { User } from '../../App';

interface AssetHubProps {
  user: User;
  onBack: () => void;
  onOpenMenu: () => void;
}

const assets = [
  {
    id: 1,
    emoji: "🔊",
    title: "Sound Effects",
    desc: "Thousands of free sound effects for your videos, reels, and podcasts.",
    tag: "Free",
    tagColor: "rgba(100,255,150,0.2)",
    tagBorder: "rgba(100,255,150,0.3)",
    tagText: "#64FF96",
    accent: "rgba(100,255,150,0.1)",
    accentBorder: "rgba(100,255,150,0.2)",
    url: "https://www.myinstants.com/en/index/us/",
    btnText: "Browse Sounds"
  },
  {
    id: 2,
    emoji: "✨",
    title: "Animated Icons",
    desc: "Premium animated icons to make your content pop with life and energy.",
    tag: "Premium",
    tagColor: "rgba(255,200,100,0.2)",
    tagBorder: "rgba(255,200,100,0.3)",
    tagText: "#FFC864",
    accent: "rgba(255,200,100,0.08)",
    accentBorder: "rgba(255,200,100,0.15)",
    url: "https://www.flaticon.com/animated-icons",
    btnText: "Browse Icons"
  },
  {
    id: 3,
    emoji: "😂",
    title: "Meme Clips",
    desc: "Video memes and reaction clips for social media. Go viral instantly.",
    tag: "Viral",
    tagColor: "rgba(255,100,150,0.2)",
    tagBorder: "rgba(255,100,150,0.3)",
    tagText: "#FF6496",
    accent: "rgba(255,100,150,0.08)",
    accentBorder: "rgba(255,100,150,0.15)",
    url: "https://vlipsy.com",
    btnText: "Browse Memes"
  },
  {
    id: 4,
    emoji: "🟢",
    title: "Green Screen Videos",
    desc: "9,000+ free green screen stock videos for professional overlays and effects.",
    tag: "Free",
    tagColor: "rgba(100,255,150,0.2)",
    tagBorder: "rgba(100,255,150,0.3)",
    tagText: "#64FF96",
    accent: "rgba(100,255,150,0.08)",
    accentBorder: "rgba(100,255,150,0.2)",
    url: "https://pixabay.com/videos/search/green%20screen/",
    btnText: "Browse Green Screens"
  },
  {
    id: 5,
    emoji: "🖼️",
    title: "Backgrounds",
    desc: "Curated background collection from the Scribo AI team. Download and use freely.",
    tag: "Exclusive",
    tagColor: "rgba(255,154,108,0.2)",
    tagBorder: "rgba(255,154,108,0.3)",
    tagText: "#FF9A6C",
    accent: "rgba(255,154,108,0.08)",
    accentBorder: "rgba(255,154,108,0.2)",
    url: "https://drive.google.com/drive/folders/1al7hSGboBFHiOVESzaKLqKviV7O5ntUt",
    btnText: "Download Backgrounds"
  }
];

export default function AssetHub({ user, onBack, onOpenMenu }: AssetHubProps) {
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      id="asset-hub-page"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[10000] flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0A1628 0%, #0D2137 40%, #0A1F2E 70%, #071420 100%)'
      }}
    >
      <style>{`
        @keyframes auroraFlow1 {
          0%,100% { transform:translateX(-10%) scaleX(1); opacity:0.6; }
          50% { transform:translateX(10%) scaleX(1.2); opacity:1; }
        }
        @keyframes auroraFlow2 {
          0%,100% { transform:translateX(5%); opacity:0.4; }
          50% { transform:translateX(-5%); opacity:0.8; }
        }
        @keyframes auroraFlow3 {
          0%,100% { transform:translateX(0); opacity:0.3; }
          50% { transform:translateX(8%); opacity:0.7; }
        }
        @keyframes assetFloat {
          0%,100% { transform:translateY(0) rotate(-2deg); }
          50% { transform:translateY(-10px) rotate(2deg); }
        }
        @keyframes gradShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Custom Scrollbar for dark theme */
        #asset-hub-page ::-webkit-scrollbar {
          width: 6px;
        }
        #asset-hub-page ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        #asset-hub-page ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        #asset-hub-page ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>

      {/* Aurora Streaks */}
      <div 
        className="absolute pointer-events-none"
        style={{
          width: '70%', height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(100,255,200,0.15), rgba(255,154,108,0.2), transparent)',
          filter: 'blur(20px)',
          top: '30%', left: 0,
          animation: 'auroraFlow1 8s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute pointer-events-none"
        style={{
          width: '50%', height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(150,100,255,0.12), rgba(255,200,100,0.15), transparent)',
          top: '55%',
          animation: 'auroraFlow2 11s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute pointer-events-none"
        style={{
          width: '40%', height: '1px',
          top: '75%',
          animation: 'auroraFlow3 9s ease-in-out infinite'
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 py-3 min-h-[60px] shrink-0 sticky top-0 z-[100] anim-fadeDown"
        style={{
          background: 'rgba(10,22,40,0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}
      >
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
                <linearGradient id="assetLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFBFA6" />
                  <stop offset="100%" stopColor="#FF9A6C" />
                </linearGradient>
              </defs>
              <path d="M25,60 A15,15 0 0,1 40,45 A20,20 0 0,1 80,45 A15,15 0 0,1 85,70 L25,70 Z" fill="url(#assetLogoGrad)" />
              <circle cx="55" cy="55" r="5" fill="white" />
            </svg>
            <span className="font-display font-extrabold text-base text-white tracking-tight">Scribo AI</span>
          </div>
          <span style={{ color: 'rgba(100,255,200,0.8)', fontSize: '10px', fontWeight: 700, letterSpacing: '2px' }}>
            ASSET HUB
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9A6C] to-[#FFC87A] flex items-center justify-center text-white font-bold text-xs">
          {user.avatar}
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        
        {/* Hero Section */}
        <div className="text-center pt-12 pb-8 px-5">
          <div 
            className="mx-auto flex items-center justify-center mb-5"
            style={{
              width: '72px', height: '72px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(100,255,200,0.15), rgba(255,154,108,0.15))',
              border: '1.5px solid rgba(100,255,200,0.2)',
              animation: 'assetFloat 3.5s ease-in-out infinite'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          
          <h1 
            className="font-display text-[30px] font-extrabold mb-5"
            style={{
              background: 'linear-gradient(135deg, #64FFC8, #FF9A6C, #FFC87A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200%',
              animation: 'gradShimmer 5s ease infinite'
            }}
          >
            Creator Asset Hub
          </h1>
          
          <p 
            className="mx-auto font-inter text-[15px]"
            style={{
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '380px',
              lineHeight: 1.8
            }}
          >
            Everything a creator needs — sounds, icons, memes, green screens & more. All in one place. 🎯
          </p>
        </div>

        {/* Asset Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-[14px] max-w-[800px] mx-auto px-5 pb-12"
        >
          {assets.map((asset, index) => (
            <div
              key={asset.id}
              className={`group relative overflow-hidden ${asset.id === 5 ? 'md:col-span-2' : ''}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                border: `1.5px solid ${asset.accentBorder}`,
                borderRadius: '22px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: 0,
                animation: `fadeUp 0.55s cubic-bezier(0.23,1,0.32,1) ${index * 0.1}s forwards`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                e.currentTarget.style.borderColor = 'rgba(255,154,108,0.4)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3), 0 0 30px rgba(255,154,108,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = asset.accentBorder;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
              onClick={() => window.open(asset.url, '_blank')}
            >
              {/* Glow corner */}
              <div style={{
                position: 'absolute',
                top: '-40px', right: '-40px',
                width: '120px', height: '120px',
                borderRadius: '50%',
                background: `radial-gradient(${asset.accent}, transparent)`,
                pointerEvents: 'none'
              }} />

              {/* TAG badge */}
              <div style={{
                display: 'inline-block',
                background: asset.tagColor,
                border: `1px solid ${asset.tagBorder}`,
                borderRadius: '50px',
                padding: '3px 12px',
                fontFamily: 'Inter',
                fontSize: '11px',
                fontWeight: 700,
                color: asset.tagText,
                letterSpacing: '0.5px',
                marginBottom: '14px'
              }}>
                {asset.tag}
              </div>

              {/* Emoji */}
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>
                {asset.emoji}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '17px',
                fontWeight: 800,
                color: 'white',
                marginBottom: '8px'
              }}>
                {asset.title}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'Inter',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
                margin: '0 0 20px'
              }}>
                {asset.desc}
              </p>

              {/* Open button */}
              <a 
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #FF9A6C, #FFC87A)',
                  borderRadius: '50px',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,154,108,0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {asset.btnText} ↗
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          padding: '0 0 40px',
          fontFamily: 'Inter'
        }}>
          🔮 More assets coming in Phase 2 — fonts, templates, presets & more!
        </div>

      </div>
    </motion.div>
  );
}
