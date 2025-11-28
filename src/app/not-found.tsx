import Link from 'next/link';
import { FaHome, FaPhone } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-800">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Go back to homepage"
          >
            <FaHome className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-secondary-600 dark:text-secondary-300">
            <p className="mb-2">Need immediate dental care?</p>
            <a 
              href="tel:+61295860877"
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Call Viva Dentistry"
            >
              <FaPhone className="w-4 h-4" />
              Call (02) 9586 0877
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
