import React from 'react';

// AboutSection: comprehensive brand story with modern design and bilingual support
// Props: lang ("en" | "fr")
const AboutSection = ({ lang }) => {
    const content = {
        en: {
            title: "About Gates.sn",
            subtitle: "Your Trusted Partner in Quality",
            story: {
                title: "Our Story",
                text: "Founded with a passion for excellence and style, Gates.sn has been serving customers with premium watches and accessories since our establishment. We believe in offering not just products, but experiences that enhance your lifestyle."
            },
            mission: {
                title: "Our Mission",
                text: "To provide our customers with the highest quality timepieces and accessories, backed by exceptional service and competitive prices. We strive to be your go-to destination for all your style needs."
            },
            values: {
                title: "Our Values",
                items: [
                    "Quality Assurance",
                    "Customer Satisfaction",
                    "Innovation",
                    "Authenticity"
                ]
            },
            features: {
                title: "Why Choose Us",
                items: [
                    {
                        icon: "🛡️",
                        title: "Quality Guaranteed",
                        text: "All our products are carefully selected and tested for quality"
                    },
                    {
                        icon: "🚚",
                        title: "Fast Delivery",
                        text: "Quick and reliable delivery across Senegal"
                    },
                    {
                        icon: "💬",
                        title: "24/7 Support",
                        text: "Always available on WhatsApp for your questions"
                    },
                    {
                        icon: "💰",
                        title: "Best Prices",
                        text: "Competitive prices without compromising quality"
                    }
                ]
            }
        },
        fr: {
            title: "À propos de Gates.sn",
            subtitle: "Votre Partenaire de Confiance en Qualité",
            story: {
                title: "Notre Histoire",
                text: "Fondée avec une passion pour l'excellence et le style, Gates.sn sert ses clients avec des montres et accessoires premium depuis notre création. Nous croyons en offrir non seulement des produits, mais des expériences qui améliorent votre style de vie."
            },
            mission: {
                title: "Notre Mission",
                text: "Fournir à nos clients les montres et accessoires de la plus haute qualité, soutenus par un service exceptionnel et des prix compétitifs. Nous nous efforçons d'être votre destination de choix pour tous vos besoins de style."
            },
            values: {
                title: "Nos Valeurs",
                items: [
                    "Garantie Qualité",
                    "Satisfaction Client",
                    "Innovation",
                    "Authenticité"
                ]
            },
            features: {
                title: "Pourquoi Nous Choisir",
                items: [
                    {
                        icon: "🛡️",
                        title: "Qualité Garantie",
                        text: "Tous nos produits sont soigneusement sélectionnés et testés"
                    },
                    {
                        icon: "🚚",
                        title: "Livraison Rapide",
                        text: "Livraison rapide et fiable dans tout le Sénégal"
                    },
                    {
                        icon: "💬",
                        title: "Support 24/7",
                        text: "Toujours disponible sur WhatsApp pour vos questions"
                    },
                    {
                        icon: "💰",
                        title: "Meilleurs Prix",
                        text: "Prix compétitifs sans compromettre la qualité"
                    }
                ]
            }
        }
    };

    const data = content[lang];

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-text mb-6">{content.title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Story */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{data.story.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.story.text}
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{data.mission.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.mission.text}
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{data.values.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {data.values.items.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <h4 className="font-semibold text-gray-900">{value}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">{data.features.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.features.items.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            {lang === 'fr' ? 'Prêt à découvrir nos produits ?' : 'Ready to discover our products?'}
                        </h3>
                        <p className="text-lg mb-6 opacity-90">
                            {lang === 'fr' ? 'Explorez notre collection et trouvez votre style parfait.' : 'Explore our collection and find your perfect style.'}
                        </p>
                        <a
                            href="#products"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            {lang === 'fr' ? 'Voir nos produits' : 'View our products'}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 