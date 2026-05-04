import { useState, useEffect } from 'react'

const ProductImageCarousel = ({ product }) => {
    const [currentIdx, setCurrentIdx] = useState(0)
    
    const allImages = product.additional_images && product.additional_images.length > 0 
        ? product.additional_images 
        : [product.image_url]

    useEffect(() => {
        if (allImages.length <= 1) return;
        
        // Use a simple interval for cycling
        const timer = setInterval(() => {
            setCurrentIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1))
        }, 3000) // 3 seconds between swaps
        
        return () => clearInterval(timer)
    }, [allImages.length])

    return (
        <div className="absolute inset-0 w-full h-full bg-gray-50 overflow-hidden">
            {allImages.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={product.name_fr}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 ${
                        idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
            ))}
        </div>
    )
}

export default ProductImageCarousel
