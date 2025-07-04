import React, { useState } from 'react';

// ProductSection: displays all products in a category with WhatsApp CTA and image modal
// Props: category (object), lang ("en" | "fr")
const ProductSection = ({ category, lang }) => {
    if (!category || !category.items) return null;
    const phone = "221778561029";
    const [modalImg, setModalImg] = useState(null);

    return (
        <section className="py-8">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-dark-text">{category.category}</h3>
            <div className="grid grid-cols-3 gap-2 w-full max-w-full px-1 sm:grid-cols-2 md:grid-cols-3">
                {category.items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow p-2 sm:p-4 flex flex-col items-center border border-gray-200">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="rounded-xl w-full h-32 object-cover hover:scale-110 transition-default mb-2 cursor-pointer"
                            onClick={() => setModalImg(item.image)}
                        />
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">{item.name}</h4>
                        <p className="mb-2 text-gray-700">{item.description[lang]}</p>
                        <span className="mb-4 font-bold text-gray-900">{item.price}</span>
                        <a
                            href={`https://wa.me/${phone}?text=Hi! I’d like to order: ${encodeURIComponent(item.name)} 🔥`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-red hover:bg-highlight-yellow text-white font-bold py-2 px-4 rounded transition-default"
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