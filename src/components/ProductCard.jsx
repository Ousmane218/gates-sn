import React from 'react';
import { Link } from 'react-router-dom';

const getSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Helper to determine sale price and promo status
function getPriceInfo(priceString, promo) {
    // Extract numeric value
    const match = priceString.match(/(\d+)/g);
    if (!match) return { original: priceString, discounted: null, isOnSale: false };
    const price = parseInt(match.join(''), 10);
    let discounted = null;
    if (promo) {
        if (price === 15000) discounted = 12000;
        if (price === 12000) discounted = 10000;
    }
    return {
        original: price,
        discounted,
        isOnSale: discounted !== null
    };
}

function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

const ProductCard = ({ item, lang, phone }) => {
    const slug = getSlug(item.name[lang]);
    const { original, discounted, isOnSale } = getPriceInfo(item.price, item.promo);
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center w-full max-w-xs mx-auto">
            {/* Out of stock badge */}
            {item.outOfStock && (
                <div className="mb-2 w-full flex justify-center">
                    <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow uppercase tracking-wide">Rupture de stock</span>
                </div>
            )}
            {/* Promo badge */}
            {isOnSale && !item.outOfStock && (
                <div className="mb-2 w-full flex justify-center">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow uppercase tracking-wide">Promo</span>
                </div>
            )}
            <Link to={`/product/${slug}`} tabIndex={-1} aria-label={item.name[lang]} className="block w-full">
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                    <img
                        src={item.image}
                        alt={item.name[lang]}
                        className="object-cover w-full h-full rounded-xl"
                        loading="lazy"
                    />
                </div>
            </Link>
            <div className="flex flex-col items-center w-full">
                <Link to={`/product/${slug}`} className="text-lg font-semibold text-gray-900 mb-1 text-center hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    {item.name[lang]}
                </Link>
                <div className="flex flex-col items-center mb-2">
                    {isOnSale ? (
                        <>
                            <span className="text-gray-500 line-through text-sm mb-0.5">{formatPrice(original)}</span>
                            <span className="text-red-600 font-bold text-base">{formatPrice(discounted)}</span>
                        </>
                    ) : (
                        <span className="text-base font-bold text-primary-red">{formatPrice(original)}</span>
                    )}
                </div>
                {item.outOfStock && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow mb-2">Pré-commande</span>
                )}
                <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(lang === 'fr' ?
                        item.outOfStock ?
                            `Bonjour ! 👋\n\nJe souhaite pré-commander ce produit :\n\n📱 *${item.name[lang]}*\n💰 Prix : ${isOnSale ? formatPrice(discounted) : formatPrice(original)}\n\nMerci de me contacter pour finaliser ma pré-commande.` :
                            `Bonjour ! 👋\n\nJe souhaite commander ce produit :\n\n📱 *${item.name[lang]}*\n💰 Prix : ${isOnSale ? formatPrice(discounted) : formatPrice(original)}\n\nMerci de me contacter pour finaliser ma commande.` :
                        item.outOfStock ?
                            `Hello! 👋\n\nI would like to pre-order this product:\n\n📱 *${item.name[lang]}*\n💰 Price: ${isOnSale ? formatPrice(discounted) : formatPrice(original)}\n\nPlease contact me to finalize my pre-order.` :
                            `Hello! 👋\n\nI would like to order this product:\n\n📱 *${item.name[lang]}*\n💰 Price: ${isOnSale ? formatPrice(discounted) : formatPrice(original)}\n\nPlease contact me to finalize my order.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm mt-2 ${item.outOfStock
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                    </svg>
                    {item.outOfStock ? (lang === 'fr' ? 'Pré-commander' : 'Pre-order') : (lang === 'fr' ? 'Commander' : 'Order')}
                </a>
            </div>
        </div>
    );
};

export default ProductCard; 