import React, { useState } from 'react';
import AdvancedSearch from './AdvancedSearch';
import { useSearchModal } from '../hooks/useSearchModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Navigation: sticky topbar with language toggle and anchor links
// Props: lang ("en" | "fr"), setLang (function)
const Navigation = ({ lang, setLang, onSearchResults }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { showSearchModal, openSearchModal, closeSearchModal } = useSearchModal();
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { id: 'hero', en: 'Home', fr: 'Accueil' },
        { id: 'products', en: 'Products', fr: 'Produits' },
        { id: 'about', en: 'About', fr: 'À propos' },
        { id: 'testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { id: 'contact', en: 'Contact', fr: 'Contact' }
    ];

    // Scroll to section after navigation
    const handleSectionNav = (sectionId) => (e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { replace: false });
            // Wait for navigation, then scroll
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    const handleSearchResults = (results, query) => {
        closeSearchModal();
        if (onSearchResults) {
            onSearchResults(results, query);
        }
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg py-2 sm:py-3">
                <div className="w-full flex items-center justify-between">
                    <div className="font-bold text-primary-red text-xl sm:text-2xl md:text-3xl lg:text-4xl">Gates.sn</div>

                    {/* Search Button - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
                        <button
                            onClick={openSearchModal}
                            className="w-full relative px-3 sm:px-4 py-2 pl-12 sm:pl-14 pr-3 sm:pr-4 text-xs sm:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left text-gray-500 hover:border-gray-400 transition-all duration-200 flex items-center"
                        >
                            <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 flex items-center">
                                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <span className="pl-6 sm:pl-7 text-xs sm:text-sm">{lang === 'fr' ? 'Rechercher des montres, accessoires...' : 'Search watches, accessories...'}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
                            {links.map(link => (
                                link.id === 'hero' ? (
                                    <Link
                                        key={link.id}
                                        to="/"
                                        className="text-gray-700 hover:text-primary-red transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link[lang]}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        className="text-gray-700 hover:text-primary-red transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                                        onClick={handleSectionNav(link.id)}
                                    >
                                        {link[lang]}
                                    </a>
                                )
                            ))}
                        </div>

                        {/* Language Toggle */}
                        <button
                            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                            className="ml-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-200"
                        >
                            {lang === 'fr' ? 'EN' : 'FR'}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="ml-2 flex lg:hidden items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 border-t border-gray-200 animate-fade-in">
                        {/* Mobile Search Button */}
                        <div className="mt-3 sm:mt-4 mb-3 sm:mb-4">
                            <button
                                onClick={openSearchModal}
                                className="w-full relative px-3 sm:px-4 py-2 pl-12 sm:pl-14 pr-3 sm:pr-4 text-xs sm:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left text-gray-500 hover:border-gray-400 transition-all duration-200 flex items-center"
                            >
                                <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 flex items-center">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <span className="pl-6 sm:pl-7 text-xs sm:text-sm">{lang === 'fr' ? 'Rechercher...' : 'Search...'}</span>
                            </button>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col gap-1 sm:gap-2">
                            {links.map(link => (
                                link.id === 'hero' ? (
                                    <Link
                                        key={link.id}
                                        to="/"
                                        className="text-gray-700 hover:text-primary-red transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link[lang]}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        className="text-gray-700 hover:text-primary-red transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                                        onClick={handleSectionNav(link.id)}
                                    >
                                        {link[lang]}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Search Modal */}
            {showSearchModal && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {lang === 'fr' ? 'Recherche Avancée' : 'Advanced Search'}
                                </h2>
                                <button
                                    onClick={closeSearchModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <AdvancedSearch
                                lang={lang}
                                onSearchResults={handleSearchResults}
                                onClose={closeSearchModal}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation; 