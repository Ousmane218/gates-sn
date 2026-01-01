import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useCart } from '../context/CartContext'
import { Star, Truck, ShieldCheck, ArrowLeft, MessageCircle } from 'lucide-react'

const ProductDetails = () => {
    const { id } = useParams() // Get ID from URL
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single() // We expect only one product

            if (error) throw error
            setProduct(data)
        } catch (error) {
            console.error('Error:', error)
            navigate('/') // Redirect home if not found
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="h-screen flex items-center justify-center">Chargement...</div>
    if (!product) return null

    const handleWhatsAppBuy = () => {
        const PHONE_NUMBER = "221760162920";
        const message = `Bonjour Gates.sn, je suis intéressé par : ${product.name_fr} à ${product.price} FCFA. Est-il disponible ?`;
        const url = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Combine main image + additional images into one array for the gallery
    const allImages = [product.image_url, ...(product.additional_images || [])]

    return (
        <div className="container mx-auto px-4 py-10">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-black mb-8">
                <ArrowLeft size={20} className="mr-2" /> Retour
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT: Image Gallery */}
                <div>
                    <div className="h-[400px] md:h-[500px] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                        <img
                            src={allImages[selectedImage]}
                            alt={product.name_fr}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {allImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                                    }`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div>
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                        {product.category_id === 'montres' ? 'Montre Premium' : 'Accessoire'} {/* Simplification */}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{product.name_fr}</h1>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <span className="text-gray-400 text-sm">(4.9/5 Avis)</span>
                    </div>

                    <div className="text-3xl font-bold text-gray-900 mb-6">
                        {product.price} FCFA
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description_fr}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition"
                        >
                            Ajouter au panier
                        </button>
                        <button
                            onClick={handleWhatsAppBuy}
                            className="flex-1 border-2 border-black bg-white text-black py-4 rounded-full font-bold hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={20} />
                            Acheter sur WhatsApp
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Truck size={20} className="text-blue-600" />
                            <span>Livraison Rapide</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-blue-600" />
                            <span>Garantie 1 An</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
