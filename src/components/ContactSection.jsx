import React from 'react';

// ContactSection: WhatsApp info and simple contact form, bilingual
// Props: lang ("en" | "fr")
const ContactSection = ({ lang }) => {
    const phone = "221778561029";
    const content = {
        en: {
            title: "Contact Us",
            whatsapp: "Contact us on WhatsApp:",
            form: {
                name: "Your Name",
                message: "Your Message",
                send: "Send"
            }
        },
        fr: {
            title: "Contactez-nous",
            whatsapp: "Contactez-nous sur WhatsApp :",
            form: {
                name: "Votre nom",
                message: "Votre message",
                send: "Envoyer"
            }
        }
    };
    const t = content[lang];
    return (
        <section id="contact" className="py-8 flex flex-col items-center">
            <div className="bg-gray-100 rounded-xl shadow p-6 border w-full max-w-md flex flex-col items-center text-gray-900">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-dark-text">{t.title}</h3>
                <div className="mb-4">
                    <span className="font-semibold">{t.whatsapp}</span>{' '}
                    <a href={`https://wa.me/${phone}`} className="text-green-600 underline" target="_blank" rel="noopener noreferrer">{phone}</a>
                </div>
                <form className="w-full flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder={t.form.name} className="border rounded px-3 py-2" />
                    <textarea placeholder={t.form.message} className="border rounded px-3 py-2" rows={4} />
                    <button type="submit" className="bg-primary-red hover:bg-highlight-yellow text-white font-bold py-2 px-4 rounded transition-default">
                        {t.form.send}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactSection; 