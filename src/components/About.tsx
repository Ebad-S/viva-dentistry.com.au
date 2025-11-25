'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaAward, FaChevronDown, FaChevronUp, FaUserMd } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const About = () => {
  const [showCredentials, setShowCredentials] = useState(false);

  const credentials = [
    'Post-Graduate Diploma of Dental Implantology (PGIDS)',
    'Bachelor of Dental Science (CSU)',
    'Diploma of Dental Technology (SYD)',
    'Linea Clear Aligners Preferred Provider',
    'FastBraces Preferred Provider'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-secondary-800" aria-labelledby="about-heading">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">About Us</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            Our dental clinic is happy to provide our patients with qualified dental help. For many people attending dentist is always a stress, but here at Viva Dentistry you will forget about any troubles! Thousands of patients were given a new, beautiful smile thanks to our dental clinic and our doctors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <ScrollAnimation animation="slideRight">
            <div>
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Our Mission</h3>
              <p className="mb-6 text-secondary-600 dark:text-secondary-300">
                At Viva Dentistry, Dr. Amin Yeganeh's mission is to provide exceptional dental care in a comfortable and welcoming environment. We are committed to helping our patients achieve and maintain optimal oral health through personalized treatment plans and education.
              </p>
              
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Our Approach</h3>
              <p className="text-secondary-600 dark:text-secondary-300">
                We believe in a patient-centered approach to dental care. Dr. Yeganeh takes the time to listen to your concerns, answer your questions, and develop a treatment plan that meets your specific needs and goals.
              </p>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slideLeft">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/team-photo.webp"
                alt="Dr. Amin Yeganeh and Viva Dentistry team - Professional dental clinic in Hurstville NSW"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
            </div>
          </ScrollAnimation>
        </div>

        {/* Dr. Yeganeh's Profile */}
        <div className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg p-8 md:p-12">
          <ScrollAnimation animation="fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Profile Photo */}
              <div className="md:col-span-1 text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-secondary-700">
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center rounded-full">
                    <FaUserMd className="w-20 h-20 text-primary-700" />
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="flex items-center text-primary-600 dark:text-primary-400">
                    <FaGraduationCap className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Education</span>
                  </div>
                  <div className="flex items-center text-primary-600 dark:text-primary-400">
                    <FaAward className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Specialist</span>
                  </div>
                </div>
              </div>

              {/* Bio and Credentials */}
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Dr. Amin Yeganeh</h3>
                <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-6">
                  Principal Dentist & Founder of Viva Dentistry
                </p>
                
                <div className="space-y-4 text-secondary-600 dark:text-secondary-300">
                  <p>
                    Dr. Amin Yeganeh is a highly qualified and experienced dentist who founded Viva Dentistry with a vision to provide exceptional dental care in a comfortable, stress-free environment. With his extensive educational background and specialized training, Dr. Yeganeh has become a trusted name in cosmetic and restorative dentistry.
                  </p>
                  
                  <p>
                    His commitment to continuing education and staying at the forefront of dental technology ensures that patients receive the most advanced and effective treatments available. Dr. Yeganeh's gentle approach and attention to detail have helped thousands of patients achieve healthy, beautiful smiles.
                  </p>
                </div>

                {/* Credentials Toggle */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowCredentials(!showCredentials)}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    {showCredentials ? 'Hide' : 'Show'} Credentials
                    {showCredentials ? (
                      <FaChevronUp className="w-4 h-4 ml-2" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 ml-2" />
                    )}
                  </button>
                </div>

                {/* Credentials List */}
                <AnimatePresence>
                  {showCredentials && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 p-6 bg-gray-50 dark:bg-secondary-800 rounded-lg"
                    >
                      <h4 className="text-lg font-bold mb-4 dark:text-white">Professional Qualifications</h4>
                      <ul className="space-y-2">
                        {credentials.map((credential, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-secondary-700 dark:text-secondary-300">{credential}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;