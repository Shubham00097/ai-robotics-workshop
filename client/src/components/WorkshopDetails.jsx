/**
 * WorkshopDetails.jsx
 * Displays key workshop info in animated cards — Age, Duration, Mode, Fee, Start Date.
 */

import { motion } from 'framer-motion';
import { Users, Clock, Wifi, IndianRupee, CalendarCheck } from 'lucide-react';

const details = [
  {
    id: 'age-group',
    icon: Users,
    label: 'Age Group',
    value: '8–14 Years',
    description: 'Perfect for curious kids and teenagers',
    bg: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'duration',
    icon: Clock,
    label: 'Duration',
    value: '4 Weeks',
    description: 'Intensive, structured learning program',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'mode',
    icon: Wifi,
    label: 'Learning Mode',
    value: 'Online',
    description: 'Live interactive sessions from home',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'fee',
    icon: IndianRupee,
    label: 'Workshop Fee',
    value: '₹2,999',
    description: 'All-inclusive • Certificate included',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 'start-date',
    icon: CalendarCheck,
    label: 'Start Date',
    value: '15 July 2026',
    description: 'Seats are filling fast — enroll today',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WorkshopDetails() {
  return (
    <section id="details" className="py-24 px-4 bg-white" aria-labelledby="details-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-3">At A Glance</p>
          <h2 id="details-heading" className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Workshop <span className="gradient-text">Details</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Everything you need to know about our upcoming AI & Robotics Summer Camp cohort.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" aria-hidden="true" />
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {details.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.iconBg} ${item.iconColor}`}>
                    <IconComponent size={24} aria-hidden="true" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{item.label}</h3>
                  <p className="text-2xl font-black text-slate-700 leading-tight mb-2 font-display">{item.value}</p>
                </div>
                <p className="text-xs text-slate-450 mt-2">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}