import ScrollAnimation from '@/components/ScrollAnimation';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import LocalCitations from '@/components/LocalCitations';

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
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
                Welcome to Dr. Amin Yeganeh's dental clinic!<br />
                We provide high-quality dental care for the whole family.
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="slideUp" delay={0.6}>
              <a href="#contact" className="btn btn-secondary hover:scale-105 transform transition-all duration-300 dark:bg-secondary-500 dark:hover:bg-secondary-400 dark:text-white shadow-xl">Book an Appointment</a>
            </ScrollAnimation>
          </div>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideUp">
        <Services />
      </ScrollAnimation>
      
      <ScrollAnimation animation="fadeInUp">
        <About />
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideLeft">
        <section id="testimonials" aria-label="Patient Testimonials">
          <Testimonials />
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideRight">
        <section id="gallery" aria-label="Before and After Gallery">
          <Gallery />
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="fadeIn">
        <section id="faq" aria-label="Frequently Asked Questions">
          <FAQ />
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation animation="fadeIn">
        <LocalCitations />
      </ScrollAnimation>
      
      <ScrollAnimation animation="slideUp">
        <Contact />
      </ScrollAnimation>
    </main>
  );
}
