import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HeroSlider from './components/HeroSlider';
import ProductSection from './components/ProductSection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Logo from './components/Logo';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import SearchResults from './components/SearchResults';
import products from './data/products';
import ContactSection from './components/ContactSection';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [lang, setLang] = useState('fr');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleSearchResults = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-bg z-50">
        <div className="w-16 h-16 border-4 border-primary-red border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }



  return (
    <div className="bg-light-bg min-h-screen">
      <Navigation lang={lang} setLang={setLang} onSearchResults={handleSearchResults} />

      {showSearchResults ? (
        <div className="pt-20">
          <SearchResults
            results={searchResults}
            query={searchQuery}
            lang={lang}
            onClose={closeSearchResults}
          />
        </div>
      ) : (
        <>
          <header id="hero" className="relative">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
              <Logo />
            </div>
            <HeroSlider lang={lang} />
          </header>
          <main className="relative">
            <section id="products" className="relative">
              {products.map((cat, idx) => (
                <ProductSection key={idx} category={cat} lang={lang} />
              ))}
            </section>
            <section id="about" className="relative">
              <AboutSection lang={lang} />
            </section>
            <section id="testimonials" className="relative">
              <Testimonials lang={lang} />
            </section>
            <ContactSection lang={lang} />
          </main>
        </>
      )}

      <Footer lang={lang} />
      <ScrollToTop />
      <WhatsAppButton />
      <Analytics />
    </div>
  );
}

export default App;
