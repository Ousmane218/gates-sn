import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { ArrowLeft, Loader } from 'lucide-react'

const EditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await supabase.from('products').select('*').eq('id', id).single()
            if (data) setFormData(data)
            setLoading(false)
        }
        fetchProduct()
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        const { error } = await supabase.from('products').update({
            name_fr: formData.name_fr,
            price: formData.price,
            stock_count: formData.stock_count,
            description_fr: formData.description_fr,
            is_featured: formData.is_featured
        }).eq('id', id)

        if (!error) navigate('/admin/products')
        setUpdating(false)
    }

    if (loading) return <div>Chargement...</div>

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                <h1 className="text-2xl font-bold">Modifier le produit</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Nom</label>
                    <input name="name_fr" value={formData.name_fr || ''} onChange={handleChange} className="w-full border p-3 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Prix</label>
                        <input name="price" type="number" value={formData.price || ''} onChange={handleChange} className="w-full border p-3 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Stock</label>
                        <input name="stock_count" type="number" value={formData.stock_count || ''} onChange={handleChange} className="w-full border p-3 rounded" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Description</label>
                    <textarea name="description_fr" rows="4" value={formData.description_fr || ''} onChange={handleChange} className="w-full border p-3 rounded"></textarea>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="is_featured" checked={formData.is_featured || false} onChange={handleChange} className="w-5 h-5" />
                    <label>Mettre en vedette (Home Page)</label>
                </div>
                <button type="submit" disabled={updating} className="w-full bg-blue-600 text-white py-3 rounded font-bold">
                    {updating ? 'Enregistrement...' : 'Sauvegarder'}
                </button>
            </form>
        </div>
    )
}

export default EditProduct
