import { useState, useCallback } from 'react';

/**
 * Custom hook for managing search modal state.
 * @returns {Object} Modal state and handlers.
 */
export function useSearchModal() {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const openSearchModal = useCallback(() => setShowSearchModal(true), []);
    const closeSearchModal = useCallback(() => setShowSearchModal(false), []);
    return { showSearchModal, openSearchModal, closeSearchModal };
} 