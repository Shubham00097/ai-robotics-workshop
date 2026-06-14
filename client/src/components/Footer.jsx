/**
 * Footer.jsx
 * Simple, elegant footer with workshop branding, links, and social icons.
 */

import { motion } from 'framer-motion';
import { Bot, GitBranch, Share2, Link2, Mail, Heart } from 'lucide-react';

const socialLinks = [
  { id: 'footer-gitbranch', Icon: GitBranch, href: '#', label: 'GitHub' },
  { id: 'footer-share2',    Icon: Share2,    href: '#', label: 'Twitter' },
  { id: 'footer-link2',     Icon: Link2,     href: '#', label: 'LinkedIn' },
  { id: 'footer-email',     Icon: Mail,      href: 'mailto:hello@airobotics.workshop', label: 'Email us' },
];

const navLinks = [
  { label: 'Details',  href: '#details' },
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Why Join', href: '#why-join' },
  { label: 'FAQ',      href: '#faq' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 px-4" aria-label="Site footer">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        
        {/* Branding & Logo */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot size={20} color="white" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg text-white font-display">AI & Robotics Workshop</span>
          </div>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed mt-1">
            Empowering the next generation of engineers and creators through engaging, project-based online cohorts.
          </p>
        </div>

        {/* Footer Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const IconComponent = social.Icon;
            return (
              <motion.a
                key={social.id}
                href={social.href}
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.05, backgroundColor: '#334155', color: '#ffffff' }}
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <IconComponent size={18} aria-hidden="true" />
              </motion.a>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="w-full border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} AI & Robotics Workshop. All rights reserved.</p>
          <p className="flex items-center gap-1.5 justify-center">
            Made with <Heart size={12} className="text-rose-500 animate-pulse" aria-hidden="true" /> for young innovators
          </p>
        </div>

      </div>
    </footer>
  );
}