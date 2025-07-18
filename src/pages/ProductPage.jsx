import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';

const getSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

function findProductBySlug(slug) {
    for (const cat of products) {
        for (const item of cat.items) {
            if (
                getSlug(item.name.fr) === slug ||
                getSlug(item.name.en) === slug
            ) {
                return item;
            }
        }
    }
    return null;
}

const phone = "221760162920";

function parseFeatures(description) {
    const features = [];
    if (/bo[iî]te/i.test(description)) features.push("Écrin de présentation inclus");
    if (/outil d'ajustement/i.test(description)) features.push("Outil d'ajustement fourni");
    if (/pile offerte|gift battery/i.test(description)) features.push("Pile offerte");
    if (/bracelet/i.test(description)) features.push("Bracelet assorti");
    if (/cadran épuré|clean dial/i.test(description)) features.push("Cadran épuré");
    return features;
}

function getPriceInfo(priceString, promo) {
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

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const product = findProductBySlug(slug);

    if (!product) {
        return (
            <div className="p-8 text-center text-red-600 text-lg">Produit introuvable.</div>
        );
    }

    const { original, discounted, isOnSale } = getPriceInfo(product.price, product.promo);
    const features = parseFeatures(product.description.fr);

    const orderMessage = product.outOfStock
        ? `Bonjour ! 👋\n\nJe souhaite pré-commander ce produit :\n\n📱 *${product.name.fr}*\n💰 Prix : ${isOnSale ? formatPrice(discounted) : formatPrice(original)}\n\nMerci de me contacter pour finaliser ma pré-commande.`
        : `Bonjour ! 👋\n\nJe souhaite commander ce produit :\n\n📱 *${product.name.fr}*\n💰 Prix : ${isOnSale ? formatPrice(discounted) : formatPrice(original)}\n\nMerci de me contacter pour finaliser ma commande.`;

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white py-10 px-4">
            <button
                onClick={() => navigate('/')}
                className="mb-8 px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Retour à la liste des produits"
            >
                &larr; Retour à la collection
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center border border-gray-100">
                {/* Promo badge */}
                {isOnSale && !product.outOfStock && (
                    <div className="mb-2 w-full flex justify-center">
                        <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow uppercase tracking-wide">Promo</span>
                    </div>
                )}
                <div className="relative w-full flex flex-col items-center mb-6">
                    <img
                        src={product.image}
                        alt={product.name.fr}
                        loading="lazy"
                        className="w-full max-w-xs rounded-xl object-cover border border-gray-200 shadow-md mb-4"
                    />
                    {product.outOfStock && (
                        <span className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Pré-commande</span>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center leading-tight tracking-tight">
                    {product.name.fr}
                </h1>
                <div className="flex flex-col items-center mb-4">
                    {isOnSale ? (
                        <>
                            <span className="text-gray-500 line-through text-lg mb-1">{formatPrice(original)}</span>
                            <span className="text-red-600 font-bold text-2xl">{formatPrice(discounted)}</span>
                        </>
                    ) : (
                        <span className="text-xl font-bold text-primary-red">{formatPrice(original)}</span>
                    )}
                </div>
                <div className="text-gray-700 text-base mb-6 text-center leading-relaxed">
                    {product.description.fr}
                </div>
                {/* Caractéristiques section */}
                <div className="w-full mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" /></svg>
                        Caractéristiques
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                        {features.length > 0 ? features.map((f, i) => (
                            <li key={i}>{f}</li>
                        )) : <li>Montre de qualité supérieure, livrée avec soin.</li>}
                        {product.material && (
                            <li><span className="font-medium">Matériau :</span> {product.material}</li>
                        )}
                        {product.waterResistance && (
                            <li><span className="font-medium">Étanchéité :</span> {product.waterResistance}</li>
                        )}
                    </ul>
                </div>
                <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(orderMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-base mt-2 ${product.outOfStock
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    aria-label={product.outOfStock ? 'Pré-commander sur WhatsApp' : 'Commander sur WhatsApp'}
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
                    </svg>
                    {product.outOfStock ? 'Pré-commander' : 'Commander'}
                </a>
            </div>
        </div>
    );
};

export default ProductDetail; 