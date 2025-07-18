import { useState, useCallback } from 'react';

/**
 * Custom hook for managing contact form state and logic.
 * @param {string} lang - Language code ('en' or 'fr').
 * @returns {Object} Form state and handlers.
 */
export function useContactForm(lang) {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const phone = "221760162920";

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const validateInput = useCallback(() => {
        // Basic validation: non-empty, reasonable length, no script tags
        if (!formData.name.trim() || !formData.message.trim()) return false;
        if (formData.name.length > 100 || formData.message.length > 1000) return false;
        if (/<script/i.test(formData.name) || /<script/i.test(formData.message)) return false;
        return true;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateInput()) {
            setSubmitStatus('error');
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const message = `${lang === 'fr' ? 'Nouveau message de contact:' : 'New contact message:'}\n\n${lang === 'fr' ? 'Nom:' : 'Name:'} ${formData.name}\n${lang === 'fr' ? 'Message:' : 'Message:'} ${formData.message}`;
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            setSubmitStatus('success');
            setFormData({ name: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, lang, validateInput]);

    return {
        formData,
        isSubmitting,
        submitStatus,
        handleInputChange,
        handleSubmit
    };
} 