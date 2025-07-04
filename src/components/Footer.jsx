import React from 'react';

// Footer: contact info, WhatsApp link, social icons, bilingual links
// Props: lang ("en" | "fr")
const Footer = ({ lang }) => {
    const phone = "221778561029";
    const links = [
        { href: '#hero', en: 'Home', fr: 'Accueil' },
        { href: '#products', en: 'Products', fr: 'Produits' },
        { href: '#about', en: 'About', fr: 'À propos' },
        { href: '#testimonials', en: 'Testimonials', fr: 'Témoignages' },
        { href: '#contact', en: 'Contact', fr: 'Contact' }
    ];
    return (
        <footer className="bg-light-bg py-6 mt-8 border-t">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-bold text-primary-red text-lg mb-2">Gates.sn</span>
                    <span className="text-gray-700 mb-2">WhatsApp: <a href={`https://wa.me/${phone}`} className="text-green-600 underline">{phone}</a></span>
                    <div className="flex gap-2">
                        <a href="https://wa.me/221778561029" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.04 2.81 1.19 3 .15.19 2.05 3.13 5.01 4.27.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.09 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" /></svg>
                        </a>
                        {/* Add more social icons here if needed */}
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                    <nav className="flex gap-3">
                        {links.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-primary-red transition-default">
                                {link[lang]}
                            </a>
                        ))}
                    </nav>
                    <span className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} Gates.sn</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 