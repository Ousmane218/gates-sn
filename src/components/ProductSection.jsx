import React, { useState } from 'react';
import ProductCard from './ProductCard';

// ProductSection: displays all products in a category with WhatsApp CTA
// Props: category (object), lang ("en" | "fr")
const ProductSection = ({ category, lang }) => {
    const phone = "221760162920";
    const [openDescIdx, setOpenDescIdx] = useState(null);

    if (!category || !category.items) return null;

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="w-full flex flex-col items-center">
                <div className="text-center mb-14 animate-slide-up">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
                        {category.category}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-400 mx-auto rounded-full animate-pulse-slow shadow-lg mt-4"></div>
                </div>

                <div className="max-w-6xl w-full mx-auto px-2 sm:px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center">
                        {category.items.map((item, idx) => (
                            <ProductCard
                                key={idx}
                                item={item}
                                lang={lang}
                                phone={phone}
                                openDescIdx={openDescIdx}
                                setOpenDescIdx={setOpenDescIdx}
                                idx={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection; 