/**
 * FAQ.jsx
 * Accordion FAQ section with smooth Framer Motion height animations.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

// ── FAQ data ──────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: 'faq-age',
    question: 'What is the age requirement for this workshop?',
    answer:
      'Children aged 8–14 years can participate in the AI & Robotics Summer Workshop. The curriculum is thoughtfully designed to match the cognitive development and attention spans of this age group, using engaging, game-like activities to teach complex concepts.',
  },
  {
    id: 'faq-experience',
    question: 'Do students need prior coding experience?',
    answer:
      'No! The workshop is completely beginner-friendly. We start from zero and build up gradually. Our instructors use block-based visual programming tools before introducing text-based coding, ensuring every student progresses comfortably regardless of their background.',
  },
  {
    id: 'faq-certificate',
    question: 'Will students receive a certificate after completing the workshop?',
    answer:
      'Yes! Every participant who completes the 4-week workshop receives a digital Certificate of Completion. The certificate includes their name, the workshop title, and a verification code. It can be downloaded, printed, and shared on LinkedIn or school portfolios.',
  },
  {
    id: 'faq-materials',
    question: 'What materials or devices are needed?',
    answer:
      'Students need a laptop or desktop with a stable internet connection. We use browser-based tools so no installations are required. All learning materials, recorded session replays, and project files are provided through our online portal at no extra cost.',
  },
  {
    id: 'faq-schedule',
    question: 'What is the weekly schedule and time commitment?',
    answer:
      'The workshop runs for 4 weeks with 3 live sessions per week (Mon, Wed, Fri), each 90 minutes long. Sessions are held in the evening (6–7:30 PM IST) to accommodate school schedules. All sessions are recorded for participants who cannot attend live.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'border-indigo-200 bg-indigo-50/40 shadow-sm'
          : 'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm'
      }`}
    >
      <button
        id={item.id}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-inset rounded-2xl"
      >
        <span className="font-semibold text-slate-700 text-base leading-snug">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 ${isOpen ? 'text-indigo-600' : 'text-slate-400'}`}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${item.id}-panel`}
            role="region"
            aria-labelledby={item.id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0].id);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="faq"
      className="py-24 px-4 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-3">
            Have Questions?
          </p>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-black text-slate-800 mb-4"
          >
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Everything you need to know before enrolling. Can't find an answer?{' '}
            <a
              href="mailto:hello@airobotics.workshop"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Email us
            </a>
            .
          </p>
          <div className="section-divider w-24 mx-auto mt-6" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
          <HelpCircle
            size={32}
            className="text-indigo-400 mx-auto mb-4"
            aria-hidden="true"
          />
          <h3 className="font-bold text-slate-700 text-lg mb-2">
            Still have questions?
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            Our team is happy to help you make the best decision for your child.
          </p>
          <a
            href="mailto:hello@airobotics.workshop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}