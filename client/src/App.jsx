/**
 * App.jsx
 * Root application component — assembles all page sections in order with a sticky navbar.
 */

import Hero from './components/Hero';
import WorkshopDetails from './components/WorkshopDetails';
import LearningOutcomes from './components/LearningOutcomes';
import WhyJoin from './components/WhyJoin';
import FAQ from './components/FAQ';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <main id="main-content">
        <Hero />
        <WorkshopDetails />
        <LearningOutcomes />
        <WhyJoin />
        <FAQ />
        <RegistrationForm />
      </main>

      <Footer />
    </div>
  );
}