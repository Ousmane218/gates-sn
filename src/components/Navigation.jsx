import React from 'react';

// Navigation: sticky topbar with language toggle and anchor links
// Props: lang ("en" | "fr"), setLang (function)
const Navigation = ({ lang, setLang }) => {
    const links = [
        { id: 'hero', en: 'Home', fr: 'Accueil' },
        { id: 'products', en: 'Products', fr: 'Produits' },
        { id: 'about', en: 'About', fr: 'À propos' },
        { id: 'testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { id: 'contact', en: 'Contact', fr: 'Contact' }
    ];
    return (
        <nav className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-4 py-2">
            <div className="font-bold text-primary-red text-xl">Gates.sn</div>
            <div className="flex gap-4">
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
            <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="ml-4 px-3 py-1 rounded bg-highlight-yellow hover:bg-primary-red text-dark-text font-semibold transition-default"
            >
                {lang === 'en' ? 'FR' : 'EN'}
            </button>
        </nav>
    );
};

export default Navigation; 