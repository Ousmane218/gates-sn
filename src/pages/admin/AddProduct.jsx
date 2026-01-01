import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Loader } from 'lucide-react'

const AddProduct = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    // Form State
    const [formData, setFormData] = useState({
        name_fr: '',
        name_en: '', // Optional for now, we can copy FR
        description_fr: '',
        price: '',
        category_id: '',
        is_featured: false
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    // 1. Fetch Categories on load
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('*')
            if (data) {
                setCategories(data)
                // Auto-select the first category
                if (data.length > 0) setFormData(prev => ({ ...prev, category_id: data[0].id }))
            }
        }
        fetchCategories()
    }, [])

    // 2. Handle Inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    // 3. Handle Image Selection
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    // 4. Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!imageFile) return alert("Veuillez sélectionner une image.")

        setLoading(true)
        try {
            // A. Upload Image
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}` // Unique name
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(fileName, imageFile)

            if (uploadError) throw uploadError

            // B. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(fileName)

            // C. Insert Product into Database
            const { error: insertError } = await supabase
                .from('products')
                .insert([{
                    name_fr: formData.name_fr,
                    name_en: formData.name_fr, // Just copy FR for now to satisfy DB
                    description_fr: formData.description_fr,
                    price: parseFloat(formData.price),
                    category_id: formData.category_id,
                    image_url: publicUrl,
                    is_featured: formData.is_featured,
                    stock_count: 10 // Default stock
                }])

            if (insertError) throw insertError

            // Success!
            navigate('/admin/dashboard')
        } catch (error) {
            console.error('Error:', error)
            alert("Erreur lors de la création: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Nouveau Produit</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-bold mb-2">Image du produit</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-48 mx-auto object-contain" />
                            ) : (
                                <div className="text-gray-400">
                                    <Upload size={40} className="mx-auto mb-2" />
                                    <p>Cliquez pour ajouter une photo</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold mb-2">Nom du produit</label>
                        <input
                            type="text"
                            name="name_fr"
                            value={formData.name_fr}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                            placeholder="Ex: Montre Noire Élégante"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Prix (FCFA)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                                placeholder="10000"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Catégorie</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold mb-2">Description</label>
                        <textarea
                            name="description_fr"
                            value={formData.description_fr}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                            placeholder="Détails du produit..."
                        ></textarea>
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                            id="featured"
                            className="w-5 h-5 accent-black"
                        />
                        <label htmlFor="featured" className="font-medium cursor-pointer">
                            Afficher sur la page d'accueil (En Vedette)
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader className="animate-spin" /> : 'Créer le produit'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddProduct
