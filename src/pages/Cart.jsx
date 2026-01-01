import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { supabase } from '../supabaseClient'
import { Trash2, MessageCircle, Loader, MapPin, Phone, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCheckout = async (e) => {
        e.preventDefault()

        // 1. Validation
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Veuillez remplir toutes les informations de livraison.")
            return
        }

        setLoading(true)

        try {
            // 2. Save Order to Supabase
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    customer_name: formData.name,
                    customer_phone: formData.phone,
                    customer_address: formData.address,
                    total_amount: cartTotal,
                    status: 'pending'
                }])
                .select()
                .single()

            if (orderError) throw orderError

            // 3. Save Order Items
            const orderItems = cart.map(item => ({
                order_id: orderData.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_purchase: item.price
            }))

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems)

            if (itemsError) throw itemsError

            // 4. Redirect to WhatsApp with Order ID
            const PHONE_NUMBER = "221760162920"
            let message = `*NOUVELLE COMMANDE #${orderData.id.slice(0, 8)}*\n`
            message += `------------------\n`
            message += `👤 Client: ${formData.name}\n`
            message += `📍 Adresse: ${formData.address}\n`
            message += `📞 Tel: ${formData.phone}\n\n`
            message += `*ARTICLES:*\n`

            cart.forEach(item => {
                message += `- ${item.name_fr} (x${item.quantity})\n`
            })

            message += `\n💰 *TOTAL: ${cartTotal.toLocaleString()} FCFA*`

            const url = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`

            // 5. Cleanup
            clearCart()
            window.open(url, '_blank')
            navigate('/') // Go back home

        } catch (error) {
            console.error("Checkout Error:", error)
            alert("Une erreur est survenue. Veuillez réessayer.")
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-light uppercase tracking-widest mb-4">Votre panier est vide</h2>
                <p className="text-gray-500 mb-8 font-light">Le style n'attend pas.</p>
                <Link to="/shop" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition">
                    Découvrir la collection
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] mb-12 text-center">Votre Panier</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* LEFT: Items List */}
                <div className="lg:col-span-2 space-y-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-8">
                            <div className="w-24 h-32 bg-gray-50 flex-shrink-0 overflow-hidden">
                                <img src={item.image_url} alt={item.name_fr} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-sm uppercase tracking-wide pr-4">{item.name_fr}</h3>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-black transition">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="font-bold">{item.price.toLocaleString()} FCFA</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT: Checkout Form */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-8 rounded-none border border-gray-100 sticky top-24">
                        <h3 className="text-lg font-medium uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Livraison</h3>

                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nom complet"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-black outline-none text-sm transition"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Numéro de téléphone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-black outline-none text-sm transition"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Adresse de livraison (Quartier, Ville)"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-black outline-none text-sm transition"
                                    required
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-200 mt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-medium uppercase tracking-wide">Total</span>
                                    <span className="text-xl font-bold">{cartTotal.toLocaleString()} FCFA</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#25D366] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#128C7E] transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader className="animate-spin" /> : <><MessageCircle size={20} /> Commander</>}
                                </button>
                                <p className="text-[10px] text-center text-gray-500 mt-3">
                                    En cliquant, votre commande sera enregistrée et vous serez redirigé vers WhatsApp pour confirmation.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart