import React, { useState, useEffect } from 'react';

// Testimonials: enhanced user reviews with photos, ratings, and animations
// Props: lang ("en" | "fr")
const testimonials = [
    
    {
        name: "Demba Soumare",
        rating: 5,
        text: {
            en: "Excellent quality for the price. The automatic watch works perfectly and looks very professional. Lou khéré ngui ni",
            fr: "Excellent rapport qualité prix. Lou khéré ngui ni."
        },
        verified: true
    },
    {
        name: "Awa Diop",
        rating: 5,
        text: {
            en: "Amazing quality and fast delivery! The watch I ordered exceeded my expectations. Gates.sn dal moy mbeur mi.",
            fr: "Qualité incroyable et livraison rapide ! La montre que j'ai commandée a dépassé mes attentes. Gates.sn daal moy Waadia."
        },
        verified: true
    },

    {
        name: "Ibrahim Fall",
        rating: 5,
        text: {
            en: "Outstanding service! The Arabic numeral watch is beautiful and the price was very competitive.",
            fr: "Service exceptionnel ! La montre avec chiffres arabes est magnifique et le prix était très compétitif."
        },
        verified: true
    },
    {
        name: "Moussa Sall",
        rating: 5,
        text: {
            en: "Great selection and friendly service. The customer support on WhatsApp is excellent. Highly recommend!",
            fr: "Super choix et service amical. Le support client sur WhatsApp est excellent. Je recommande vivement !"
        },
        verified: true
    },
    {
        name: "Fatou Ndiaye",
        rating: 5,
        text: {
            en: "Perfect timing and beautiful packaging. The watch arrived exactly as described. Will definitely order again!",
            fr: "Timing parfait et emballage magnifique. La montre est arrivée exactement comme décrite!"
        },
        verified: true
    },
    
    {
        name: "Aissatou Ba",
        rating: 5,
        text: {
            en: "Fast delivery and great communication. The minimalist watch is exactly what I was looking for.",
            fr: "Livraison rapide et excellente communication. La montre minimaliste est exactement ce que je cherchais."
        },
        verified: true
    },
    
];

const Testimonials = ({ lang }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {lang === 'fr' ? 'Ce que disent nos clients' : 'What Our Customers Say'}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {lang === 'fr'
                            ? 'Découvrez pourquoi nos clients nous font confiance pour leurs accessoires de qualité'
                            : 'Discover why our customers trust us for their quality accessories'
                        }
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${index === currentTestimonial ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-4">
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                {testimonial.verified && (
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                                <span className="text-sm text-gray-500 ml-2">({testimonial.rating}/5)</span>
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-600 leading-relaxed italic">
                                "{testimonial.text[lang]}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">4.9★</div>
                            <div className="text-gray-600">{lang === 'fr' ? 'Note moyenne' : 'Average Rating'}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                            <div className="text-gray-600">{lang === 'fr' ? 'Livraison rapide' : 'Fast Delivery'}</div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            {lang === 'fr' ? 'Rejoignez nos clients satisfaits' : 'Join Our Happy Customers'}
                        </h3>
                        <p className="text-lg mb-6 opacity-90">
                            {lang === 'fr' ? 'Découvrez pourquoi tant de personnes nous font confiance' : 'Discover why so many people trust us'}
                        </p>
                        <a
                            href="#products"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            {lang === 'fr' ? 'Commander maintenant' : 'Order Now'}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 