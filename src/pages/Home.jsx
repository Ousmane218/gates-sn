import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import HeroSlider from '../components/HeroSlider'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductImageCarousel from '../components/ProductImageCarousel'

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                supabase.from('products').select('*').eq('is_featured', true).limit(8),
                supabase.from('categories').select('*').order('created_at', { ascending: true })
            ])
            setFeaturedProducts(prodRes.data || [])
            setCategories(catRes.data || [])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <HeroSlider />

            {/* 1. CATEGORIES (3-Column Layout) */}
            <section className="py-10 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="relative h-64 md:h-[450px] bg-gray-100 group overflow-hidden">
                                <img 
                                    src={category.image_url || 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800'} 
                                    alt={category.name}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition" />
                                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white p-4 text-center z-10">
                                    <h3 className="text-xl md:text-3xl font-light tracking-[0.2em] md:tracking-[0.3em] mb-4 uppercase drop-shadow-lg">{category.name}</h3>
                                    <Link to={`/shop?category=${category.slug}`} className="bg-white text-black px-6 md:px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition duration-300 shadow-lg">
                                        Découvrir
                                    </Link>
                                </div>
                            </div>
                        ))}
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
                                <div className="mathydy-card-image relative aspect-[4/5] overflow-hidden">
                                    <ProductImageCarousel product={product} />
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
