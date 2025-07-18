import { useState, useCallback } from 'react';

/**
 * Custom hook for managing newsletter subscription state and logic.
 * @returns {Object} Newsletter state and handlers.
 */
export function useNewsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const validateEmail = useCallback((email) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, []);

    const handleSubscribe = useCallback((e) => {
        e.preventDefault();
        if (!validateEmail(email)) return;
        setIsSubscribed(true);
        setEmail('');
    }, [email, validateEmail]);

    return {
        email,
        isSubscribed,
        handleEmailChange,
        handleSubscribe
    };
} 