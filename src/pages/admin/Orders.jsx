import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { CheckCircle, Clock, Package, ChevronDown, ChevronUp, Check } from 'lucide-react'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedOrder, setExpandedOrder] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const { data } = await supabase
            .from('orders')
            .select('*, order_items(*, products(*))')
            .order('created_at', { ascending: false })

        setOrders(data || [])
        setLoading(false)
    }

    const markAsDelivered = async (id) => {
        if (!window.confirm("Confirmer la livraison de cette commande ?")) return

        // 1. Update Database
        const { error } = await supabase
            .from('orders')
            .update({ status: 'delivered' })
            .eq('id', id)

        // 2. Update UI
        if (!error) {
            setOrders(orders.map(o => o.id === id ? { ...o, status: 'delivered' } : o))
        } else {
            alert("Erreur lors de la mise à jour. Vérifiez votre connexion.")
        }
    }

    // Stats
    const totalRevenue = orders.reduce((acc, o) => acc + (o.status === 'delivered' ? o.total_amount : 0), 0)
    const pendingCount = orders.filter(o => o.status === 'pending').length
    const deliveredCount = orders.filter(o => o.status === 'delivered').length

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Gestion des Commandes</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><Clock size={24} /></div>
                    <div><p className="text-gray-500 text-xs uppercase">En Attente</p><h3 className="text-2xl font-bold">{pendingCount}</h3></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full"><CheckCircle size={24} /></div>
                    <div><p className="text-gray-500 text-xs uppercase">Livrées</p><h3 className="text-2xl font-bold">{deliveredCount}</h3></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Package size={24} /></div>
                    <div><p className="text-gray-500 text-xs uppercase">Revenu (Livré)</p><h3 className="text-2xl font-bold">{totalRevenue.toLocaleString()} F</h3></div>
                </div>
            </div>

            {/* MOBILE LIST */}
            <div className="md:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold">{order.customer_name}</h3>
                                <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {order.status === 'pending' ? 'En Attente' : 'Livré'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-blue-600">{order.total_amount.toLocaleString()} F</p>
                            <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="text-gray-400">
                                {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                        </div>

                        {expandedOrder === order.id && (
                            <div className="border-t pt-3 mt-3 space-y-2">
                                <p className="text-sm text-gray-600">📞 {order.customer_phone}</p>
                                <div className="bg-gray-50 p-2 rounded">
                                    {order.order_items.map((item, idx) => (
                                        <div key={idx} className="text-xs flex justify-between">
                                            <span>{item.products?.name_fr} (x{item.quantity})</span>
                                        </div>
                                    ))}
                                </div>

                                {order.status === 'pending' ? (
                                    <button
                                        onClick={() => markAsDelivered(order.id)}
                                        className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={16} /> Valider la livraison
                                    </button>
                                ) : (
                                    <div className="w-full mt-2 bg-gray-100 text-gray-500 py-2 rounded-lg text-sm font-bold text-center flex items-center justify-center gap-2">
                                        <Check size={16} /> Commande Terminée
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Statut</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                <td className="p-4 font-bold">
                                    {order.customer_name}
                                    <div className="text-xs text-gray-400 font-normal">{order.customer_phone}</div>
                                </td>
                                <td className="p-4 font-mono text-blue-600">{order.total_amount.toLocaleString()} F</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {order.status === 'pending' ? 'En Attente' : 'Livré'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {order.status === 'pending' ? (
                                        <button
                                            onClick={() => markAsDelivered(order.id)}
                                            className="text-xs font-bold bg-black text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                        >
                                            Valider
                                        </button>
                                    ) : (
                                        <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
                                            <Check size={14} /> Terminé
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders
