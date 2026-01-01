import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import HeroSlider from '../components/HeroSlider'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturedProducts()
    }, [])

    const fetchFeaturedProducts = async () => {
        try {
            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('is_featured', true)
                .limit(8) // Show 8 items like Mathydy
            setFeaturedProducts(data || [])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <HeroSlider />

            {/* 1. CATEGORIES (Fixed Layout) */}
            <section className="py-10 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {/* Watches Banner */}
                        <div className="relative h-64 md:h-[500px] bg-gray-100 group overflow-hidden">
                            <img src="/products/watches/black_arabic_stainless.jpg" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />

                            {/* NEW: Stronger Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition" />

                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white p-4 text-center">
                                <h3 className="text-3xl md:text-5xl font-light tracking-[0.3em] mb-4 uppercase drop-shadow-lg">Montres</h3>
                                <Link to="/shop?category=montres" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition duration-300">
                                    Découvrir
                                </Link>
                            </div>
                        </div>

                        {/* Hats Banner */}
                        <div className="relative h-64 md:h-[500px] bg-gray-100 group overflow-hidden">
                            <img src="/products/hats/blue_tony_chopper_1.jpg" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />

                            {/* NEW: Stronger Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition" />

                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white p-4 text-center">
                                <h3 className="text-3xl md:text-5xl font-light tracking-[0.3em] mb-4 uppercase drop-shadow-lg">Chapeaux</h3>
                                <Link to="/shop?category=chapeaux" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition duration-300">
                                    Découvrir
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. FEATURED PRODUCTS (Mathydy Style Grid) */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-light uppercase tracking-[0.2em] mb-2">Sélection Exclusive</h2>
                        <div className="w-16 h-0.5 bg-black mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                        {featuredProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="mathydy-card group">
                                <div className="mathydy-card-image">
                                    <img src={product.image_url} alt={product.name_fr} className="w-full h-full object-cover" />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300 bg-white/90 backdrop-blur-sm text-center">
                                        <span className="text-xs font-bold uppercase tracking-widest">Voir Détails</span>
                                    </div>
                                </div>
                                <h3 className="mathydy-card-title">{product.name_fr}</h3>
                                <p className="mathydy-card-price">{product.price.toLocaleString()} FCFA</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
