'use client';

import { FaMapMarkerAlt, FaPhone, FaMobileAlt, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LocalCitations = () => {
  const businessInfo = {
    name: "Viva Dentistry",
    address: "Park Plaza - Suite 4, 25-35A Park Road",
    suburb: "Hurstville",
    state: "NSW",
    postcode: "2220",
    phone: "(02) 9586 0877",
    mobile: "(+61) 0422 190 502",
    email: "contact@viva-dentistry.com.au",
    website: "https://viva-dentistry.com.au"
  };

  return (
    <section className="py-16 bg-secondary-50 dark:bg-secondary-900" aria-labelledby="local-info-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="local-info-heading" className="text-3xl md:text-4xl font-bold text-secondary-800 dark:text-secondary-100 mb-4">
            Your Local Hurstville Dentist
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Conveniently located in the heart of Hurstville, serving patients from across the St George area
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Business Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-2xl font-bold text-secondary-800 dark:text-secondary-100 mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-secondary-800 dark:text-secondary-100">
                    {businessInfo.name}
                  </p>
                  <p className="text-secondary-600 dark:text-secondary-300">
                    {businessInfo.address}<br />
                    {businessInfo.suburb} {businessInfo.state} {businessInfo.postcode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-primary-600 flex-shrink-0" />
                <a 
                  href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
                  className="text-secondary-800 dark:text-secondary-100 hover:text-primary-600 transition-colors"
                >
                  {businessInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaMobileAlt className="text-primary-600 flex-shrink-0" />
                <a 
                  href={`tel:${businessInfo.mobile.replace(/[\s\(\)]/g, '')}`}
                  className="text-secondary-800 dark:text-secondary-100 hover:text-primary-600 transition-colors"
                >
                  {businessInfo.mobile}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary-600 flex-shrink-0" />
                <a 
                  href={`mailto:${businessInfo.email}`}
                  className="text-secondary-800 dark:text-secondary-100 hover:text-primary-600 transition-colors"
                >
                  {businessInfo.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-secondary-800 dark:text-secondary-100 mb-2">
                    Opening Hours
                  </p>
                  <div className="text-secondary-600 dark:text-secondary-300 text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 3:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p className="text-primary-600 font-medium mt-2">
                      Emergency appointments available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir//Park+Plaza+-+Suite+4,+25-35A+Park+Rd,+Hurstville+NSW+2220"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <FaDirections />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocalCitations;
