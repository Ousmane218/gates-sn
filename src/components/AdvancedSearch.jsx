import React, { useState, useEffect, useRef, useMemo } from 'react';
import products from '../data/products';

const AdvancedSearch = ({ lang, onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: 'all',
        category: 'all',
        availability: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [correctedQuery, setCorrectedQuery] = useState('');

    const searchRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Flatten all products for search
    const allProducts = useMemo(() => {
        return products.flatMap(category =>
            category.items.map(item => ({
                ...item,
                category: category.category,
                categorySlug: category.category.toLowerCase().replace(/\s+/g, '-')
            }))
        );
    }, []);

    // Price ranges
    const priceRanges = [
        { value: 'all', label: { en: 'All Prices', fr: 'Tous les prix' } },
        { value: '0-10000', label: { en: 'Under 10,000 CFA', fr: 'Moins de 10,000 CFA' } },
        { value: '10000-15000', label: { en: '10,000 - 15,000 CFA', fr: '10,000 - 15,000 CFA' } },
        { value: '15000+', label: { en: 'Over 15,000 CFA', fr: 'Plus de 15,000 CFA' } }
    ];

    // Categories
    const categories = [
        { value: 'all', label: { en: 'All Categories', fr: 'Toutes les catégories' } },
        { value: 'watches', label: { en: 'Watches', fr: 'Montres' } }
    ];

    // Availability options
    const availabilityOptions = [
        { value: 'all', label: { en: 'All Items', fr: 'Tous les articles' } },
        { value: 'in-stock', label: { en: 'In Stock', fr: 'En stock' } },
        { value: 'new', label: { en: 'New Arrivals', fr: 'Nouveautés' } }
    ];

    // Simple spelling correction (common misspellings)
    const spellingCorrections = {
        'wath': 'watch',
        'wacth': 'watch',
        'montre': 'watch',
        'montr': 'watch',
        'arabic': 'arabic',
        'greek': 'greek',
        'minimalist': 'minimalist',
        'automatic': 'automatic',
        'black': 'black',
        'white': 'white',
        'blue': 'blue',
        'pink': 'pink',
        'purple': 'purple',
        'green': 'green',
        'gray': 'gray',
        'grey': 'gray',
        'camo': 'camo',
        'transparent': 'transparent'
    };

    // Generate search suggestions
    const generateSuggestions = (query) => {
        if (!query.trim()) return [];

        const correctedQuery = correctSpelling(query);
        const searchTerms = correctedQuery.toLowerCase().split(' ');

        const suggestions = allProducts
            .map(product => {
                const nameEn = product.name.en.toLowerCase();
                const nameFr = product.name.fr.toLowerCase();
                const descEn = product.description.en.toLowerCase();
                const descFr = product.description.fr.toLowerCase();

                let score = 0;
                let matchedTerms = [];

                searchTerms.forEach(term => {
                    if (nameEn.includes(term) || nameFr.includes(term)) {
                        score += 10;
                        matchedTerms.push(term);
                    }
                    if (descEn.includes(term) || descFr.includes(term)) {
                        score += 5;
                        matchedTerms.push(term);
                    }
                    if (product.category.toLowerCase().includes(term)) {
                        score += 3;
                        matchedTerms.push(term);
                    }
                });

                return {
                    product,
                    score,
                    matchedTerms: [...new Set(matchedTerms)]
                };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map(item => ({
                ...item.product,
                matchedTerms: item.matchedTerms
            }));

        return suggestions;
    };

    // Simple spelling correction
    const correctSpelling = (query) => {
        const words = query.toLowerCase().split(' ');
        const corrected = words.map(word => {
            return spellingCorrections[word] || word;
        });
        return corrected.join(' ');
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim()) {
            const suggestions = generateSuggestions(value);
            setSuggestions(suggestions);
            setShowSuggestions(true);
            setCorrectedQuery(correctSpelling(value));
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setCorrectedQuery('');
        }
    };

    // Perform search with filters
    const performSearch = async (query = searchTerm) => {
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const correctedQuery = correctSpelling(query);
        const searchTerms = correctedQuery.toLowerCase().split(' ');

        let results = allProducts.map(product => {
            const nameEn = product.name.en.toLowerCase();
            const nameFr = product.name.fr.toLowerCase();
            const descEn = product.description.en.toLowerCase();
            const descFr = product.description.fr.toLowerCase();

            let relevanceScore = 0;
            let keywordMatches = [];

            searchTerms.forEach(term => {
                if (nameEn.includes(term) || nameFr.includes(term)) {
                    relevanceScore += 10;
                    keywordMatches.push(term);
                }
                if (descEn.includes(term) || descFr.includes(term)) {
                    relevanceScore += 5;
                    keywordMatches.push(term);
                }
                if (product.category.toLowerCase().includes(term)) {
                    relevanceScore += 3;
                    keywordMatches.push(term);
                }
            });

            return {
                ...product,
                relevanceScore,
                keywordMatches: [...new Set(keywordMatches)]
            };
        }).filter(item => item.relevanceScore > 0);

        // Apply filters
        if (filters.priceRange !== 'all') {
            results = results.filter(product => {
                const price = parseInt(product.price.replace(/\D/g, ''));
                switch (filters.priceRange) {
                    case '0-10000':
                        return price < 10000;
                    case '10000-15000':
                        return price >= 10000 && price <= 15000;
                    case '15000+':
                        return price > 15000;
                    default:
                        return true;
                }
            });
        }

        if (filters.category !== 'all') {
            results = results.filter(product =>
                product.categorySlug === filters.category
            );
        }

        // Sort by relevance
        results.sort((a, b) => b.relevanceScore - a.relevanceScore);

        setIsLoading(false);

        if (onSearchResults) {
            onSearchResults(results, correctedQuery);
        }
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name[lang]);
        setShowSuggestions(false);
        performSearch(suggestion.name[lang]);
    };

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        performSearch();
    };

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Close search on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target) &&
                suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative" ref={searchRef}>
                <div className="relative">
                    {/* Search Input */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={lang === 'fr' ? 'Rechercher des montres, accessoires...' : 'Search watches, accessories...'}
                        className="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />

                    {/* Search Icon */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors duration-200"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Filters Toggle */}
                <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="mt-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    {lang === 'fr' ? 'Filtres' : 'Filters'}
                </button>
            </form>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {lang === 'fr' ? 'Prix' : 'Price'}
                            </label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label[lang]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {lang === 'fr' ? 'Catégorie' : 'Category'}
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label[lang]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {lang === 'fr' ? 'Disponibilité' : 'Availability'}
                            </label>
                            <select
                                value={filters.availability}
                                onChange={(e) => handleFilterChange('availability', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {availabilityOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label[lang]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={suggestion.image}
                                    alt={suggestion.name[lang]}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                        {suggestion.name[lang]}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {suggestion.price}
                                    </div>
                                    {suggestion.matchedTerms && suggestion.matchedTerms.length > 0 && (
                                        <div className="text-xs text-blue-600 mt-1">
                                            {lang === 'fr' ? 'Correspondance:' : 'Matches:'} {suggestion.matchedTerms.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Spelling Correction Notice */}
            {correctedQuery && correctedQuery !== searchTerm && (
                <div className="mt-2 text-sm text-gray-600">
                    {lang === 'fr' ? 'Recherche pour:' : 'Searching for:'} "{correctedQuery}"
                </div>
            )}
        </div>
    );
};

export default AdvancedSearch; 