import React from 'react';
import { useAdvancedSearch } from '../hooks/useAdvancedSearch';
import SearchSuggestions from './SearchSuggestions';

const AdvancedSearch = ({ lang, onSearchResults }) => {
    const {
        searchTerm,
        isLoading,
        filters,
        showFilters,
        setShowFilters,
        priceRanges,
        categories,
        availabilityOptions,
        correctedQuery,
        searchRef,
        suggestionsRef,
        suggestions,
        showSuggestions,
        handleSearchChange,
        handleSuggestionClick,
        handleSearchSubmit,
        handleFilterChange
    } = useAdvancedSearch({ lang, onSearchResults });

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
            {showSuggestions && (
                <SearchSuggestions
                    suggestions={suggestions}
                    lang={lang}
                    onSuggestionClick={handleSuggestionClick}
                    suggestionsRef={suggestionsRef}
                />
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