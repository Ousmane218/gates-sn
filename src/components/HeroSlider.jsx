import React, { useState, useEffect } from 'react';

// HeroSlider component: enhanced full-width auto-rotating banners with multiple slides
// Props: lang ("en" | "fr")
const HeroSlider = ({ lang }) => {
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            image: "/products/watches/watch-grid.jpg",
            text: {
                en: "Elegant Timepieces",
                fr: "Montres Élégantes"
            },
            subtitle: {
                en: "Discover our exclusive collection of premium watches",
                fr: "Découvrez notre collection exclusive de montres premium"
            },
            cta: {
                en: "Shop Now",
                fr: "Acheter Maintenant"
            },
            link: "#products",
            badge: {
                en: "New Arrivals",
                fr: "Nouveautés"
            }
        },
        {
            image: "/products/watches/black-automatic.jpg",
            text: {
                en: "Automatic Excellence",
                fr: "Excellence Automatique"
            },
            subtitle: {
                en: "Precision engineering meets timeless design",
                fr: "Ingénierie de précision rencontre design intemporel"
            },
            cta: {
                en: "Explore Collection",
                fr: "Explorer Collection"
            },
            link: "#products",
            badge: {
                en: "Premium Quality",
                fr: "Qualité Premium"
            }
        },
        {
            image: "/products/watches/light-blue-numeral-arabic.jpg",
            text: {
                en: "Arabic Elegance",
                fr: "Élégance Arabe"
            },
            subtitle: {
                en: "Traditional numerals meet modern sophistication",
                fr: "Chiffres traditionnels rencontrent sophistication moderne"
            },
            cta: {
                en: "View Collection",
                fr: "Voir Collection"
            },
            link: "#products",
            badge: {
                en: "Best Seller",
                fr: "Meilleur Vendeur"
            }
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    const slide = slides[current];

    return (
        <div className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl mx-4">
            {/* Background Image */}
            <img
                src={slide.image}
                alt={slide.text[lang]}
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 md:p-12 lg:p-16">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-fade-in shadow-lg">
                        {slide.badge[lang]}
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl animate-slide-up">
                        {slide.text[lang]}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed animate-fade-in-delay">
                        {slide.subtitle[lang]}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
                        <a
                            href={slide.link}
                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                        >
                            {slide.cta[lang]}
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>

                        {/* Secondary CTA */}
                        <a
                            href="#products"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                        >
                            {lang === 'fr' ? 'Voir Plus' : 'Learn More'}
                        </a>
                    </div>


                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${index === current
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-125 shadow-lg'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-linear"
                    style={{ width: `${((current + 1) / slides.length) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default HeroSlider; 