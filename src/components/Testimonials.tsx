'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient for 3 years',
    image: '/images/testimonials/testimonial-1.jpg',
    quote: "I've been coming to Viva Dentistry for years and have always had a positive experience. The staff is friendly, professional, and they make dental visits as comfortable as possible. Dr. Amin Yeganeh is thorough and takes time to explain everything.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'New patient',
    image: '/images/testimonials/testimonial-2.jpg',
    quote: 'As someone with dental anxiety, I was nervous about my first appointment. The team at Viva Dentistry was incredibly understanding and patient. Dr. Amin Yeganeh walked me through each step and made sure I was comfortable. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Patient for 5 years',
    image: '/images/testimonials/testimonial-3.jpg',
    quote: "I had a dental emergency and Dr. Amin Yeganeh at Viva Dentistry fit me in the same day. They were so caring and efficient. The procedure was painless and the follow-up care was excellent. I'm grateful for their exceptional service.",
    rating: 5,
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Patient for 2 years',
    image: '/images/testimonials/testimonial-4.jpg',
    quote: 'The cosmetic dental work I had done at Viva Dentistry has completely transformed my smile and boosted my confidence. Dr. Amin Yeganeh and the team are true artists and professionals. Worth every penny!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Olivia Wilson',
    role: 'Patient for 1 year',
    image: '/images/testimonials/testimonial-5.jpg',
    quote: 'I\'ve been to many dental offices over the years, but Dr. Amin Yeganeh\'s Viva Dentistry stands out for their attention to detail and genuine care for patients. The office is modern, clean, and they use the latest technology. My family and I are patients for life!',
    rating: 4,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-secondary-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            Don't just take our word for it. Here's what our patients have to say about their experiences at Viva Dentistry.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            ref={testimonialRef}
            className="relative overflow-hidden"
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.5 }}
              className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-white dark:border-secondary-700 shadow-md">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      sizes="(max-width: 768px) 96px, 128px"
                      loading="lazy"
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating
                            ? 'text-yellow-400'
                            : 'text-secondary-300 dark:text-secondary-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-xl italic mb-6 text-secondary-700 dark:text-secondary-200">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  <div>
                    <h4 className="text-lg font-bold">{testimonials[currentIndex].name}</h4>
                    <p className="text-secondary-500 dark:text-secondary-400">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-secondary-800 shadow-md text-secondary-700 dark:text-secondary-200 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-600 w-6'
                      : 'bg-secondary-300 dark:bg-secondary-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-secondary-800 shadow-md text-secondary-700 dark:text-secondary-200 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/search?rlz=1C2CHZN_en-GBAU1069AU1069&sca_esv=392931b93c8c4b33&sxsrf=AE3TifOGLlQoUearZLQOGVKogJrMtLFnIw:1755319854029&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s58zmWjhkz7gEDpoFQKUmhvmQ34ujVunGb0p8ZDmmau3bYqNqac60XD2Y7HJUv28EmOt-4cu6L-qUT2Q3gSEXBXzfQfX&q=Viva+Dentistry+Reviews&sa=X&ved=2ahUKEwjj9fSCxI6PAxV-lq8BHfxnF4YQ0bkNegQIUBAE&biw=1798&bih=919&dpr=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-secondary-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8055 10.0415H12V14.0415H17.6515C16.827 16.3275 14.6115 18.0415 12 18.0415C8.6865 18.0415 6 15.355 6 12.0415C6 8.72799 8.6865 6.04149 12 6.04149C13.5295 6.04149 14.921 6.60799 15.9805 7.53649L18.809 4.70799C17.023 3.03799 14.634 2.04149 12 2.04149C6.4775 2.04149 2 6.51899 2 12.0415C2 17.564 6.4775 22.0415 12 22.0415C17.5225 22.0415 22 17.564 22 12.0415C22 11.3595 21.931 10.6925 21.8055 10.0415Z" fill="#FFC107"/>
              <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6.0415 12 6.0415C13.5295 6.0415 14.921 6.608 15.9805 7.5365L18.809 4.708C17.023 3.038 14.634 2.0415 12 2.0415C8.15895 2.0415 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
              <path d="M12 22.0415C14.583 22.0415 16.93 21.0785 18.7045 19.4785L15.6095 16.8415C14.5718 17.5719 13.3038 17.9789 12 18.0415C9.39903 18.0415 7.19053 16.3335 6.35853 14.0575L3.09753 16.5945C4.75253 19.778 8.11353 22.0415 12 22.0415Z" fill="#4CAF50"/>
              <path d="M21.8055 10.0415H12V14.0415H17.6515C17.2571 15.1019 16.5467 16.0213 15.608 16.7415L15.6095 16.7405L18.7045 19.3775C18.4855 19.5775 22 17.0415 22 12.0415C22 11.3595 21.931 10.6925 21.8055 10.0415Z" fill="#1976D2"/>
            </svg>
            <span className="text-secondary-800 dark:text-secondary-200 font-medium">Review us on Google</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 