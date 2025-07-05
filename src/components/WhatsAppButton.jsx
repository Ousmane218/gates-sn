import React from 'react';

// WhatsAppButton component: floating WhatsApp contact button
const WhatsAppButton = () => {
    const phone = "221760162920";
    const message = "Bonjour ! Je suis intéressé par vos montres. Pouvez-vous m'aider ?";

    const handleClick = () => {
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce-in"
            aria-label="Contact us on WhatsApp"
        >
            <svg className="w-7 h-7 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
            </svg>

            {/* Pulse animation */}
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
        </button>
    );
};

export default WhatsAppButton; 