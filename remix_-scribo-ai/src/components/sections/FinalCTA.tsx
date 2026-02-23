import React from 'react';
import { motion } from 'motion/react';
import Reveal from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[var(--bg-dark)] text-white">
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--primary)] rounded-full filter blur-[100px] opacity-40" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--accent)] rounded-full filter blur-[100px] opacity-40" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight"
          >
            {"Ready to Start Creating?".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of creators building the future with Scribo AI.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Magnetic>
              <motion.button 
                onClick={() => document.dispatchEvent(new CustomEvent('triggerPageTransition'))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="px-12 py-6 rounded-full bg-white text-[var(--text-dark)] font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300"
              >
                Get Started Free
              </motion.button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
