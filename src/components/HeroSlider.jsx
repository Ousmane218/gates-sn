import React, { useState, useEffect } from 'react';

// HeroSlider component: full-width auto-rotating banners with overlay text and CTA
// Props: slides (array of { image, text: { en, fr }, cta: { en, fr }, link })
//        lang ("en" | "fr")
const HeroSlider = ({ slides, lang }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    const slide = slides[current];

    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <img
                src={slide.image}
                alt={slide.text[lang]}
                className="w-full h-full object-cover transition-default"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{slide.text[lang]}</h2>
                <a
                    href={slide.link}
                    className="mt-4 bg-primary-red hover:bg-highlight-yellow text-white font-bold py-2 px-6 rounded transition-default shadow-lg"
                >
                    {slide.cta[lang]}
                </a>
            </div>
        </div>
    );
};

export default HeroSlider; 