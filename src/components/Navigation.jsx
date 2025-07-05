import React, { useState } from 'react';
import AdvancedSearch from './AdvancedSearch';

// Navigation: sticky topbar with language toggle and anchor links
// Props: lang ("en" | "fr"), setLang (function)
const Navigation = ({ lang, setLang, onSearchResults }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const links = [
        { id: 'hero', en: 'Home', fr: 'Accueil' },
        { id: 'products', en: 'Products', fr: 'Produits' },
        { id: 'about', en: 'About', fr: 'À propos' },
        { id: 'testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { id: 'contact', en: 'Contact', fr: 'Contact' }
    ];

    const handleSearchResults = (results, query) => {
        setShowSearchModal(false);
        // Pass results to parent component
        if (onSearchResults) {
            onSearchResults(results, query);
        }
        // Scroll to products section and highlight search results
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSearchClick = () => {
        setShowSearchModal(true);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg px-2 sm:px-4 py-2 sm:py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="font-bold text-primary-red text-xl sm:text-2xl md:text-3xl lg:text-4xl">Gates.sn</div>

                    {/* Search Button - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
                        <button
                            onClick={handleSearchClick}
                            className="w-full relative px-3 sm:px-4 py-2 pl-10 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left text-gray-500 hover:border-gray-400 transition-all duration-200 flex items-center"
                        >
                            <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center">
                                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <span className="ml-1 sm:ml-2 text-xs sm:text-sm">{lang === 'fr' ? 'Rechercher des montres, accessoires...' : 'Search watches, accessories...'}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
                            {links.map(link => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="text-gray-700 hover:text-primary-red transition-all duration-300 font-medium text-sm xl:text-base"
                                >
                                    {link[lang]}
                                </a>
                            ))}
                        </div>

                        {/* Language Button */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-highlight-yellow to-yellow-400 hover:from-yellow-400 hover:to-highlight-yellow text-dark-text font-semibold transition-all duration-300 transform hover:scale-105 shadow-md text-xs sm:text-sm"
                        >
                            {lang === 'en' ? 'FR' : 'EN'}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-1.5 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highlight-yellow transition-all duration-300"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
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
                                onClick={handleSearchClick}
                                className="w-full relative px-3 sm:px-4 py-2 pl-10 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left text-gray-500 hover:border-gray-400 transition-all duration-200 flex items-center"
                            >
                                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <span className="ml-1 sm:ml-2 text-xs sm:text-sm">{lang === 'fr' ? 'Rechercher...' : 'Search...'}</span>
                            </button>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col gap-1 sm:gap-2">
                            {links.map(link => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="text-gray-700 hover:text-primary-red transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link[lang]}
                                </a>
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
                                    onClick={() => setShowSearchModal(false)}
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
                                onClose={() => setShowSearchModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation; 