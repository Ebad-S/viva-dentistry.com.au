'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const ConversionOptimization = () => {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    // Show floating CTA after 10 seconds
    const timer = setTimeout(() => {
      setShowFloatingCTA(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const hideFloatingCTA = () => {
    setShowFloatingCTA(false);
  };

  return (
    <>
      {/* Floating Call-to-Action */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40 bg-primary-600 text-white rounded-lg shadow-2xl p-4"
          >
            <button
              onClick={hideFloatingCTA}
              className="absolute top-2 right-2 text-white/80 hover:text-white"
              aria-label="Close notification"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            
            <div className="pr-6">
              <h4 className="font-bold text-lg mb-2">Ready for a Healthier Smile?</h4>
              <p className="text-sm mb-4 text-white/90">
                Book your appointment with Dr. Amin Yeganeh today!
              </p>
              
              <div className="flex gap-2">
                <a
                  href="tel:+61295860877"
                  className="flex items-center gap-2 bg-white text-primary-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors flex-1 justify-center"
                >
                  <FaPhone className="w-3 h-3" />
                  Call Now
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 bg-primary-700 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors flex-1 justify-center"
                  onClick={hideFloatingCTA}
                >
                  <FaCalendarAlt className="w-3 h-3" />
                  Book Online
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Sticky Contact Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 p-3 z-30 md:hidden">
        <div className="flex gap-2">
          <a
            href="tel:+61295860877"
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex-1"
          >
            <FaPhone className="w-4 h-4" />
            Call Now
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex-1"
          >
            <FaCalendarAlt className="w-4 h-4" />
            Book Online
          </a>
        </div>
      </div>

      {/* Add bottom padding to prevent content overlap on mobile */}
      <div className="h-20 md:h-0" />
    </>
  );
};

export default ConversionOptimization;
