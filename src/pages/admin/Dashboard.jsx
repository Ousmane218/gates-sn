import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react'

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        recentOrders: []
    })

    useEffect(() => {
        const fetchStats = async () => {
            // 1. Get Orders
            const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
            // 2. Get Products Count
            const { count } = await supabase.from('products').select('*', { count: 'exact', head: true })

            const revenue = orders?.reduce((acc, o) => acc + (o.status !== 'cancelled' ? o.total_amount : 0), 0) || 0

            setStats({
                totalRevenue: revenue,
                totalOrders: orders?.length || 0,
                totalProducts: count || 0,
                recentOrders: orders?.slice(0, 5) || []
            })
        }
        fetchStats()
    }, [])

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Vue d'ensemble</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><DollarSign size={24} /></div>
                        <span className="text-green-500 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +12%</span>
                    </div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Chiffre d'affaires</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.totalRevenue.toLocaleString()} F</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><ShoppingBag size={24} /></div>
                    </div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Commandes</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.totalOrders}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Users size={24} /></div>
                    </div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Clients</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.totalOrders}</h3> {/* Unique clients logic later */}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-50 text-gray-600 rounded-xl"><ShoppingBag size={24} /></div>
                    </div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Produits en stock</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.totalProducts}</h3>
                </div>
            </div>

            {/* Recent Activity */}
            <h2 className="text-lg font-bold mb-4">Commandes Récentes</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {stats.recentOrders.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Aucune commande récente.</div>
                ) : (
                    stats.recentOrders.map(order => (
                        <div key={order.id} className="p-4 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50">
                            <div>
                                <p className="font-bold text-sm">{order.customer_name}</p>
                                <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-sm font-bold">{order.total_amount.toLocaleString()} F</p>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                    {order.status === 'pending' ? 'En Attente' : 'Livré'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard
