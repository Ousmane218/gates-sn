import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HeroSlider from './components/HeroSlider';
import ProductSection from './components/ProductSection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Logo from './components/Logo';
import products from './data/products';
import ContactSection from './components/ContactSection';

function App() {
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-bg z-50">
        <div className="w-16 h-16 border-4 border-primary-red border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Example slides for HeroSlider
  const slides = [
    {
      image: '/products/watches/watch-grid.jpg',
      text: {
        en: 'Discover Legendary Watches',
        fr: 'Découvrez des montres légendaires'
      },
      cta: {
        en: 'Shop Now',
        fr: 'Acheter'
      },
      link: '#products'
    }
    // Add more slides as needed
  ];

  return (
    <div className="bg-light-bg min-h-screen">
      <Navigation lang={lang} setLang={setLang} />
      <header id="hero" className="pt-4">
        <div className="flex justify-center py-2">
          <Logo />
        </div>
        <HeroSlider slides={slides} lang={lang} />
      </header>
      <main>
        <section id="products">
          {products.map((cat, idx) => (
            <ProductSection key={idx} category={cat} lang={lang} />
          ))}
        </section>
        <section id="about">
          <AboutSection lang={lang} />
        </section>
        <section id="testimonials">
          <Testimonials lang={lang} />
        </section>
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

export default App;
