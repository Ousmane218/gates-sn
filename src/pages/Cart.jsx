import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/useCart';
import { useTranslation } from '../data/translations';

function formatPrice(price) {
    return price.replace('CFA', '').replace('FCFA', '').replace(/\s/g, '') + ' FCFA';
}

function getTotal(items) {
    return items.reduce((sum, i) => sum + (parseInt(i.product.price.replace(/\D/g, '')) * i.quantity), 0);
}

const CartPage = () => {
    const { state, dispatch, clearCart } = useCart();
    const items = state.items;
    const total = getTotal(items);
    const t = useTranslation();

    const handleWhatsAppOrder = () => {
        const lines = items.map(i => `${i.quantity}x ${i.product.name.fr} – ${formatPrice(i.product.price)}`);
        const message = `${t('whatsAppGreeting', 'fr')}\n\n${lines.join('\n')}\n${t('total', 'fr')} : ${total} FCFA\n\n${t('whatsAppName', 'fr')} : [votre nom]\n${t('whatsAppPhone', 'fr')} : [votre numéro]`;
        const url = `https://wa.me/221771234567?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        clearCart();
    };

    if (items.length === 0) {
        return (
            <>
                <Helmet>
                    <title>Panier - Gates.sn</title>
                    <meta name="description" content="Votre panier d'achat sur Gates.sn" />
                </Helmet>
                <div className="p-8 text-center text-gray-500 text-lg">{t('emptyCart', 'fr')}</div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Panier - Gates.sn</title>
                <meta name="description" content="Votre panier d'achat sur Gates.sn" />
            </Helmet>

            <div className="w-full max-w-2xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6">{t('yourCart', 'fr')}</h1>
                <ul className="divide-y divide-gray-200 mb-6" role="list">
                    {items.map((i, idx) => (
                        <li key={idx} className="flex items-center justify-between py-4" role="listitem">
                            <div className="flex items-center gap-4">
                                <img
                                    src={i.product.image}
                                    alt={i.product.name.fr}
                                    loading="lazy"
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <div className="font-semibold">{i.product.name.fr}</div>
                                    <div className="text-sm text-gray-500">{formatPrice(i.product.price)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', nameFr: i.product.name.fr, quantity: Math.max(1, i.quantity - 1) })}
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                                    aria-label={`Diminuer la quantité de ${i.product.name.fr}`}
                                >
                                    -
                                </button>
                                <span className="px-2" aria-label={`Quantité: ${i.quantity}`}>{i.quantity}</span>
                                <button
                                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', nameFr: i.product.name.fr, quantity: i.quantity + 1 })}
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                                    aria-label={`Augmenter la quantité de ${i.product.name.fr}`}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => dispatch({ type: 'REMOVE_ITEM', nameFr: i.product.name.fr })}
                                    className="ml-2 text-red-500 hover:underline text-xs"
                                    aria-label={`Supprimer ${i.product.name.fr} du panier`}
                                >
                                    {t('remove', 'fr')}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center mb-6">
                    <div className="font-semibold">{t('total', 'fr')} :</div>
                    <div className="text-lg font-bold text-primary-red">{total} FCFA</div>
                </div>
                <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition"
                    aria-label="Commander sur WhatsApp"
                >
                    {t('checkoutWhatsApp', 'fr')}
                </button>
            </div>
        </>
    );
};

export default CartPage; 