import React, { useState } from 'react';

const SearchResults = ({ results, query, lang, onClose }) => {
    const [openDescIdx, setOpenDescIdx] = useState(null);
    const phone = "221760162920";

    const highlightText = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="bg-yellow-200 px-1 rounded">
                    {part}
                </mark>
            ) : part
        );
    };

    const getRelevanceBadge = (score) => {
        if (score >= 15) return { text: lang === 'fr' ? 'Excellente correspondance' : 'Excellent match', color: 'bg-green-100 text-green-800' };
        if (score >= 10) return { text: lang === 'fr' ? 'Bonne correspondance' : 'Good match', color: 'bg-blue-100 text-blue-800' };
        if (score >= 5) return { text: lang === 'fr' ? 'Correspondance' : 'Match', color: 'bg-yellow-100 text-yellow-800' };
        return { text: lang === 'fr' ? 'Résultat' : 'Result', color: 'bg-gray-100 text-gray-800' };
    };

    if (results.length === 0) {
        return (
            <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {lang === 'fr' ? 'Aucun résultat trouvé' : 'No results found'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    {lang === 'fr' ? 'Essayez de modifier vos critères de recherche.' : 'Try adjusting your search criteria.'}
                </p>
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        {lang === 'fr' ? 'Fermer' : 'Close'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            {/* Search Summary */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {lang === 'fr' ? 'Résultats de recherche' : 'Search Results'}
                </h2>
                <p className="text-gray-600">
                    {lang === 'fr' ? `${results.length} produit(s) trouvé(s) pour` : `${results.length} product(s) found for`} "{query}"
                </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((item, idx) => {
                    const relevanceBadge = getRelevanceBadge(item.relevanceScore);

                    return (
                        <div key={idx} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-4 min-w-0 flex flex-col border border-gray-100 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105">
                            {/* Image Container */}
                            <div className="relative mb-4 overflow-hidden rounded-xl">
                                <img
                                    src={item.image}
                                    alt={item.name[lang]}
                                    className="w-full h-48 sm:h-56 object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"
                                />

                                {/* Relevance Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${relevanceBadge.color}`}>
                                        {relevanceBadge.text}
                                    </span>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Keyword Matches */}
                                {item.keywordMatches && item.keywordMatches.length > 0 && (
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                                            {lang === 'fr' ? 'Mots-clés:' : 'Keywords:'} {item.keywordMatches.join(', ')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col">
                                <button
                                    className={`font-bold text-sm sm:text-base mb-2 text-dark-text w-full text-left focus:outline-none focus:ring-2 focus:ring-highlight-yellow rounded transition-all duration-300 ${openDescIdx === idx ? 'bg-highlight-yellow/20' : 'hover:bg-gray-50'} ${openDescIdx === idx ? '' : 'truncate'}`}
                                    onClick={() => setOpenDescIdx(openDescIdx === idx ? null : idx)}
                                >
                                    {highlightText(item.name[lang], query)}
                                </button>

                                {openDescIdx === idx && (
                                    <p className="mb-3 text-gray-600 text-xs sm:text-sm w-full bg-yellow-50 rounded-lg p-3 shadow-inner transition-all duration-300">
                                        {highlightText(item.description[lang], query)}
                                    </p>
                                )}

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-bold text-lg text-primary-red">{item.price}</span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 text-sm">★★★★★</span>
                                            <span className="text-gray-500 text-xs ml-1">(4.8)</span>
                                        </div>
                                    </div>

                                    <a
                                        href={`https://wa.me/${phone}?text=${encodeURIComponent(lang === 'fr' ?
                                            `Bonjour ! 👋\n\nJe souhaite commander ce produit :\n\n📱 *${item.name[lang]}*\n💰 Prix : ${item.price}\n\nMerci de me contacter pour finaliser ma commande.` :
                                            `Hello! 👋\n\nI would like to order this product:\n\n📱 *${item.name[lang]}*\n💰 Price: ${item.price}\n\nPlease contact me to finalize my order.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                                        </svg>
                                        {lang === 'fr' ? 'Commander' : 'Order'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Close Button */}
            <div className="mt-8 text-center">
                <button
                    onClick={onClose}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                    {lang === 'fr' ? 'Fermer les résultats' : 'Close Results'}
                </button>
            </div>
        </div>
    );
};

export default SearchResults; 