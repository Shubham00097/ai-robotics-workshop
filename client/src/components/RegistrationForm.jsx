/**
 * RegistrationForm.jsx
 * Workshop registration form using React Hook Form + Axios.
 * Features: validation, loading spinner, toast-style success/error banners,
 * disabled submit during loading, and full accessibility.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Loader2, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';

// In production (unified Render deploy), VITE_API_URL is not set so we fall back
// to '' which makes axios use a relative path (/api/enquiry) — same origin, no CORS.
// In local dev, client/.env sets VITE_API_URL=http://localhost:5000.
const API_URL = import.meta.env.VITE_API_URL || '';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{10}$/;

function Toast({ type, message }) {
  const isSuccess = type === 'success';
  return (
    <motion.div
      role="alert"
      aria-live="polite"
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className={`flex items-start gap-3 p-4 rounded-2xl text-sm font-medium border ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }`}
    >
      {isSuccess
        ? <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} aria-hidden="true" />
        : <AlertCircle  className="text-red-500 mt-0.5 flex-shrink-0" size={20} aria-hidden="true" />
      }
      <span>{message}</span>
    </motion.div>
  );
}

function InputField({ id, label, icon: Icon, type = 'text', placeholder, register, error, disabled }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none" aria-hidden="true">
          <Icon size={18} className={`transition-colors duration-200 ${error ? 'text-red-400' : 'text-slate-400'}`} />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-slate-800 placeholder:text-slate-450 text-sm
            transition-all duration-200 focus:outline-none focus:ring-2
            disabled:opacity-60 disabled:cursor-not-allowed
            ${error
              ? 'border-red-300 bg-red-50 focus:ring-red-300 focus:border-red-400'
              : 'border-slate-200 bg-white focus:ring-indigo-300 focus:border-indigo-400 hover:border-slate-300'
            }`}
          {...register}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="text-xs text-red-600 flex items-center gap-1.5 mt-0.5"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RegistrationForm() {
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    setToast(null);
    try {
      await axios.post(`${API_URL}/api/enquiry`, {
        name:  data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
      });
      setToast({
        type: 'success',
        message: '🎉 Registration submitted! We\'ll contact you within 24 hours. Check your email for confirmation.',
      });
      reset(); // Clear form on success
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Something went wrong. Please try again or contact us directly.';
      setToast({ type: 'error', message: msg });
    }
  };

  return (
    <section
      id="register"
      className="py-24 px-4 bg-slate-50"
      aria-labelledby="register-heading"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-3">
            Secure Your Spot
          </p>
          <h2
            id="register-heading"
            className="text-4xl md:text-5xl font-black text-slate-800 mb-4"
          >
            Register <span className="gradient-text">Now</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Fill out the form below and we&apos;ll get back to you with details &amp; payment link.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" aria-hidden="true" />
        </div>

        <motion.div
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div
            className="h-2"
            style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }}
            aria-hidden="true"
          />

          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} color="white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">AI & Robotics Workshop 2026</h3>
                <p className="text-xs text-slate-400 font-display">Starts 15 July 2026 · ₹2,999</p>
              </div>
            </div>

            <AnimatePresence>
              {toast && (
                <div className="mb-6">
                  <Toast type={toast.type} message={toast.message} />
                </div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Workshop registration form"
              className="flex flex-col gap-5"
            >
              <InputField
                id="name"
                label="Full Name"
                icon={User}
                placeholder="e.g. Rahul Sharma"
                disabled={isSubmitting}
                error={errors.name}
                register={register('name', {
                  required: 'Full name is required.',
                  minLength: { value: 2, message: 'Name must be at least 2 characters.' },
                  maxLength: { value: 100, message: 'Name must be under 100 characters.' },
                })}
              />

              <InputField
                id="email"
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="e.g. rahul@example.com"
                disabled={isSubmitting}
                error={errors.email}
                register={register('email', {
                  required: 'Email address is required.',
                  pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address.' },
                })}
              />

              <InputField
                id="phone"
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="10-digit number, e.g. 9876543210"
                disabled={isSubmitting}
                error={errors.phone}
                register={register('phone', {
                  required: 'Phone number is required.',
                  pattern: { value: PHONE_PATTERN, message: 'Phone must be exactly 10 digits.' },
                })}
              />

              <motion.button
                id="submit-registration"
                type="submit"
                disabled={isSubmitting}
                className="relative mt-2 w-full py-4 rounded-xl font-bold text-white text-base shadow-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-indigo-400/50 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: isSubmitting ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                whileHover={!isSubmitting ? { scale: 1.01, boxShadow: '0 12px 30px rgba(99,102,241,0.3)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                aria-label={isSubmitting ? 'Submitting registration…' : 'Submit registration'}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      Submit Registration
                    </>
                  )}
                </span>
              </motion.button>

              <p className="text-center text-xs text-slate-400 mt-1">
                Your information is safe with us. We&apos;ll never share it with third parties.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}