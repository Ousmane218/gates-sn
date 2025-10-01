import React from 'react';
import { useContactForm } from '../hooks/useContactForm';

// ContactSection: WhatsApp info and functional contact form, bilingual
// Props: lang ("en" | "fr")
const ContactSection = ({ lang }) => {
    const phone = "221760162920";
    const content = {
        en: {
            title: "Contact Us",
            subtitle: "Get in touch with us",
            whatsapp: "Contact us on WhatsApp:",
            form: {
                name: "Your Name",
                message: "Your Message",
                send: "Send Message",
                sending: "Sending...",
                success: "Message sent successfully!",
                error: "Error sending message. Please try again."
            },
            or: "Or send us a message:"
        },
        fr: {
            title: "Contactez-nous",
            subtitle: "Entrez en contact avec nous",
            whatsapp: "Contactez-nous sur WhatsApp :",
            form: {
                name: "Votre nom",
                message: "Votre message",
                send: "Envoyer le message",
                sending: "Envoi en cours...",
                success: "Message envoyé avec succès !",
                error: "Erreur lors de l'envoi. Veuillez réessayer."
            },
            or: "Ou envoyez-nous un message :"
        }
    };
    const t = content[lang];
    const { formData, isSubmitting, submitStatus, handleInputChange, handleSubmit } = useContactForm(lang);

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-text mb-6">{t.title}</h2>
                    <p className="text-xl text-gray-600">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* WhatsApp Contact */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.whatsapp}</h3>
                            <a
                                href={`https://wa.me/${phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                                </svg>
                                {phone}
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.or}</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={t.form.name}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder={t.form.message}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t.form.sending}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        {t.form.send}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                {t.form.success}
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {t.form.error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection; 