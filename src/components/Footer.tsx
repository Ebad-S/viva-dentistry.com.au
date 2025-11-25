'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTiktok, 
  FaYoutube,
  FaLanguage 
} from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Privacy Policy', href: '/policies/Privacy Policy – Viva Dentistry.pdf' },
    { name: 'Terms of Service', href: '/policies/Terms of Service – Viva Dentistry.pdf' },
    { name: 'Refund & Return Policy', href: '/policies/Refund & Return Policy – Viva Dentistry.pdf' },
    { name: 'Complaints & Feedback Policy', href: '/policies/Complaints & Feedback Policy – Viva Dentistry.pdf' },
    { name: 'Consent to Treatment Form', href: '/policies/Consent to Treatment Form – Viva Dentistry.pdf' },
    { name: 'Accessibility Statement', href: '/policies/Accessibility Statement – Viva Dentistry.pdf' },
    { name: 'FAQs', href: '#faq' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/viva_dentistry/', color: 'hover:text-pink-600' }
  ];

  const languages = ['English', 'Persian', 'Chinese'];

  return (
    <footer className="bg-secondary-900 text-white border-t" style={{ borderColor: '#FEFEFE' }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <Image
                src="/images/logo.png"
                alt="Viva Dentistry Logo"
                width={50}
                height={50}
                className="rounded-lg mr-3"
                style={{ width: "auto", height: "auto" }}
              />
              <div>
                <h3 className="text-xl font-bold">Viva Dentistry</h3>
                <p className="text-sm text-secondary-300">Dr. Amin Yeganeh</p>
              </div>
            </div>
            <p className="text-secondary-300 mb-6 text-sm leading-relaxed">
              Providing exceptional dental care in a comfortable and welcoming environment. 
              Your smile is our passion.
            </p>

            {/* Languages Spoken */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaLanguage className="w-4 h-4 mr-2 text-primary-400" />
                <span className="text-sm font-semibold">Languages Spoken</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <span 
                    key={language}
                    className="px-2 py-1 bg-secondary-800 rounded text-xs text-secondary-200"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center text-secondary-300 transition-colors ${social.color} relative group`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Follow us on ${social.name}`}
                      title={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {social.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target={link.href.endsWith('.pdf') ? '_blank' : undefined}
                    rel={link.href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                    className="text-secondary-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaPhone className="w-4 h-4 mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <a href="tel:+61295860877" className="text-secondary-300 hover:text-white transition-colors text-sm">
                    (02) 9586 0877
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaEnvelope className="w-4 h-4 mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <a href="mailto:contact@viva-dentistry.com.au" className="text-secondary-300 hover:text-white transition-colors text-sm">
                    contact@viva-dentistry.com.au
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300 text-sm leading-relaxed">
                    Park Plaza - Suite 4<br />
                    25-35A Park Road<br />
                    HURSTVILLE NSW 2220<br />
                    <span className="text-xs opacity-75">(Entrance via Cross Street)</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Office Hours */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-bold mb-6">Office Hours</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-300">Monday - Tuesday</span>
                <span className="text-white">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-300">Wednesday</span>
                <span className="text-white">Closed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-300">Thursday - Saturday</span>
                <span className="text-white">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-300">Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-secondary-700 pt-8"
        >
          <div className="text-center">
            <p className="text-xs" style={{ color: '#ac9c8d' }}>
              © {new Date().getFullYear()} Viva Dentistry. All rights reserved.
            </p>
            <p className="text-xs mt-1" style={{ color: '#ac9c8d' }}>
              Designed with care for your dental health and comfort.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;