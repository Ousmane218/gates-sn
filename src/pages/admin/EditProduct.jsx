import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { ArrowLeft, Loader, Upload, X } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const EditProduct = () => {
    const { showToast } = useNotification()
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [formData, setFormData] = useState({})
    
    // Image state
    const [existingImages, setExistingImages] = useState([]) // URLs already in DB
    const [newImageFiles, setNewImageFiles] = useState([]) // New files to upload
    const [newImagePreviews, setNewImagePreviews] = useState([]) // Previews for new files

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await supabase.from('products').select('*').eq('id', id).single()
            if (data) {
                setFormData(data)
                // Load existing images
                let imgs = []
                if (data.additional_images && data.additional_images.length > 0) {
                    imgs = data.additional_images
                } else if (data.image_url) {
                    imgs = [data.image_url]
                }
                setExistingImages(imgs)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    // Handle new image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            setNewImageFiles(prev => [...prev, ...files])
            const newPreviews = files.map(file => URL.createObjectURL(file))
            setNewImagePreviews(prev => [...prev, ...newPreviews])
        }
    }

    const removeExistingImage = (indexToRemove) => {
        setExistingImages(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    const removeNewImage = (indexToRemove) => {
        setNewImageFiles(prev => prev.filter((_, index) => index !== indexToRemove))
        setNewImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (existingImages.length === 0 && newImageFiles.length === 0) {
            return showToast("Veuillez avoir au moins une image pour le produit.", "error")
        }

        setUpdating(true)
        try {
            // A. Upload New Images
            const uploadedUrls = []
            
            for (const file of newImageFiles) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
                
                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(fileName, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(fileName)
                    
                uploadedUrls.push(publicUrl)
            }

            const allImages = [...existingImages, ...uploadedUrls]

            // B. Update Product in Database
            const { error } = await supabase.from('products').update({
                name_fr: formData.name_fr,
                price: parseFloat(formData.price),
                stock_count: parseInt(formData.stock_count),
                description_fr: formData.description_fr,
                is_featured: formData.is_featured,
                image_url: allImages[0], // Primary image
                additional_images: allImages    // Array of all images
            }).eq('id', id)

            if (error) throw error
            
            showToast('Produit mis à jour !')
            navigate('/admin/products')
        } catch (err) {
            console.error('Error:', err)
            showToast('Erreur lors de la mise à jour', 'error')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) return <div>Chargement...</div>

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm my-8">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft /></button>
                <h1 className="text-2xl font-bold">Modifier le produit</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Images Section */}
                <div>
                    <label className="block text-sm font-bold mb-2">Images du produit (La première sera principale)</label>
                    
                    {/* Existing Images Grid */}
                    {(existingImages.length > 0 || newImagePreviews.length > 0) && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {/* Existing */}
                            {existingImages.map((url, index) => (
                                <div key={`ext-${index}`} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                                    <img src={url} alt={`Existing ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition opacity-0 group-hover:opacity-100 shadow-sm"
                                    >
                                        <X size={16} />
                                    </button>
                                    {index === 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] text-center py-1 font-bold">
                                            PRINCIPALE
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* New Previews */}
                            {newImagePreviews.map((preview, index) => (
                                <div key={`new-${index}`} className="relative group rounded-xl overflow-hidden border border-green-200 aspect-square">
                                    <img src={preview} alt={`New Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition opacity-0 group-hover:opacity-100 shadow-sm"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-green-500/80 text-white text-[10px] text-center py-1 font-bold">
                                        NOUVELLE
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload Dropzone */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-gray-400">
                            <Upload size={32} className="mx-auto mb-2" />
                            <p className="text-sm">Cliquez pour ajouter des photos</p>
                        </div>
                    </div>
                </div>

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
                    <input type="checkbox" name="is_featured" checked={formData.is_featured || false} onChange={handleChange} className="w-5 h-5 accent-black" />
                    <label className="font-medium cursor-pointer">Mettre en vedette (Home Page)</label>
                </div>
                <button type="submit" disabled={updating} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                    {updating ? <Loader className="animate-spin" /> : 'Sauvegarder les modifications'}
                </button>
            </form>
        </div>
    )
}

export default EditProduct
