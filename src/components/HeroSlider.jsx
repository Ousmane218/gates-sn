import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
    {
        id: 1,
        title: "Élégance Intemporelle",
        subtitle: "Nouvelle Collection 2025",
        description: "Des montres conçues pour ceux qui marquent l'histoire.",
        image: "/products/watches/black_arabic_stainless.jpg", // We use a product image as bg for now
        link: "/shop?category=montres",
        color: "bg-gray-900"
    },
    {
        id: 2,
        title: "Style & Caractère",
        subtitle: "Collection Accessoires",
        description: "Affirmez votre personnalité avec nos pièces uniques.",
        image: "/products/hats/luffy.jpg",
        link: "/shop?category=chapeaux",
        color: "bg-blue-900"
    }
]

const HeroSlider = () => {
    const [current, setCurrent] = useState(0)

    // Auto-advance slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [current])

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1)
    }

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-black text-white">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay for readability */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-50"
                    />

                    {/* Text Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                        <div className="max-w-3xl transform transition-all duration-700 translate-y-0">
                            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm md:text-base mb-4 block">
                                {slide.subtitle}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                {slide.description}
                            </p>
                            <Link
                                to={slide.link}
                                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                Découvrir
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
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
        </div>
    )
}

export default HeroSlider