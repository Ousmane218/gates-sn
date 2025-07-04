import React from 'react';

// AboutSection: brand story with bilingual support
// Props: lang ("en" | "fr")
const AboutSection = ({ lang }) => {
    const content = {
        en: {
            title: "About Gates.sn",
            text: "Gates.sn is your trusted source for quality products. Our story is rooted in passion for style and authenticity.",
            image: "/logo.png"
        },
        fr: {
            title: "À propos de Gates.sn",
            text: "Gates.sn est votre boutique de confiance pour des produits de qualité. Notre histoire est ancrée dans la passion du style et de l'authenticité.",
            image: "/logo.png"
        }
    };
    const data = content[lang];
    return (
        <section className="py-8 flex flex-col items-center">
            <div className="bg-black rounded-xl shadow p-4 border border-gray-700 w-full max-w-lg flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-3 text-white">{data.title}</h3>
                <p className="text-lg text-white font-semibold mb-3 text-center drop-shadow-md leading-relaxed">{data.text}</p>
                <img src={data.image} alt={data.title} className="w-40 h-auto rounded-xl shadow-lg" />
            </div>
        </section>
    );
};

export default AboutSection; 