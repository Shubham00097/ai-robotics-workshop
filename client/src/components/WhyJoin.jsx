/**
 * WhyJoin.jsx
 * "Why Join This Workshop?" section with 5 feature highlights and a decorative dark background.
 */

import { motion } from 'framer-motion';
import { MonitorPlay, Hammer, GraduationCap, Award, Users } from 'lucide-react';

const features = [
  {
    id: 'live-classes',
    icon: MonitorPlay,
    title: 'Live Interactive Classes',
    description:
      'Real-time sessions with instructors who answer questions, run polls, and make learning dynamic — not pre-recorded videos.',
    gradient: 'from-indigo-500 to-purple-600',
    shadow: 'shadow-indigo-500/25',
  },
  {
    id: 'hands-on-projects',
    icon: Hammer,
    title: 'Hands-On Projects',
    description:
      'Every concept is reinforced with a project. Students build actual things — robots, AI demos, and automation workflows.',
    gradient: 'from-purple-500 to-pink-600',
    shadow: 'shadow-purple-500/25',
  },
  {
    id: 'expert-mentors',
    icon: GraduationCap,
    title: 'Expert Mentors',
    description:
      'Learn from industry professionals and educators who specialize in teaching AI and STEM to children.',
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/25',
  },
  {
    id: 'certificate',
    icon: Award,
    title: 'Certificate of Completion',
    description:
      'A verified certificate that students can share on social media, add to portfolios, and show off with pride.',
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/25',
  },
  {
    id: 'small-batch',
    icon: Users,
    title: 'Small Batch Learning',
    description:
      'Cohorts are kept small (max 20 students) so every child gets personal attention and nobody gets left behind.',
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/25',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WhyJoin() {
  return (
    <section id="why-join" className="py-24 px-4 dark-gradient-bg text-white relative overflow-hidden" aria-labelledby="why-join-heading">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-3">Why Us</p>
          <h2 id="why-join-heading" className="text-4xl md:text-5xl font-black mb-4">
            Why Join This <span className="gradient-text">Workshop?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We deliver highly engaging learning environments designed to help kids succeed and enjoy technology.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" aria-hidden="true" />
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, border: '1px solid rgba(255,255,255,0.15)' }}
                className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800/80 flex flex-col gap-6 backdrop-blur-sm transition-all duration-200"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow} flex-shrink-0`}>
                  <IconComponent size={26} color="white" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-lg text-slate-100">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}