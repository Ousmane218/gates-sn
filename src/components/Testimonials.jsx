import React from 'react';

// Testimonials: user reviews with names and ratings, bilingual
// Props: lang ("en" | "fr")
const testimonials = [
    {
        name: "Awa D.",
        rating: 5,
        text: {
            en: "Amazing quality and fast delivery! Highly recommend Gates.sn.",
            fr: "Qualité incroyable et livraison rapide ! Je recommande Gates.sn."
        }
    },
    {
        name: "Moussa S.",
        rating: 4,
        text: {
            en: "Great selection and friendly service.",
            fr: "Super choix et service amical."
        }
    }
];

const Testimonials = ({ lang }) => (
    <section className="py-8 bg-light-bg rounded-xl shadow-inner">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-dark-text">{lang === 'fr' ? 'Témoignages' : 'Testimonials'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col">
                    <span className="font-semibold mb-2">{t.name}</span>
                    <span className="text-yellow-400 mb-2">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                    <p className="text-gray-700">{t.text[lang]}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Testimonials; 