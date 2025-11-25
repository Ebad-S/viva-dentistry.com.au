'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    title: 'Teeth Whitening',
    before: '/images/gallery/before/teeth-whitening.png',
    after: '/images/gallery/after/teeth-whitening.png',
    description: 'Professional teeth whitening treatment that removes stains and discoloration for a brighter smile.',
  },
  {
    id: 2,
    title: 'Dental Veneers',
    before: '/images/gallery/before/dental-veneers.jpg',
    after: '/images/gallery/after/dental-veneers.jpg',
    description: 'Custom-made shells that cover the front surface of teeth to improve appearance and protect damaged enamel.',
  },
  {
    id: 3,
    title: 'Dental Implants',
    before: '/images/gallery/before/dental-implants.jpg',
    after: '/images/gallery/after/dental-implants.jpg',
    description: 'Permanent replacement for missing teeth that look, feel, and function like natural teeth.',
  },
  {
    id: 4,
    title: 'Invisalign Treatment',
    before: '/images/gallery/before/invisalign.jpg',
    after: '/images/gallery/after/invisalign.jpg',
    description: 'Clear aligners that gradually straighten teeth without the need for traditional metal braces.',
  },
  {
    id: 5,
    title: 'Smile Makeover',
    before: '/images/gallery/before/smile-makeover.jpg',
    after: '/images/gallery/after/smile-makeover.png',
    description: 'Comprehensive treatment plan that combines multiple cosmetic procedures for a complete smile transformation.',
  },
  {
    id: 6,
    title: 'Dental Crowns',
    before: '/images/gallery/before/dental-crowns.jpg',
    after: '/images/gallery/after/dental-crowns.jpg',
    description: 'Custom-fitted caps that restore the shape, size, strength, and appearance of damaged teeth.',
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedItem(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-20 bg-secondary-50 dark:bg-secondary-800">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Before & After Gallery</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            See the transformative results of our dental treatments. These before and after photos showcase the quality of our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-secondary-900 rounded-xl overflow-hidden shadow-md cursor-pointer h-full flex flex-col"
              onClick={() => openModal(item.id)}
            >
              <div className="relative h-64 flex-shrink-0">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative">
                    <Image
                      src={item.before}
                      alt={`${item.title} before treatment - Hurstville dental patient case by Dr. Amin Yeganeh`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      priority={item.id <= 2}
                      loading={item.id <= 2 ? 'eager' : 'lazy'}
                      style={{ objectFit: 'contain' }}
                    />
                    <div className="absolute top-2 left-2 bg-secondary-800/70 text-white text-xs px-2 py-1 rounded">Before</div>
                  </div>
                  <div className="w-1/2 relative">
                    <Image
                      src={item.after}
                      alt={`${item.title} after treatment results - Viva Dentistry Hurstville success case`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      priority={item.id <= 2}
                      loading={item.id <= 2 ? 'eager' : 'lazy'}
                      style={{ objectFit: 'contain' }}
                    />
                    <div className="absolute top-2 right-2 bg-primary-600/70 text-white text-xs px-2 py-1 rounded">After</div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-2 flex-grow">{item.description}</p>
                <button className="mt-3 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline self-start">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem !== null && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-secondary-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              {galleryItems.filter(item => item.id === selectedItem).map(item => (
                <div key={item.id} className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <button
                      onClick={closeModal}
                      className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative h-80 rounded-lg overflow-hidden">
                      <Image
                        src={item.before}
                        alt={`${item.title} before treatment - detailed view of dental case in Hurstville`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        style={{ objectFit: 'contain' }}
                        className="rounded-lg"
                      />
                      <div className="absolute top-4 left-4 bg-secondary-800/70 text-white px-3 py-1 rounded-full">Before</div>
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden">
                      <Image
                        src={item.after}
                        alt={`${item.title} treatment results - Dr. Amin Yeganeh dental transformation`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        style={{ objectFit: 'contain' }}
                        className="rounded-lg"
                      />
                      <div className="absolute top-4 right-4 bg-primary-600/70 text-white px-3 py-1 rounded-full">After</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Treatment Details</h4>
                    <p className="text-secondary-600 dark:text-secondary-300">{item.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-secondary-300 dark:border-secondary-700 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                    >
                      Close
                    </button>
                    <a
                      href="#contact"
                      onClick={closeModal}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Book This Treatment
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
        
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="btn btn-primary"
          >
            Schedule Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery; 