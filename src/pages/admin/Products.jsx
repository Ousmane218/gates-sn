import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit, Search } from 'lucide-react'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        setProducts(data || [])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce produit ?")) return
        await supabase.from('products').delete().eq('id', id)
        setProducts(products.filter(p => p.id !== id))
    }

    const filteredProducts = products.filter(p =>
        p.name_fr.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold">Inventaire ({products.length})</h1>

                <div className="flex w-full md:w-auto gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </div>
                    <Link to="/admin/products/new" className="bg-black text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800">
                        <Plus size={20} /> Ajouter
                    </Link>
                </div>
            </div>

            {/* Product List (Grid for Mobile, Table for Desktop) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="hidden md:block">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Produit</th>
                                <th className="p-4">Prix</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Catégorie</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={p.image_url} className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                                        <span className="font-bold text-sm">{p.name_fr}</span>
                                    </td>
                                    <td className="p-4 font-mono text-sm">{p.price} F</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock_count > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {p.stock_count}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500 uppercase">
                                        {p.category_id.includes('a0ee') ? 'Montre' : 'Chapeau'}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => navigate(`/admin/products/edit/${p.id}`)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                        <div key={p.id} className="p-4 flex items-center gap-4">
                            <img src={p.image_url} className="w-16 h-16 rounded-lg object-cover bg-gray-50" />
                            <div className="flex-1">
                                <h3 className="font-bold text-sm">{p.name_fr}</h3>
                                <p className="text-gray-500 text-xs">{p.price} FCFA</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => navigate(`/admin/products/edit/${p.id}`)} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Edit size={20} /></button>
                                <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products
