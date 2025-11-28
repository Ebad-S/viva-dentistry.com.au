'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFax, FaClock, FaDirections, FaExclamationTriangle } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\(\)\+\-\.]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const openGoogleMaps = () => {
    const address = "Park Plaza - Suite 4, 25-35A Park Road HURSTVILLE NSW 2220";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <section id="contact" className="text-white relative overflow-hidden border-t" style={{ background: 'linear-gradient(to bottom, #F9F9F9, #3E2723)', paddingTop: '4.5rem', paddingBottom: '4.5rem', borderTopColor: '#FEFEFE' }} aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 text-secondary-800">Contact Us</h2>
          <div className="h-1 w-20 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-xl text-secondary-700">
            Schedule an appointment today with Dr. Amin Yeganeh and experience the difference at Viva Dentistry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <ScrollAnimation animation="slideRight">
            <div>
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              
              {/* Contact Information */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-luxe-cream to-luxe-sand text-primary-800 rounded-lg flex items-center justify-center shadow-lg">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:+61295860877" className="hover:underline text-lg">
                      (02) 9586 0877
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-luxe-cream to-luxe-sand text-primary-800 rounded-lg flex items-center justify-center shadow-lg">
                    <FaFax className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fax</h4>
                    <span className="text-lg">(02) 9586 0878</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-luxe-cream to-luxe-sand text-primary-800 rounded-lg flex items-center justify-center shadow-lg">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:contact@viva-dentistry.com.au" className="hover:underline text-lg">
                      contact@viva-dentistry.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-luxe-cream to-luxe-sand text-primary-800 rounded-lg flex items-center justify-center shadow-lg">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-lg mb-2">
                      Park Plaza - Suite 4, 25-35A Park Road<br />
                      HURSTVILLE NSW 2220<br />
                      <span className="text-sm opacity-90">(Entrance via Cross Street)</span>
                    </p>
                    <button
                      onClick={openGoogleMaps}
                      className="inline-flex items-center px-5 py-3 text-[#2C3E50] font-semibold text-base rounded-xl shadow-md hover:text-white transition-all ease-in-out duration-200 transform hover:scale-105"
                      style={{ 
                        background: 'linear-gradient(135deg, #F1EDE6, #efe9e1)',
                        fontFamily: 'Inter, sans-serif',
                        height: '48px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#EEE8E5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #F1EDE6, #efe9e1)';
                      }}
                    >
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle fill="#EA4335" cx="12" cy="9" r="2.5"/>
                        <path fill="#FBBC04" d="M12 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5"/>
                        <path fill="#34A853" d="M12 11.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5"/>
                      </svg>
                      Get Directions in Google Maps
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Office Hours */}
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaClock className="w-5 h-5 mr-3" />
                  <h3 className="text-xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Tuesday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wednesday:</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thursday - Saturday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slideLeft">
            <div className="bg-white text-secondary-800 p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Request an Appointment</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationTriangle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationTriangle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    autoComplete="tel"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="(02) 1234 5678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationTriangle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    autoComplete="off"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Tell us about your dental needs or preferred appointment time..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : submitStatus === 'error'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-primary-600 hover:bg-primary-700'
                  } text-white shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : submitStatus === 'success' ? (
                    'Request Sent Successfully!'
                  ) : submitStatus === 'error' ? (
                    'Error - Please Try Again'
                  ) : (
                    'Submit Request'
                  )}
                </motion.button>
              </form>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-sm"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold">Request sent successfully!</p>
                      <p className="text-sm">We'll contact you within 24 hours to confirm your appointment.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Error Message */}
              {(submitStatus === 'error' || errorMessage) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-sm"
                >
                  <div className="flex items-center">
                    <FaExclamationTriangle className="w-5 h-5 mr-2" />
                    <div>
                      <p className="font-semibold">Error sending request</p>
                      <p className="text-sm">
                        {errorMessage || 'Something went wrong. Please try again or call us directly at (02) 9586 0877.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact;