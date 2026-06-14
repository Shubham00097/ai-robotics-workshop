/**
 * Hero.jsx
 * Hero section with animated gradient background, floating icons,
 * workshop title, quick stats, and dual CTAs.
 */

import { motion } from 'framer-motion';
import { Bot, Cpu, Zap, Star, Sparkles, Rocket, ArrowRight } from 'lucide-react';

const floatingIcons = [
  { Icon: Bot,      top: '12%', left: '8%',  delay: 0,    size: 56, color: '#818cf8' },
  { Icon: Cpu,      top: '25%', right: '7%', delay: 0.5,  size: 48, color: '#a78bfa' },
  { Icon: Zap,      top: '65%', left: '5%',  delay: 1,    size: 40, color: '#fbbf24' },
  { Icon: Star,     top: '75%', right: '10%',delay: 1.5,  size: 44, color: '#f472b6' },
  { Icon: Sparkles, top: '45%', right: '4%', delay: 0.8,  size: 36, color: '#34d399' },
  { Icon: Rocket,   top: '55%', left: '3%',  delay: 1.2,  size: 40, color: '#60a5fa' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function Hero() {
  const handleScrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden hero-gradient-bg">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute hidden md:block opacity-30 lg:opacity-45"
            style={{ top: item.top, left: item.left, right: item.right }}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: item.delay }}
          >
            <item.Icon size={item.size} color={item.color} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          className="md:col-span-7 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-150 text-indigo-700 mb-6 uppercase tracking-wider">
            <Sparkles size={14} className="text-amber-500 animate-pulse" />
            Kid-Friendly STEM Program
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 mb-6 leading-tight">
            AI & Robotics <br />
            <span className="gradient-text">Summer Workshop</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-500 text-lg sm:text-xl mb-8 leading-relaxed max-w-xl">
            Spark your child&apos;s curiosity this summer! A 4-week interactive online program where kids ages 8–14 build real AI projects and learn foundational coding logic in a fun, child-friendly environment.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 border-t border-b border-slate-200/60 py-6 mb-8 max-w-lg">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ages</div>
              <div className="text-lg font-black text-slate-700">8–14 Years</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Fee</div>
              <div className="text-lg font-black text-indigo-600">₹2,999</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starts</div>
              <div className="text-lg font-black text-amber-500 font-display">15 July</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleScrollToRegister}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg hover:shadow-indigo-300/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Enroll Now
              <ArrowRight size={18} />
            </button>
            <button
              onClick={handleScrollToDetails}
              className="px-8 py-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 bg-white text-slate-600 hover:text-indigo-600 font-bold text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Course
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:col-span-5 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="relative w-72 sm:w-80 md:w-full max-w-sm aspect-square">
            <div className="absolute inset-0 bg-indigo-400/20 rounded-full filter blur-3xl animate-pulse" aria-hidden="true" />

            <div className="absolute inset-0 rounded-3xl bg-white border border-slate-100 shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden glassmorphism">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-x-8 inset-y-8 border-4 border-dashed border-indigo-200/50 rounded-full pointer-events-none"
              />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-40 h-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg relative z-10"
              >
                <Bot size={72} color="white" strokeWidth={1.5} className="drop-shadow" />
              </motion.div>

              <div className="text-center mt-6 relative z-10">
                <h3 className="font-bold text-slate-700 text-lg">Online Interactive Sessions</h3>
                <p className="text-slate-400 text-xs mt-1">Live Coding, Quizzes & Projects</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}