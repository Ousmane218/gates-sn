import React from 'react';

/**
 * SearchSuggestions component for displaying autocomplete suggestions.
 * @param {Object} props
 * @param {Array} props.suggestions - List of suggestion objects.
 * @param {string} props.lang - Language code ('en' or 'fr').
 * @param {function} props.onSuggestionClick - Handler for suggestion click.
 * @param {React.RefObject} props.suggestionsRef - Ref for the suggestions container.
 */
const SearchSuggestions = ({ suggestions, lang, onSuggestionClick, suggestionsRef }) => {
    if (!suggestions || suggestions.length === 0) return null;
    return (
        <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
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
    );
};

export default SearchSuggestions; 