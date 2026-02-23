import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import SplashScreen from './components/sections/SplashScreen';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Hero from './components/sections/Hero';
import AssetHub from './components/sections/AssetHub';
import Features from './components/sections/Features';
import OrbitalDiagram from './components/sections/OrbitalDiagram';
import LivePreview from './components/sections/LivePreview';
import Stats from './components/sections/Stats';
import WhoUses from './components/sections/WhoUses';
import TeamLetter from './components/sections/TeamLetter';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import AuthModal from './components/auth/AuthModal';
import BackgroundOrb from './components/ui/BackgroundOrb';
import RotatingRings from './components/ui/RotatingRings';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import ChatStudio from './components/sections/ChatStudio';
import ImageStudio from './components/sections/ImageStudio';
import AboutPage from './components/sections/AboutPage';
import ContactPage from './components/sections/ContactPage';

import PageTransition from './components/ui/PageTransition';

import { auth, onAuthStateChanged, signOut } from './services/firebase';

export interface User {
  name: string;
  email: string;
  avatar: string;
  plan: string;
  uid: string;
  photo?: string | null;
}

// Page Transition Wrapper
const PageWrapper = ({ children, className, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] } }}
    exit={{ opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.28, ease: "easeInOut" } }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newChatTrigger, setNewChatTrigger] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Global Scroll Observer
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, i * 60);
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    (window as any).observeScrollElements = (pageId: string) => {
      document.querySelectorAll(`#${pageId} .scroll-reveal`).forEach(el => scrollObserver.observe(el));
    };

    // Listen for auth open events from anywhere
    const handleAuthOpen = () => setAuthOpen(true);
    document.addEventListener('openAuth', handleAuthOpen);

    // Safety: if still loading after 5 seconds, force stop loading
    const safetyTimer = setTimeout(() => {
      setAuthLoading(false);
    }, 5000);

    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      clearTimeout(safetyTimer);
      console.log('Auth state changed:', firebaseUser?.email || 'null');

      if (firebaseUser) {
        // Build currentUser from Firebase user
        const currentUser: User = {
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Creator',
          email: firebaseUser.email || '',
          avatar: (firebaseUser.displayName || firebaseUser.email || 'C')[0].toUpperCase(),
          plan: "Beta User",
          uid: firebaseUser.uid,
          photo: firebaseUser.photoURL
        };
        
        console.log('Setting user:', currentUser.name);
        
        setUser(currentUser);
        setAuthOpen(false);
        setCurrentPage('chat-studio');
        
        // Show welcome toast
        const firstName = (currentUser.name).split(' ')[0];
        setTimeout(() => {
          setToast(`🎉 Welcome, ${firstName}!`);
          setTimeout(() => setToast(null), 3000);
        }, 800);
        
      } else {
        console.log('No user — showing landing');
        setUser(null);
        setCurrentPage('home');
      }
      setAuthLoading(false);
    });

    return () => {
      clearTimeout(safetyTimer);
      document.removeEventListener('openAuth', handleAuthOpen);
      unsubscribe();
    };
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged will handle state updates
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  // Helper to map currentPage to Sidebar active page
  const getActiveStudioPage = () => {
    switch (currentPage) {
      case 'chat-studio': return 'chat';
      case 'chat-history': return 'history';
      case 'image-studio': return 'image';
      case 'asset-hub': return 'assets';
      case 'about': return 'about';
      case 'contact': return 'contact';
      default: return 'chat';
    }
  };

  // Helper to map Sidebar navigation to currentPage
  const handleStudioNavigate = (page: string) => {
    switch (page) {
      case 'chat': setCurrentPage('chat-studio'); break;
      case 'history': setCurrentPage('chat-history'); break;
      case 'image': setCurrentPage('image-studio'); break;
      case 'assets': setCurrentPage('asset-hub'); break;
      case 'about': setCurrentPage('about'); break;
      case 'contact': setCurrentPage('contact'); break;
      default: setCurrentPage('chat-studio');
    }
  };

  const renderPage = () => {
    if (authLoading) return null;

    if (!user) {
      return (
        <>
          <BackgroundOrb />
          <RotatingRings />
          <PageTransition />
          <Navbar onNavigate={navigate} user={user} onLogout={handleLogout} />
          
          <main>
            {currentPage === 'home' && (
              <>
                <Hero />
                <Features />
                <OrbitalDiagram />
                <LivePreview />
                <Stats />
                <WhoUses />
                <TeamLetter />
                <FinalCTA />
              </>
            )}
            
            {currentPage === 'about' && (
              <AboutSection onBack={() => navigate('home')} />
            )}

            {currentPage === 'contact' && (
              <ContactSection onBack={() => navigate('home')} />
            )}
          </main>

          <Footer />
        </>
      );
    }

    // Authenticated User Views
    return (
      <>
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
          onLogout={handleLogout}
          activeStudioPage={getActiveStudioPage()}
          onNavigate={handleStudioNavigate}
          onNewChat={() => {
            setNewChatTrigger(prev => prev + 1);
            setCurrentPage('chat-studio');
          }}
        />
        <AnimatePresence mode="wait">
          {(currentPage === 'chat-studio' || currentPage === 'chat-history') && (
            <PageWrapper key="chat-studio" className="fixed inset-0 z-50">
              <ChatStudio 
                user={user} 
                onLogout={handleLogout} 
                onNavigateImage={() => setCurrentPage('image-studio')}
                onNavigateAbout={() => setCurrentPage('about')}
                onNavigateContact={() => setCurrentPage('contact')}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={currentPage === 'chat-history' ? 'history' : 'chat'}
                setActivePage={(p) => {
                  if (p === 'history') setCurrentPage('chat-history');
                  else setCurrentPage('chat-studio');
                }}
                newChatTrigger={newChatTrigger}
              />
            </PageWrapper>
          )}
          {currentPage === 'image-studio' && (
            <PageWrapper key="image" className="fixed inset-0 z-[100]">
              <ImageStudio 
                user={user} 
                onBack={() => setCurrentPage('chat-studio')} 
                onOpenMenu={() => setSidebarOpen(true)}
              />
            </PageWrapper>
          )}
          {currentPage === 'about' && (
            <PageWrapper key="about" className="fixed inset-0 z-[10000]">
              <AboutPage 
                user={user} 
                onBack={() => setCurrentPage('chat-studio')} 
              />
            </PageWrapper>
          )}
          {currentPage === 'contact' && (
            <PageWrapper key="contact" className="fixed inset-0 z-[10000]">
              <ContactPage 
                user={user} 
                onBack={() => setCurrentPage('chat-studio')} 
              />
            </PageWrapper>
          )}
          {currentPage === 'asset-hub' && (
            <PageWrapper key="assets" className="fixed inset-0 z-[10000]">
              <AssetHub 
                user={user} 
                onBack={() => setCurrentPage('chat-studio')}
                onOpenMenu={() => setSidebarOpen(true)}
              />
            </PageWrapper>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
      `}</style>

      {authLoading ? (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF8F4, #FFF0E6)',
          zIndex: 99999
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #FF9A6C, #FFC87A)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            <span style={{fontSize: 28}}>✦</span>
          </div>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 16,
            fontWeight: 700,
            color: '#FF9A6C',
            letterSpacing: 1
          }}>Scribo AI</p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: 'rgba(100,100,120,0.6)',
            marginTop: 8
          }}>Loading your workspace...</p>
        </div>
      ) : (
        <div className="relative">
          <CustomCursor />
          
          {renderPage()}
          
          <AuthModal 
            isOpen={authOpen} 
            onClose={() => setAuthOpen(false)} 
          />

          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -20, x: '-50%' }}
                className="fixed top-6 left-1/2 z-[99999] px-6 py-3 bg-white/90 backdrop-blur-md border border-[#FF9A6C]/20 rounded-full shadow-lg shadow-[#FF9A6C]/10 flex items-center gap-2"
              >
                <span className="text-sm font-medium text-[#1A1A2E]">{toast}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
