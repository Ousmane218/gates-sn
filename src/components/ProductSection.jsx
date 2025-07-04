import React, { useState } from 'react';

// ProductSection: displays all products in a category with WhatsApp CTA and image modal
// Props: category (object), lang ("en" | "fr")
const ProductSection = ({ category, lang }) => {
    if (!category || !category.items) return null;
    const phone = "221778561029";
    const [modalImg, setModalImg] = useState(null);
    const [openDescIdx, setOpenDescIdx] = useState(null);

    return (
        <section className="py-8">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-dark-text">{category.category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 w-full max-w-full px-1 overflow-hidden">
                {category.items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow p-0.5 sm:p-2 min-w-0 flex flex-col items-center border border-gray-200 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-105 focus-within:shadow-2xl focus-within:-translate-y-1 focus-within:scale-105">
                        <img
                            src={item.image}
                            alt={item.name}
                            className={`rounded-xl w-full h-28 sm:h-36 md:h-40 object-cover mb-1 bg-white shadow-md transition-default cursor-pointer ring-2 ${openDescIdx === idx ? 'ring-highlight-yellow' : 'ring-gray-200'} hover:ring-4 hover:ring-highlight-yellow`}
                            onClick={() => setModalImg(item.image)}
                        />
                        <button
                            className={`font-semibold text-[11px] sm:text-xs md:text-sm mb-1 text-dark-text w-full focus:outline-none focus:ring-2 focus:ring-highlight-yellow rounded transition-default ${openDescIdx === idx ? 'bg-highlight-yellow' : 'bg-transparent hover:bg-highlight-yellow focus:bg-highlight-yellow'} ${openDescIdx === idx ? '' : 'truncate'}`}
                            onClick={() => setOpenDescIdx(openDescIdx === idx ? null : idx)}
                        >
                            {item.name}
                        </button>
                        {openDescIdx === idx && (
                            <p className="mb-1 text-gray-700 text-[11px] sm:text-xs md:text-sm w-full bg-yellow-50 rounded p-1 shadow-inner transition-default">{item.description[lang]}</p>
                        )}
                        <span className="mb-2 font-bold text-gray-900 text-[11px] sm:text-xs md:text-sm">{item.price}</span>
                        <a
                            href={`https://wa.me/${phone}?text=${encodeURIComponent(lang === 'fr' ? `Bonjour ! Je souhaite commander : ${item.name} 🔥` : `Hi! I’d like to order: ${item.name} 🔥`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-red hover:bg-highlight-yellow text-white font-bold py-1 px-1.5 sm:py-2 sm:px-4 rounded text-[11px] sm:text-xs md:text-sm transition-default"
                        >
                            {lang === 'fr' ? 'Commander' : 'Order'}
                        </a>
                    </div>
                ))}
            </div>
            {/* Modal for large image */}
            {modalImg && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setModalImg(null)}
                >
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <img
                            src={modalImg}
                            alt="Large product"
                            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl"
                        />
                        <button
                            className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-red-600 font-bold text-2xl hover:bg-opacity-100 transition-default"
                            onClick={() => setModalImg(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        {/* Order Now button at the bottom center */}
                        <a
                            href={`https://wa.me/221778561029?text=Hi! I’d like to order: ${encodeURIComponent(category.items.find(item => item.image === modalImg)?.name || '')} 🔥`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary-red hover:bg-highlight-yellow text-white font-bold py-2 px-6 rounded shadow-lg transition-default"
                            onClick={() => setModalImg(null)}
                        >
                            Order Now
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductSection; 