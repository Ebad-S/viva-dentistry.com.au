import { lazy, Suspense } from 'react';
import ScrollAnimation from '@/components/ScrollAnimation';

// Lazy load heavy components
const Services = lazy(() => import('@/components/Services'));
const About = lazy(() => import('@/components/About'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Gallery = lazy(() => import('@/components/Gallery'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Contact = lazy(() => import('@/components/Contact'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ScrollAnimation animation="fadeIn">
        <section id="hero" className="pt-32 pb-20 text-center relative overflow-hidden text-secondary-800 min-h-screen flex items-center" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #D1C7BD)' }} aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto relative z-10">
            <ScrollAnimation animation="bounceIn" delay={0.2}>
              <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">Viva Dentistry</h1>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={0.4}>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">Welcome to Dr. Amin Yeganeh's dental clinic! We provide high-quality dental care for the whole family.</p>
            </ScrollAnimation>
            <ScrollAnimation animation="slideUp" delay={0.6}>
              <a href="#contact" className="btn btn-secondary hover:scale-105 transform transition-all duration-300 dark:bg-secondary-500 dark:hover:bg-secondary-400 dark:text-white shadow-xl">Book an Appointment</a>
            </ScrollAnimation>
          </div>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideUp">
        <Suspense fallback={<div className="py-20 text-center">Loading services...</div>}>
          <Services />
        </Suspense>
      </ScrollAnimation>
      
      <ScrollAnimation animation="fadeInUp">
        <Suspense fallback={<div className="py-20 text-center">Loading about...</div>}>
          <About />
        </Suspense>
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideLeft">
        <section id="testimonials" aria-label="Patient Testimonials">
          <Suspense fallback={<div className="py-20 text-center">Loading testimonials...</div>}>
            <Testimonials />
          </Suspense>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideRight">
        <section id="gallery" aria-label="Before and After Gallery">
          <Suspense fallback={<div className="py-20 text-center">Loading gallery...</div>}>
            <Gallery />
          </Suspense>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="fadeIn">
        <section id="faq" aria-label="Frequently Asked Questions">
          <Suspense fallback={<div className="py-20 text-center">Loading FAQ...</div>}>
            <FAQ />
          </Suspense>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideUp">
        <Suspense fallback={<div className="py-20 text-center">Loading contact...</div>}>
          <Contact />
        </Suspense>
      </ScrollAnimation>
    </main>
  );
}
