import React, { useState } from 'react';

// Navigation: sticky topbar with language toggle and anchor links
// Props: lang ("en" | "fr"), setLang (function)
const Navigation = ({ lang, setLang }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const links = [
        { id: 'hero', en: 'Home', fr: 'Accueil' },
        { id: 'products', en: 'Products', fr: 'Produits' },
        { id: 'about', en: 'About', fr: 'À propos' },
        { id: 'testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { id: 'contact', en: 'Contact', fr: 'Contact' }
    ];
    return (
        <nav className="sticky top-0 z-50 bg-transparent flex items-center justify-between px-0 sm:px-0 py-0 sm:py-0">
            <div className="flex items-center justify-between">
                <div className="font-bold text-primary-red text-2xl sm:text-3xl md:text-4xl">Gates.sn</div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                        className="px-3 py-1 rounded bg-highlight-yellow hover:bg-primary-red text-dark-text font-semibold transition-default"
                    >
                        {lang === 'en' ? 'FR' : 'EN'}
                    </button>
                    <button
                        className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-highlight-yellow"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                <div className="hidden sm:flex gap-2 sm:gap-4 items-center">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className="hover:text-primary-red transition-default"
                        >
                            {link[lang]}
                        </a>
                    ))}
                </div>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="flex flex-col gap-2 mt-2 sm:hidden animate-fade-in">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className="hover:text-primary-red transition-default px-2 py-1 rounded"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link[lang]}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation; 