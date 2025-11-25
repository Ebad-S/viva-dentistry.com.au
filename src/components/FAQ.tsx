'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Script from 'next/script';

const faqs = [
  {
    id: 1,
    question: 'How often should I visit the dentist?',
    answer: 'For most patients, Dr. Amin Yeganeh recommends a dental check-up and professional cleaning every six months. However, depending on your specific oral health needs, Dr. Yeganeh may suggest more frequent visits. Regular dental visits are essential for preventing dental problems and maintaining optimal oral health.',
  },
  {
    id: 2,
    question: 'What should I do in case of a dental emergency?',
    answer: 'If you experience a dental emergency such as severe pain, a knocked-out tooth, or a broken tooth, contact our office immediately. Dr. Amin Yeganeh offers same-day emergency appointments whenever possible. For after-hours emergencies, call our emergency number provided on our voicemail. In the meantime, rinse your mouth with warm water and apply a cold compress to reduce swelling if necessary.',
  },
  {
    id: 3,
    question: 'Do you accept dental insurance?',
    answer: 'Yes, we accept most major dental insurance plans. Our administrative team will help you understand your coverage and maximize your benefits. We also offer various payment options for patients without insurance, including flexible payment plans to make dental care more accessible.',
  },
  {
    id: 4,
    question: 'Is teeth whitening safe?',
    answer: 'Professional teeth whitening performed by Dr. Amin Yeganeh and our dental professionals is safe and effective. We use high-quality whitening products that are designed to minimize sensitivity while providing excellent results. Before recommending any whitening treatment, Dr. Yeganeh will evaluate your oral health to ensure it is appropriate for your specific situation.',
  },
  {
    id: 5,
    question: 'What age should children start visiting the dentist?',
    answer: 'We recommend scheduling your child\'s first dental visit by their first birthday or when their first tooth appears, whichever comes first. Early dental visits help establish good oral hygiene habits and allow us to monitor your child\'s dental development. Our office provides a friendly, comfortable environment for children of all ages.',
  },
  {
    id: 6,
    question: 'How long do dental implants last?',
    answer: 'With proper care and maintenance, dental implants can last a lifetime. Dr. Amin Yeganeh ensures the success of dental implants through careful planning and precise placement. The success depends on factors such as oral hygiene, regular dental check-ups, and overall health. The crown attached to the implant typically lasts 10-15 years before it may need replacement due to normal wear and tear.',
  },
  {
    id: 7,
    question: 'What payment options do you offer?',
    answer: 'We offer various payment options including cash, credit cards, and personal checks. For patients requiring more extensive treatment, we provide flexible payment plans and financing options through trusted third-party providers. Our goal is to make quality dental care affordable and accessible to all our patients.',
  },
  {
    id: 8,
    question: 'How can I prevent cavities?',
    answer: 'Preventing cavities involves a combination of good oral hygiene practices and regular dental care. Brush your teeth twice daily with fluoride toothpaste, floss daily, maintain a balanced diet low in sugary foods and drinks, and visit your dentist regularly for check-ups and professional cleanings. We also offer preventive treatments such as dental sealants and fluoride applications.',
  },
  {
    id: 9,
    question: 'What are Dr. Yeganeh\'s qualifications?',
    answer: 'Dr. Amin Yeganeh holds a Post-Graduate Diploma of Dental Implantology (PGIDS), a Bachelor of Dental Science (CSU), and a Diploma of Dental Technology (SYD). He is also a Preferred Provider for Linea Clear Aligners and FastBraces. This combination of education and specialized training allows Dr. Yeganeh to offer comprehensive dental care with expertise in dental implants, clear aligners, and advanced orthodontic treatments.',
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setOpenItem(null); // Close any open item when toggling view
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 3);

  return (
    <section id="faq" className="py-20 bg-white dark:bg-secondary-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            Find answers to common questions about our dental services, procedures, and policies.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {displayedFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-secondary-200 dark:border-secondary-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                  aria-expanded={openItem === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-secondary-500 dark:text-secondary-400">
                    {openItem === faq.id ? (
                      <FiChevronUp className="w-5 h-5" />
                    ) : (
                      <FiChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openItem === faq.id && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-secondary-50 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">
                        <p className="text-secondary-600 dark:text-secondary-300">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          <div className="mt-8 text-center">
            <button
              onClick={toggleShowAll}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
            >
              {showAll ? (
                <>
                  Show Less
                  <FiChevronUp className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  Show More Questions
                  <FiChevronDown className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </div>
          
          {showAll && (
            <div className="mt-12 text-center">
              <p className="text-secondary-600 dark:text-secondary-300">
                Don&apos;t see your question here? Contact us directly and we&apos;ll be happy to help.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Schema Markup */}
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${faqs.map(faq => `
                {
                  "@type": "Question",
                  "name": "${faq.question}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${faq.answer.replace(/"/g, '\\"')}"
                  }
                }`).join(',')}
            ]
          }
        `}
      </Script>
    </section>
  );
};

export default FAQ; 