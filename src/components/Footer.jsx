import React from 'react';
import { useNewsletter } from '../hooks/useNewsletter';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Footer: enhanced contact info, social links, newsletter signup, and navigation
// Props: lang ("en" | "fr")
const Footer = ({ lang }) => {
    const phone = "221760162920";
    const { email, isSubscribed, handleEmailChange, handleSubscribe } = useNewsletter();
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { id: 'hero', href: '#hero', en: 'Home', fr: 'Accueil' },
        { id: 'products', href: '#products', en: 'Products', fr: 'Produits' },
        { id: 'about', href: '#about', en: 'About', fr: 'À propos' },
        { id: 'testimonials', href: '#testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { id: 'contact', href: '#contact', en: 'Contact', fr: 'Contact' }
    ];

    // Scroll to section after navigation
    const handleSectionNav = (sectionId) => (e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { replace: false });
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const socialLinks = [
        {
            name: 'WhatsApp',
            url: `https://wa.me/${phone}`,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                </svg>
            ),
            color: 'hover:text-green-500'
        },
        // Add more social links as needed
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-10 px-4 sm:px-8 mt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Info & Social */}
                <div>
                    <div className="font-bold text-2xl text-primary-red mb-2">Gates.sn</div>
                    <div className="text-gray-600 mb-4">{lang === 'fr' ? 'Votre partenaire de confiance pour des montres de qualité.' : 'Your trusted partner for quality watches.'}</div>
                    <div className="flex gap-3 mb-4">
                        {socialLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-gray-500 ${link.color} transition-colors duration-200`}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation Links */}
                <div>
                    <div className="font-semibold text-gray-800 mb-3">{lang === 'fr' ? 'Navigation' : 'Navigation'}</div>
                    <ul className="space-y-2">
                        {links.map(link => (
                            <li key={link.href}>
                                {link.id === 'hero' ? (
                                    <Link
                                        to="/"
                                        className="text-gray-600 hover:text-primary-red transition-colors duration-200"
                                    >
                                        {link[lang]}
                                    </Link>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="text-gray-600 hover:text-primary-red transition-colors duration-200"
                                        onClick={handleSectionNav(link.id)}
                                    >
                                        {link[lang]}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter Signup */}
                <div>
                    <div className="font-semibold text-gray-800 mb-3">{lang === 'fr' ? 'Newsletter' : 'Newsletter'}</div>
                    {isSubscribed ? (
                        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {lang === 'fr' ? 'Merci pour votre inscription !' : 'Thank you for subscribing!'}
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder={lang === 'fr' ? 'Votre email' : 'Your email'}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
                            >
                                {lang === 'fr' ? 'S\'inscrire' : 'Subscribe'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <div className="text-center text-gray-400 text-xs mt-8">
                &copy; {new Date().getFullYear()} Gates.sn. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </div>
        </footer>
    );
};

export default Footer; 