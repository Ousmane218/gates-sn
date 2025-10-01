import { useState, useCallback } from 'react';

/**
 * Custom hook for managing product image modal state.
 * @returns {Object} Modal state and handlers.
 */
export function useProductModal() {
    const [modalImg, setModalImg] = useState(null);
    const openModal = useCallback((img) => setModalImg(img), []);
    const closeModal = useCallback(() => setModalImg(null), []);
    return { modalImg, openModal, closeModal };
} 