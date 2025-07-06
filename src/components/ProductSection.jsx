import React, { useState } from 'react';

// ProductSection: displays all products in a category with WhatsApp CTA and image modal
// Props: category (object), lang ("en" | "fr")
const ProductSection = ({ category, lang }) => {
    const phone = "221760162920";
    const [modalImg, setModalImg] = useState(null);
    const [openDescIdx, setOpenDescIdx] = useState(null);

    if (!category || !category.items) return null;

    return (
        <section className="py-8 sm:py-12">
            <div className="w-full">
                <div className="text-center mb-8 sm:mb-12 animate-slide-up">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-[length:200%_200%] animate-gradient-x hover:scale-105 transition-transform duration-300 cursor-default">
                        {category.category}
                    </h3>
                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-400 mx-auto rounded-full animate-pulse-slow shadow-lg mt-4"></div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-6 w-full">
                    {category.items.map((item, idx) => (
                        <div key={idx} className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl p-3 sm:p-4 min-w-0 flex flex-col border border-gray-100 transition-all duration-500 ease-in-out hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105">
                            {/* Image Container */}
                            <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg sm:rounded-xl">
                                <img
                                    src={item.image}
                                    alt={item.name[lang]}
                                    className={`w-full h-40 sm:h-48 md:h-56 object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer`}
                                    onClick={() => setModalImg(item.image)}
                                />

                                {/* Badge */}
                                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                                    {item.outOfStock ? (
                                        <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                                            {lang === 'fr' ? 'En rupture de stock' : 'Out of Stock'}
                                        </span>
                                    ) : (
                                        <span className="bg-highlight-yellow text-dark-text px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                                            {lang === 'fr' ? 'Nouveau' : 'New'}
                                        </span>
                                    )}
                                </div>

                                {/* Quick View Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => setModalImg(item.image)}
                                        className="bg-white text-dark-text px-3 sm:px-4 py-2 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        {lang === 'fr' ? 'Voir' : 'Quick View'}
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col">
                                <button
                                    className={`font-bold text-xs sm:text-sm md:text-base mb-2 text-dark-text w-full text-left focus:outline-none focus:ring-2 focus:ring-highlight-yellow rounded transition-all duration-300 ${openDescIdx === idx ? 'bg-highlight-yellow/20' : 'hover:bg-gray-50'} ${openDescIdx === idx ? '' : 'truncate'}`}
                                    onClick={() => setOpenDescIdx(openDescIdx === idx ? null : idx)}
                                >
                                    {item.name[lang]}
                                </button>

                                {openDescIdx === idx && (
                                    <p className="mb-3 text-gray-600 text-xs sm:text-sm w-full bg-yellow-50 rounded-lg p-2 sm:p-3 shadow-inner transition-all duration-300">{item.description[lang]}</p>
                                )}

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                        <span className="font-bold text-base sm:text-lg text-primary-red">{item.price}</span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 text-xs sm:text-sm">★★★★★</span>
                                            <span className="text-gray-500 text-xs ml-1">(4.8)</span>
                                        </div>
                                    </div>

                                    <a
                                        href={`https://wa.me/${phone}?text=${encodeURIComponent(lang === 'fr' ?
                                            item.outOfStock ?
                                                `Bonjour ! 👋\n\nJe souhaite pré-commander ce produit :\n\n📱 *${item.name[lang]}*\n💰 Prix : ${item.price}\n\nMerci de me contacter pour finaliser ma pré-commande.` :
                                                `Bonjour ! 👋\n\nJe souhaite commander ce produit :\n\n📱 *${item.name[lang]}*\n💰 Prix : ${item.price}\n\nMerci de me contacter pour finaliser ma commande.` :
                                            item.outOfStock ?
                                                `Hello! 👋\n\nI would like to pre-order this product:\n\n📱 *${item.name[lang]}*\n💰 Price: ${item.price}\n\nPlease contact me to finalize my pre-order.` :
                                                `Hello! 👋\n\nI would like to order this product:\n\n📱 *${item.name[lang]}*\n💰 Price: ${item.price}\n\nPlease contact me to finalize my order.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm ${item.outOfStock
                                            ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                                        </svg>
                                        {item.outOfStock ? (lang === 'fr' ? 'Pré-commander' : 'Pre-order') : (lang === 'fr' ? 'Commander' : 'Order')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for large image */}
            {modalImg && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setModalImg(null)}
                >
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <img
                            src={modalImg}
                            alt="Large product"
                            className="w-full h-auto max-h-[80vh] rounded-2xl shadow-2xl"
                        />
                        <button
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 text-gray-800 font-bold text-xl transition-all duration-300 hover:scale-110"
                            onClick={() => setModalImg(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        {/* Order Now button at the bottom center */}
                        {(() => {
                            const modalItem = category.items.find(item => item.image === modalImg);
                            return (
                                <a
                                    href={`https://wa.me/${phone}?text=${encodeURIComponent(lang === 'fr' ?
                                        modalItem?.outOfStock ?
                                            `Bonjour ! 👋\n\nJe souhaite pré-commander ce produit :\n\n📱 *${modalItem?.name[lang] || ''}*\n💰 Prix : ${modalItem?.price || ''}\n\nMerci de me contacter pour finaliser ma pré-commande.` :
                                            `Bonjour ! 👋\n\nJe souhaite commander ce produit :\n\n📱 *${modalItem?.name[lang] || ''}*\n💰 Prix : ${modalItem?.price || ''}\n\nMerci de me contacter pour finaliser ma commande.` :
                                        modalItem?.outOfStock ?
                                            `Hello! 👋\n\nI would like to pre-order this product:\n\n📱 *${modalItem?.name[lang] || ''}*\n💰 Price: ${modalItem?.price || ''}\n\nPlease contact me to finalize my pre-order.` :
                                            `Hello! 👋\n\nI would like to order this product:\n\n📱 *${modalItem?.name[lang] || ''}*\n💰 Price: ${modalItem?.price || ''}\n\nPlease contact me to finalize my order.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${modalItem?.outOfStock
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                        : 'bg-primary-red hover:bg-accent text-white'
                                        }`}
                                    onClick={() => setModalImg(null)}
                                >
                                    {modalItem?.outOfStock ? (lang === 'fr' ? 'Pré-commander' : 'Pre-order') : (lang === 'fr' ? 'Commander Maintenant' : 'Order Now')}
                                </a>
                            );
                        })()}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductSection; 