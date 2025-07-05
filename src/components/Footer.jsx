import React, { useState } from 'react';

// Footer: enhanced contact info, social links, newsletter signup, and navigation
// Props: lang ("en" | "fr")
const Footer = ({ lang }) => {
    const phone = "221760162920";
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const links = [
        { href: '#hero', en: 'Home', fr: 'Accueil' },
        { href: '#products', en: 'Products', fr: 'Produits' },
        { href: '#about', en: 'About', fr: 'À propos' },
        { href: '#testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { href: '#contact', en: 'Contact', fr: 'Contact' }
    ];

    const socialLinks = [
        {
            name: 'WhatsApp',
            url: `https://wa.me/${phone}`,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                </svg>
            ),
            color: 'hover:text-green-500'
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/gates.sn',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            color: 'hover:text-pink-500'
        },
        {
            name: 'Facebook',
            url: 'https://facebook.com/gates.sn',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            color: 'hover:text-blue-600'
        }
    ];

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            setEmail('');
            // Here you would typically send the email to your backend
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Gates.sn
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            {lang === 'fr'
                                ? 'Votre destination de confiance pour des montres et accessoires de qualité. Service client exceptionnel et livraison rapide.'
                                : 'Your trusted destination for quality watches and accessories. Exceptional customer service and fast delivery.'
                            }
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`https://wa.me/${phone}`} className="hover:text-green-400 transition-colors">
                                    {phone}
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Senegal</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 ${social.color} hover:bg-gray-700`}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {lang === 'fr' ? 'Liens Rapides' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-2">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link[lang]}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {lang === 'fr' ? 'Newsletter' : 'Newsletter'}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {lang === 'fr'
                                ? 'Restez informé de nos nouveautés et offres spéciales'
                                : 'Stay updated with our latest products and special offers'
                            }
                        </p>

                        {!isSubscribed ? (
                            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={lang === 'fr' ? 'Votre email' : 'Your email'}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    {lang === 'fr' ? 'S\'abonner' : 'Subscribe'}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-green-600 text-white p-3 rounded-lg">
                                {lang === 'fr' ? 'Merci de vous être abonné !' : 'Thank you for subscribing!'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Gates.sn. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            {lang === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            {lang === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service'}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 