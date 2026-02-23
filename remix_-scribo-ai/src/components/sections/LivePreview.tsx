import React from 'react';
import { motion } from 'motion/react';

export default function LivePreview() {
  return (
    <section className="py-24 bg-[var(--bg-alt)] overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 flex flex-wrap justify-center gap-x-3">
              {"See Scribo AI in Action".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[var(--text-mid)] text-lg"
          >
            Real-time generation. Instant results.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch overflow-x-auto md:overflow-visible pb-8 snap-x snap-mandatory px-4">
          
          {/* Panel 1: Script Output (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -80, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: false, margin: "-50px" }}
            className="w-full md:w-[350px] flex-shrink-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden snap-center"
          >
            <div className="bg-gray-50 border-b border-gray-100 p-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-6 font-mono text-sm space-y-4">
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Script Generator Output</div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                  visible: { transition: { staggerChildren: 0.5, delayChildren: 0.5 } }
                }}
              >
                <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-[var(--text-dark)] font-bold">Title: The Future of AI</motion.p>
                <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-[var(--text-mid)]">[Intro Music Fades In]</motion.p>
                <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-[var(--text-dark)]">Host: "Imagine a world where..."</motion.p>
                <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-[var(--text-mid)]">
                  [Cut to B-Roll of City] <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>|</motion.span>
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Panel 2: Prompt Builder (Center/Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: false, margin: "-50px" }}
            className="w-full md:w-[400px] flex-shrink-0 bg-white rounded-2xl shadow-2xl border border-[var(--primary)]/20 overflow-hidden relative z-10 snap-center"
          >
            <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <span className="font-bold text-[var(--text-dark)]">Prompt Builder Lab</span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['Cinematic', '4K', 'Cyberpunk', 'Neon'].map((tag, i) => (
                  <motion.span 
                    key={tag}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1), type: "spring", bounce: 0.5 }}
                    viewport={{ once: false }}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "94%" }}
                  viewport={{ once: false }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" 
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Optimizing...</span>
                <span>94%</span>
              </div>
            </div>
          </motion.div>

          {/* Panel 3: Strategy (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 80, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: false, margin: "-50px" }}
            className="w-full md:w-[350px] flex-shrink-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden snap-center"
          >
            <div className="bg-gray-50 border-b border-gray-100 p-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
            </div>
            <div className="p-6">
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">Creator Strategy</div>
              <div className="flex items-end gap-2 h-32">
                {[40, 70, 50, 90, 60].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.6 + (i * 0.15), duration: 0.5, ease: "backOut" }}
                    style={{ transformOrigin: "bottom" }}
                    className="flex-1 bg-[var(--accent)]/20 rounded-t-sm relative group"
                  >
                    <div className="absolute bottom-0 left-0 w-full bg-[var(--accent)]" style={{ height: `${h}%` }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
