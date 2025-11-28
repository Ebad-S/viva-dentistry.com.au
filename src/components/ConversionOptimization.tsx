'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarAlt, FaTimes, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const ConversionOptimization = () => {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    // Show floating CTA after 10 seconds
    const timer = setTimeout(() => {
      setShowFloatingCTA(true);
    }, 10000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showExitIntent]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

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

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeExitIntent}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeExitIntent}
                className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
                aria-label="Close popup"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="w-8 h-8 text-primary-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-800 dark:text-secondary-100 mb-2">
                  Wait! Don't Leave Yet
                </h3>
                
                <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                  Get a <strong>FREE consultation</strong> with Dr. Amin Yeganeh. 
                  Call now and mention this offer!
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:+61295860877"
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    onClick={closeExitIntent}
                  >
                    📞 Call (02) 9586 0877 - FREE Consultation
                  </a>
                  
                  <div className="flex gap-2">
                    <a
                      href="https://wa.me/61295860877?text=Hi%2C%20I%27d%20like%20to%20book%20a%20dental%20appointment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center"
                      onClick={closeExitIntent}
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                    
                    <a
                      href="#contact"
                      className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center"
                      onClick={closeExitIntent}
                    >
                      <FaCalendarAlt />
                      Book Online
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-primary-700 dark:text-primary-300">
                    <FaMapMarkerAlt className="flex-shrink-0" />
                    <span>Located in Hurstville - Easy parking available</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
