import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import products from '../data/products';

/**
 * Custom hook for advanced product search with filters, suggestions, and spelling correction.
 * @param {Object} params
 * @param {string} params.lang - Language code ('en' or 'fr').
 * @param {function} params.onSearchResults - Callback for search results.
 */
export function useAdvancedSearch({ lang, onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({ priceRange: 'all', category: 'all', availability: 'all' });
    const [showFilters, setShowFilters] = useState(false);
    const [correctedQuery, setCorrectedQuery] = useState('');

    const searchRef = useRef(null);
    const suggestionsRef = useRef(null);

    const spellingCorrections = useMemo(() => ({
        'wath': 'watch', 'wacth': 'watch', 'montre': 'watch', 'montr': 'watch',
        'arabic': 'arabic', 'greek': 'greek', 'minimalist': 'minimalist', 'automatic': 'automatic',
        'black': 'black', 'white': 'white', 'blue': 'blue', 'pink': 'pink', 'purple': 'purple',
        'green': 'green', 'gray': 'gray', 'grey': 'gray', 'camo': 'camo', 'transparent': 'transparent'
    }), []);

    const allProducts = useMemo(() => {
        return products.flatMap(category =>
            category.items.map(item => ({
                ...item,
                category: category.category,
                categorySlug: category.category.toLowerCase().replace(/\s+/g, '-')
            }))
        );
    }, []);

    const priceRanges = [
        { value: 'all', label: { en: 'All Prices', fr: 'Tous les prix' } },
        { value: '0-10000', label: { en: 'Under 10,000 CFA', fr: 'Moins de 10,000 CFA' } },
        { value: '10000-15000', label: { en: '10,000 - 15,000 CFA', fr: '10,000 - 15,000 CFA' } },
        { value: '15000+', label: { en: 'Over 15,000 CFA', fr: 'Plus de 15,000 CFA' } }
    ];

    const categories = [
        { value: 'all', label: { en: 'All Categories', fr: 'Toutes les catégories' } },
        { value: 'watches', label: { en: 'Watches', fr: 'Montres' } }
    ];

    const availabilityOptions = [
        { value: 'all', label: { en: 'All Items', fr: 'Tous les articles' } },
        { value: 'in-stock', label: { en: 'In Stock', fr: 'En stock' } },
        { value: 'new', label: { en: 'New Arrivals', fr: 'Nouveautés' } }
    ];

    const correctSpelling = useCallback((query) => {
        const words = query.toLowerCase().split(' ');
        const corrected = words.map(word => spellingCorrections[word] || word);
        return corrected.join(' ');
    }, [spellingCorrections]);

    const generateSuggestions = useCallback((query) => {
        if (!query.trim()) return [];
        const correctedQuery = correctSpelling(query);
        const searchTerms = correctedQuery.toLowerCase().split(' ');
        return allProducts
            .map(product => {
                const nameEn = product.name.en.toLowerCase();
                const nameFr = product.name.fr.toLowerCase();
                const descEn = product.description.en.toLowerCase();
                const descFr = product.description.fr.toLowerCase();
                let score = 0;
                let matchedTerms = [];
                searchTerms.forEach(term => {
                    if (nameEn.includes(term) || nameFr.includes(term)) { score += 10; matchedTerms.push(term); }
                    if (descEn.includes(term) || descFr.includes(term)) { score += 5; matchedTerms.push(term); }
                    if (product.category.toLowerCase().includes(term)) { score += 3; matchedTerms.push(term); }
                });
                return { product, score, matchedTerms: [...new Set(matchedTerms)] };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map(item => ({ ...item.product, matchedTerms: item.matchedTerms }));
    }, [allProducts, correctSpelling]);

    const handleSearchChange = useCallback((e) => {
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
    }, [generateSuggestions, correctSpelling]);

    const performSearch = useCallback(async (query = searchTerm) => {
        setIsLoading(true);
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
                if (nameEn.includes(term) || nameFr.includes(term)) { relevanceScore += 10; keywordMatches.push(term); }
                if (descEn.includes(term) || descFr.includes(term)) { relevanceScore += 5; keywordMatches.push(term); }
                if (product.category.toLowerCase().includes(term)) { relevanceScore += 3; keywordMatches.push(term); }
            });
            return { ...product, relevanceScore, keywordMatches: [...new Set(keywordMatches)] };
        }).filter(item => item.relevanceScore > 0);
        if (filters.priceRange !== 'all') {
            results = results.filter(product => {
                const price = parseInt(product.price.replace(/\D/g, ''));
                switch (filters.priceRange) {
                    case '0-10000': return price < 10000;
                    case '10000-15000': return price >= 10000 && price <= 15000;
                    case '15000+': return price > 15000;
                    default: return true;
                }
            });
        }
        if (filters.category !== 'all') {
            results = results.filter(product => product.categorySlug === filters.category);
        }
        results.sort((a, b) => b.relevanceScore - a.relevanceScore);
        setIsLoading(false);
        if (onSearchResults) {
            onSearchResults(results, correctedQuery);
        }
    }, [allProducts, correctSpelling, filters, onSearchResults, searchTerm]);

    const handleSuggestionClick = useCallback((suggestion) => {
        setSearchTerm(suggestion.name[lang]);
        setShowSuggestions(false);
        performSearch(suggestion.name[lang]);
    }, [lang, performSearch]);

    const handleSearchSubmit = useCallback((e) => {
        e.preventDefault();
        setShowSuggestions(false);
        performSearch();
    }, [performSearch]);

    const handleFilterChange = useCallback((filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    }, []);

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

    return {
        searchTerm,
        setSearchTerm,
        suggestions,
        setSuggestions,
        showSuggestions,
        setShowSuggestions,
        isLoading,
        filters,
        setFilters,
        showFilters,
        setShowFilters,
        correctedQuery,
        setCorrectedQuery,
        searchRef,
        suggestionsRef,
        priceRanges,
        categories,
        availabilityOptions,
        handleSearchChange,
        handleSuggestionClick,
        handleSearchSubmit,
        handleFilterChange,
        performSearch
    };
} 