import '@/styles/globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ConversionOptimization from '@/components/ConversionOptimization';
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
  description: 'Top-rated dentist in Hurstville NSW. Dr. Amin Yeganeh (PGIDS) offers dental implants, Invisalign, teeth whitening & emergency dental care. Serving Hurstville, Kogarah, Penshurst. Book today - (02) 9586 0877',
  keywords: 'dentist Hurstville, dental implants Hurstville, teeth whitening Hurstville, Invisalign Hurstville, emergency dentist Hurstville, cosmetic dentist Hurstville, dental clinic Hurstville NSW, dentist near me, Dr. Amin Yeganeh, PGIDS, dental implants NSW, clear aligners Hurstville, FastBraces Hurstville, dentist Kogarah, dentist Penshurst, dentist Mortdale, dental checkup Hurstville, root canal Hurstville, dental crown Hurstville',
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
        width: 1200,
        height: 630,
        alt: 'Viva Dentistry - Expert Dental Care in Hurstville NSW',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants Hurstville | Viva Dentistry | Dr. Amin Yeganeh',
    description: 'Expert dental care in Hurstville NSW. Dr. Amin Yeganeh (PGIDS) offers dental implants, clear aligners, teeth whitening & emergency dental services.',
    images: ['/images/logo.png'],
    creator: '@vivadentistry',
    site: '@vivadentistry',
  },
  facebook: {
    appId: '1234567890', // You can add your Facebook App ID here if you have one
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
            <BackToTop />
            <ConversionOptimization />
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
                "https://www.facebook.com/vivadentistry",
                "https://www.instagram.com/viva_dentistry/"
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
              "areaServed": [
                {
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
                },
                {
                  "@type": "City",
                  "name": "Kogarah"
                },
                {
                  "@type": "City", 
                  "name": "Penshurst"
                },
                {
                  "@type": "City",
                  "name": "Mortdale"
                },
                {
                  "@type": "City",
                  "name": "Oatley"
                },
                {
                  "@type": "City",
                  "name": "Beverly Hills"
                },
                {
                  "@type": "City",
                  "name": "Narwee"
                },
                {
                  "@type": "City",
                  "name": "Riverwood"
                },
                {
                  "@type": "City",
                  "name": "Sydney"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Dental Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Dental Implants",
                      "description": "Professional dental implant placement and restoration in Hurstville NSW"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Clear Aligners",
                      "description": "Invisalign and clear aligner treatment for straight teeth"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Teeth Whitening",
                      "description": "Professional teeth whitening services in Hurstville"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Emergency Dental Care",
                      "description": "24/7 emergency dental services for urgent dental problems"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          `}
        </Script>

        {/* Review Schema */}
        <Script id="review-schema" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Dentist",
                "name": "Viva Dentistry"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "name": "Excellent dental care in Hurstville",
              "author": {
                "@type": "Person",
                "name": "Sarah M."
              },
              "reviewBody": "I've been coming to Viva Dentistry for years and have always had a positive experience. The staff is friendly, professional, and they make dental visits as comfortable as possible. Dr. Amin Yeganeh is thorough and takes time to explain everything.",
              "publisher": {
                "@type": "Organization",
                "name": "Google"
              }
            }
          `}
        </Script>

        {/* Breadcrumb Schema */}
        <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://viva-dentistry.com.au"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Dentist Hurstville",
                  "item": "https://viva-dentistry.com.au#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Contact",
                  "item": "https://viva-dentistry.com.au#contact"
                }
              ]
            }
          `}
        </Script>

        {/* Google Business Profile Integration */}
        <Script id="google-business-profile" strategy="afterInteractive">
          {`
            // Google My Business integration
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Enhanced ecommerce for appointment bookings
            gtag('event', 'page_view', {
              'custom_map': {
                'custom_parameter_1': 'dental_clinic'
              },
              'business_name': 'Viva Dentistry',
              'business_location': 'Hurstville NSW',
              'services_offered': ['dental_implants', 'teeth_whitening', 'clear_aligners', 'emergency_dental']
            });
          `}
        </Script>
      </body>
    </html>
  );
} 