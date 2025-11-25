import '@/styles/globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://viva-dentistry.com.au'),
  title: 'Dental Implants Hurstville | Viva Dentistry | Dr. Amin Yeganeh',
  description: 'Expert dental care in Hurstville NSW. Dr. Amin Yeganeh (PGIDS) offers dental implants, clear aligners, teeth whitening & emergency dental services. Book your appointment today - (02) 9586 0877',
  keywords: 'dentist Hurstville, dental implants Hurstville, teeth whitening Hurstville, clear aligners, emergency dentist, Dr. Amin Yeganeh, PGIDS, dental clinic NSW, Invisalign, FastBraces',
  authors: [{ name: 'Dr. Amin Yeganeh, PGIDS, BDS' }],
  creator: 'Viva Dentistry',
  alternates: {
    canonical: 'https://viva-dentistry.com.au',
  },
  icons: [
    { rel: 'icon', url: '/images/favicon.png' },
    { rel: 'apple-touch-icon', url: '/images/favicon.png' },
  ],
  openGraph: {
    title: 'Dental Implants Hurstville | Viva Dentistry | Dr. Amin Yeganeh',
    description: 'Expert dental care in Hurstville NSW. Dr. Amin Yeganeh (PGIDS) offers dental implants, clear aligners, teeth whitening & emergency dental services. Book your appointment today - (02) 9586 0877',
    url: 'https://viva-dentistry.com.au',
    siteName: 'Viva Dentistry',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Viva Dentistry Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="canonical" href="https://viva-dentistry.com.au" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen relative">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary-600 focus:text-white focus:z-50">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-grow relative" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        
        {/* Structured Data */}
        <Script id="schema-dental-business" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "Viva Dentistry",
              "image": "https://viva-dentistry.com.au/images/logo.png",
              "url": "https://viva-dentistry.com.au",
              "telephone": "+61295860877",
              "faxNumber": "+61295860878",
              "email": "contact@viva-dentistry.com.au",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Park Plaza - Suite 4, 25-35A Park Road",
                "addressLocality": "Hurstville",
                "addressRegion": "NSW",
                "postalCode": "2220",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -33.9681,
                "longitude": 151.1037
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "15:00"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/viva_dentistry"
              ],
              "priceRange": "$$",
              "speciality": [
                "Dental Implants",
                "Clear Aligners",
                "Teeth Whitening",
                "Cosmetic Dentistry",
                "General Dentistry",
                "Emergency Dental Care"
              ],
              "paymentAccepted": [
                "Cash",
                "Credit Card",
                "EFTPOS",
                "Health Insurance"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Hurstville",
                "containedInPlace": {
                  "@type": "State",
                  "name": "New South Wales",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Australia"
                  }
                }
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
} 