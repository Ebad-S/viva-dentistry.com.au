'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTeeth, 
  FaSmile, 
  FaGem, 
  FaTooth, 
  FaChild, 
  FaTools, 
  FaSearch, 
  FaPlus,
  FaUserMd
} from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const allServices = [
  {
    id: 1,
    title: 'Dental Implants',
    description: 'Permanent replacement for missing teeth that look, feel, and function like natural teeth. Dr. Yeganeh holds a Post-Graduate Diploma in Dental Implantology.',
    icon: FaTeeth,
    category: 'beauty'
  },
  {
    id: 2,
    title: 'Clear Aligners',
    description: 'Linea Clear Aligners to straighten teeth discreetly without traditional braces. Dr. Yeganeh is a Preferred Provider for Linea Clear Aligners.',
    icon: FaSmile,
    category: 'beauty'
  },
  {
    id: 3,
    title: 'Cosmetic Solutions',
    description: 'Teeth whitening, veneers, bonding, and other procedures to enhance the appearance of your smile and boost your confidence.',
    icon: FaGem,
    category: 'beauty'
  },
  {
    id: 4,
    title: 'Orthodontics and Braces',
    description: 'FastBraces technology that can straighten teeth faster than traditional braces. Dr. Yeganeh is a Preferred Provider for FastBraces.',
    icon: FaUserMd,
    category: 'beauty'
  },
  {
    id: 5,
    title: 'Denture Repair',
    description: 'Professional denture repair and maintenance services to ensure your dentures fit comfortably and function properly.',
    icon: FaTooth,
    category: 'beauty'
  },
  {
    id: 6,
    title: 'Pediatric',
    description: 'Specialized dental care for children in a comfortable and friendly environment designed to make visits enjoyable.',
    icon: FaChild,
    category: 'beauty'
  },
  {
    id: 7,
    title: 'Restorative Solutions',
    description: 'Comprehensive treatment to restore damaged teeth including crowns, bridges, fillings, and root canal therapy.',
    icon: FaTools,
    category: 'general'
  },
  {
    id: 8,
    title: 'Diagnostics & Preventive',
    description: 'Regular check-ups, digital X-rays, oral cancer screenings, and preventive treatments to maintain optimal oral health.',
    icon: FaSearch,
    category: 'general'
  },
  {
    id: 9,
    title: 'Additional Treatments',
    description: 'Specialized treatments including wisdom tooth extraction, TMJ therapy, and emergency dental care when you need it most.',
    icon: FaPlus,
    category: 'general'
  }
];

const Services = () => {
  const [showMore, setShowMore] = useState(false);
  const visibleServices = showMore ? allServices : allServices.slice(0, 6);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-secondary-900" aria-labelledby="services-heading">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Our Services</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            We offer a comprehensive range of dental services, specializing in beauty dentistry to give you the perfect smile you deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            {visibleServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="bg-white dark:bg-secondary-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-500 transition-all duration-300 mx-auto">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-300 mb-4 flex-1">
                        {service.description}
                      </p>
                      <a 
                        href="#contact" 
                        className="inline-block text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium transition-colors"
                      >
                        Learn More →
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Explore More Button */}
        <div className="text-center">
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? (
              <>
                Show Less
                <motion.svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </>
            ) : (
              <>
                Explore More Services
                <motion.svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Services;