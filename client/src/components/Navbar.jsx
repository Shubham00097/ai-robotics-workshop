/**
 * Navbar.jsx
 * Sticky navigation bar that becomes opaque on scroll.
 * Includes the workshop logo, nav links, and an enroll CTA button.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Details',  href: '#details' },
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Why Join', href: '#why-join' },
  { label: 'FAQ',      href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnroll = () => {
    setMenuOpen(false);
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-100'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-1"
          aria-label="AI & Robotics Workshop — Back to top"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <Bot size={18} color="white" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span
            className={`font-bold text-base transition-colors duration-300 ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
          >
            AI &amp; Robotics
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-indigo-600 ${
                  scrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="navbar-enroll-btn"
            onClick={handleEnroll}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-300/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Enroll Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="navbar-menu-toggle"
          className={`md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
            scrolled ? 'text-slate-700' : 'text-white'
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-4 gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-100 mt-1">
                <button
                  onClick={handleEnroll}
                  className="w-full px-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors duration-200"
                >
                  Enroll Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}