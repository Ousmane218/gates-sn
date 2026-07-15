import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Trash2, Edit, Upload, X, Loader, Plus } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const Categories = () => {
    const { confirm, showToast } = useNotification()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)

    // Form state
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({ id: null, name: '', slug: '' })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false })
        if (!error) setCategories(data || [])
        setLoading(false)
    }

    const generateSlug = (name) => {
        return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const handleNameChange = (e) => {
        const name = e.target.value
        setFormData(prev => ({
            ...prev,
            name,
            slug: !isEditing ? generateSlug(name) : prev.slug // auto-update slug only when creating
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const resetForm = () => {
        setFormData({ id: null, name: '', slug: '' })
        setImageFile(null)
        setImagePreview(null)
        setIsEditing(false)
    }

    const handleEdit = (category) => {
        setFormData({ id: category.id, name: category.name, slug: category.slug })
        setImagePreview(category.image_url)
        setImageFile(null)
        setIsEditing(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        confirm({
            title: 'Supprimer la catégorie ?',
            message: 'Attention : Si des produits sont liés à cette catégorie, la suppression sera bloquée.',
            confirmText: 'Supprimer',
            onConfirm: async () => {
                try {
                    // Check for products
                    const { count, error: countError } = await supabase
                        .from('products')
                        .select('*', { count: 'exact', head: true })
                        .eq('category_id', id)

                    if (countError) throw countError

                    if (count > 0) {
                        showToast(`Impossible de supprimer : ${count} produit(s) utilisent cette catégorie.`, 'error')
                        return
                    }

                    const { error } = await supabase.from('categories').delete().eq('id', id)
                    if (error) throw error

                    setCategories(categories.filter(c => c.id !== id))
                    showToast('Catégorie supprimée avec succès !')
                    if (formData.id === id) resetForm()
                } catch (err) {
                    showToast('Erreur lors de la suppression', 'error')
                }
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.slug) return showToast("Le nom et le slug sont requis.", "error")

        setSubmitLoading(true)
        try {
            let finalImageUrl = imagePreview

            // 1. Upload new image if selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop()
                const fileName = `categories/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
                
                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(fileName, imageFile)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(fileName)
                    
                finalImageUrl = publicUrl
            }

            // 2. Save to DB
            if (isEditing) {
                const { error } = await supabase
                    .from('categories')
                    .update({ name: formData.name, slug: formData.slug, image_url: finalImageUrl })
                    .eq('id', formData.id)
                if (error) throw error
                showToast('Catégorie modifiée !')
            } else {
                const { error } = await supabase
                    .from('categories')
                    .insert([{ name: formData.name, slug: formData.slug, image_url: finalImageUrl }])
                if (error) throw error
                showToast('Catégorie créée !')
            }

            resetForm()
            fetchCategories()
        } catch (error) {
            console.error(error)
            showToast("Erreur: " + error.message, "error")
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Gestion des Catégories</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORM SECTION */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                            {isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-bold mb-2">Image de couverture</label>
                                {imagePreview ? (
                                    <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-[3/2] mb-4 group">
                                        <img src={imagePreview} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(null); setImageFile(null); }}
                                            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative aspect-[3/2] flex flex-col items-center justify-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <Upload size={32} className="text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-500">Ajouter une image</span>
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold mb-2">Nom de la catégorie</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                                    placeholder="Ex: Montres en Cuir"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-bold mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none bg-gray-50 text-gray-600"
                                    placeholder="montres-en-cuir"
                                />
                                <p className="text-xs text-gray-400 mt-1">Identifiant unique utilisé dans les liens.</p>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-2 pt-2">
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition text-sm"
                                    >
                                        Annuler
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="flex-[2] bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm"
                                >
                                    {submitLoading ? <Loader className="animate-spin" size={20} /> : (isEditing ? 'Sauvegarder' : 'Créer')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* LIST SECTION */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {loading ? (
                            <div className="p-12 flex justify-center"><Loader className="animate-spin text-gray-400" size={32} /></div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                        <tr>
                                            <th className="p-4">Catégorie</th>
                                            <th className="p-4 hidden sm:table-cell">Slug</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {categories.map((c) => (
                                            <tr key={c.id} className="hover:bg-gray-50 transition">
                                                <td className="p-4 flex items-center gap-4">
                                                    {c.image_url ? (
                                                        <img src={c.image_url} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center p-1 leading-tight">Sans img</div>
                                                    )}
                                                    <span className="font-bold text-sm">{c.name}</span>
                                                </td>
                                                <td className="p-4 hidden sm:table-cell text-sm text-gray-500 font-mono">
                                                    {c.slug}
                                                </td>
                                                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition"><Edit size={18} /></button>
                                                    <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"><Trash2 size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {categories.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="p-8 text-center text-gray-500">Aucune catégorie trouvée.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
