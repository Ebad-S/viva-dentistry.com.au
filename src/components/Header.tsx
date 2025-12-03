'use client';

import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-secondary-900/80 shadow-lg transition-all duration-300" 
      role="banner"
    >
      <div className="container py-3">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-4" aria-label="Viva Dentistry Home">
            <div className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Viva Dentistry Logo" 
                width={220} 
                height={80}
                className="rounded-md"
                priority
              />
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400 ml-4">Viva Dentistry</span>
            </div>
          </a>
          <nav className="hidden md:flex space-x-8 items-center" aria-label="Main Navigation">
            <a href="#services" className="relative font-medium text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 py-2 group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="relative font-medium text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 py-2 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="relative font-medium text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 py-2 group">
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#gallery" className="relative font-medium text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 py-2 group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#faq" className="relative font-medium text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 py-2 group">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="px-5 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white rounded-md transition-colors duration-300 shadow-sm hover:shadow-md">
              Contact
            </a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className="p-2 text-secondary-800 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200" 
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              role="button"
              tabIndex={0}
              onClick={toggleMobileMenu}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMobileMenu();
                }
              }}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 border-t border-secondary-200 dark:border-secondary-700' 
              : 'max-h-0 opacity-0'
          }`}
          role="menu"
          aria-labelledby="mobile-menu-button"
        >
          <nav className="container py-4" aria-label="Mobile Navigation">
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="block py-2 px-4 text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-md transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="block py-2 px-4 text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-md transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                About
              </a>
              <a 
                href="#testimonials" 
                className="block py-2 px-4 text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-md transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Testimonials
              </a>
              <a 
                href="#gallery" 
                className="block py-2 px-4 text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-md transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Gallery
              </a>
              <a 
                href="#faq" 
                className="block py-2 px-4 text-secondary-700 dark:text-secondary-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-md transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                className="block py-2 px-4 mx-4 mt-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white text-center rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;