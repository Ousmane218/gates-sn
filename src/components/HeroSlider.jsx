import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const HeroSlider = () => {
    const [current, setCurrent] = useState(0)
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHeroProducts = async () => {
            try {
                // Fetch latest products with their categories
                const { data, error } = await supabase
                    .from('products')
                    .select('*, categories(name, slug)')
                    .order('created_at', { ascending: false })
                
                if (error) throw error

                if (data && data.length > 0) {
                    // Filter to keep only watches (slug contains 'montre')
                    const watchProducts = data.filter(p => p.categories?.slug?.toLowerCase().includes('montre'))
                    // Take the top 3 most recent watches
                    const topWatches = watchProducts.slice(0, 3)
                    
                    if (topWatches.length > 0) {
                        const dynamicSlides = topWatches.map((product) => ({
                            id: product.id,
                            title: product.name_fr,
                            subtitle: "Nouveauté - " + (product.categories?.name || 'Montre'),
                            description: product.description_fr ? (product.description_fr.substring(0, 100) + '...') : '',
                            image: product.image_url,
                            link: `/product/${product.id}`
                        }))
                        setSlides(dynamicSlides)
                    } else {
                        setFallbackSlides()
                    }
                } else {
                    setFallbackSlides()
                }
            } catch (error) {
                console.error('Error fetching hero products:', error)
                setFallbackSlides()
            } finally {
                setLoading(false)
            }
        }

        fetchHeroProducts()
    }, [])

    const setFallbackSlides = () => {
        setSlides([
            {
                id: 1,
                title: "Élégance Intemporelle",
                subtitle: "Nouvelle Collection",
                description: "Des montres conçues pour ceux qui marquent l'histoire.",
                image: "/products/watches/black_arabic_stainless.jpg",
                link: "/shop?category=montre-arabe"
            }
        ])
    }

    // Auto-advance slide every 5 seconds
    useEffect(() => {
        if (slides.length <= 1) return
        const timer = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1))
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length, current])

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1)
    }

    if (loading) {
        return (
            <div className="relative h-[500px] md:h-[600px] bg-gray-900 flex items-center justify-center">
                <Loader className="animate-spin text-white" size={40} />
            </div>
        )
    }

    if (slides.length === 0) return null;

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-black text-white">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center md:object-right"
                    />

                    {/* Text Content */}
                    <div className="absolute inset-0 z-20 flex items-end md:items-center pb-24 md:pb-0 px-6 md:px-24">
                        <div className="max-w-2xl text-left transform transition-all duration-700 translate-y-0">
                            <span className="text-blue-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block drop-shadow-md">
                                {slide.subtitle}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight line-clamp-2 drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-sm md:text-lg text-gray-200 mb-8 max-w-xl line-clamp-2 drop-shadow">
                                {slide.description}
                            </p>
                            <Link
                                to={slide.link}
                                className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                Découvrir
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition">
                        <ChevronRight size={32} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-white w-8' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default HeroSlider