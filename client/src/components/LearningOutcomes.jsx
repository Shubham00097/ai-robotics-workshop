/**
 * LearningOutcomes.jsx
 * Showcases 6 learning outcomes with staggered animated cards and icons.
 */

import { motion } from 'framer-motion';
import { CheckCircle2, Brain, Wrench, Code2, Settings, Lightbulb, Trophy } from 'lucide-react';

const outcomes = [
  {
    id: 'ai-fundamentals',
    icon: Brain,
    title: 'Understand AI Fundamentals',
    description:
      'Grasp core AI concepts like machine learning, neural networks, and data — explained in a fun, child-friendly way.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    check: 'text-indigo-500',
  },
  {
    id: 'robotics-projects',
    icon: Wrench,
    title: 'Build Beginner Robotics Projects',
    description:
      'Assemble and program simple robotic models using drag-and-drop and block-based programming tools.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    check: 'text-purple-500',
  },
  {
    id: 'coding-logic',
    icon: Code2,
    title: 'Learn Coding Logic & Problem Solving',
    description:
      'Develop computational thinking — breaking problems into steps — through interactive challenges and puzzles.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    check: 'text-blue-500',
  },
  {
    id: 'automation-projects',
    icon: Settings,
    title: 'Create Automation Mini-Projects',
    description:
      'Build small real-world automation workflows and bots that perform tasks automatically — no prior experience needed.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    check: 'text-amber-500',
  },
  {
    id: 'creativity-innovation',
    icon: Lightbulb,
    title: 'Develop Creativity & Innovation',
    description:
      'Turn creative ideas into working prototypes, encouraging out-of-the-box thinking and tinkering.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    check: 'text-pink-500',
  },
  {
    id: 'trophy-badge',
    icon: Trophy,
    title: 'Earn a Certificate of Completion',
    description:
      'Walk away with a digital verified certificate to share on social media and highlight in school portfolios.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    check: 'text-emerald-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function LearningOutcomes() {
  return (
    <section id="outcomes" className="py-24 px-4 bg-slate-50" aria-labelledby="outcomes-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-3">Our Syllabus</p>
          <h2 id="outcomes-heading" className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            What You Will <span className="gradient-text">Learn</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Practical skills, logic concepts, and hands-on projects designed to empower young innovators.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" aria-hidden="true" />
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {outcomes.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -4, border: '1px solid rgba(99,102,241,0.2)' }}
                className="bg-white rounded-2xl p-6 border border-slate-100 flex gap-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                  <IconComponent size={22} aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-slate-700 text-base leading-snug flex items-center gap-2">
                    <CheckCircle2 size={16} className={`flex-shrink-0 ${item.check}`} aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}