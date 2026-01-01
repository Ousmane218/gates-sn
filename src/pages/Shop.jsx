import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedCategorySlug = searchParams.get('category')

    useEffect(() => {
        fetchProducts()
    }, [selectedCategorySlug])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            let query = supabase.from('products').select('*')

            if (selectedCategorySlug) {
                const { data: categoryData } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('slug', selectedCategorySlug)
                    .single()

                if (categoryData) {
                    query = query.eq('category_id', categoryData.id)
                }
            }
            const { data, error } = await query.order('created_at', { ascending: false })
            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header - Clean & Minimal */}
            <div className="flex flex-col items-center mb-12 space-y-6">
                <h1 className="text-3xl md:text-4xl font-light uppercase tracking-[0.2em] text-center">
                    {selectedCategorySlug ? selectedCategorySlug : 'La Boutique'}
                </h1>

                {/* Minimalist Tab Filters */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/shop"
                        className={`text-xs font-bold uppercase tracking-widest px-6 py-3 border transition-all duration-300 ${!selectedCategorySlug ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}>
                        Tout
                    </Link>
                    <Link to="/shop?category=montres"
                        className={`text-xs font-bold uppercase tracking-widest px-6 py-3 border transition-all duration-300 ${selectedCategorySlug === 'montres' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}>
                        Montres
                    </Link>
                    <Link to="/shop?category=chapeaux"
                        className={`text-xs font-bold uppercase tracking-widest px-6 py-3 border transition-all duration-300 ${selectedCategorySlug === 'chapeaux' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}>
                        Chapeaux
                    </Link>
                </div>
            </div>

            {/* Grid - The "Mathydy" Look */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 aspect-[4/5] w-full mb-2 rounded"></div>
                            <div className="h-4 bg-gray-200 w-3/4 mb-1 rounded"></div>
                            <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
                    {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col items-center">

                            {/* Image Container - Aspect Ratio 4:5 (Taller) */}
                            <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden mb-4">
                                <img
                                    src={product.image_url}
                                    alt={product.name_fr}
                                    className="w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-105"
                                />

                                {/* Sold Out Badge */}
                                {product.stock_count === 0 && (
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-gray-100">
                                        Épuisé
                                    </div>
                                )}

                                {/* Hover "Quick View" Button */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300 ease-out hidden md:block">
                                    <div className="bg-white/95 backdrop-blur text-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition">
                                        Voir détails
                                    </div>
                                </div>
                            </div>

                            {/* Product Info - Centered & Clean */}
                            <h3 className="text-xs md:text-sm font-medium text-gray-900 text-center uppercase tracking-widest mb-2 line-clamp-1 group-hover:text-gray-600 transition">
                                {product.name_fr}
                            </h3>

                            <div className="text-sm md:text-base font-bold text-black">
                                {product.price.toLocaleString()} FCFA
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Shop
