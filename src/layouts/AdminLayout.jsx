import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminLayout = () => {
    const { signOut } = useAuth()
    const location = useLocation()

    const isActive = (path) => location.pathname === path
        ? "bg-blue-600 text-white shadow-md transform scale-105"
        : "text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm"

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Fixed Width */}
            <aside className="w-64 bg-white border-r fixed h-full hidden md:flex flex-col z-20">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-black tracking-tighter text-gray-900">
                        GATES<span className="text-blue-600">.</span>ADMIN
                    </h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${isActive('/admin/dashboard')}`}>
                        <LayoutDashboard size={20} /> Vue d'ensemble
                    </Link>
                    <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive('/admin/products')}`}>
                        <Package size={20} /> Produits
                    </Link>
                    <Link to="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive('/admin/orders')}`}>
                        <ShoppingCart size={20} /> Commandes
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={signOut} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition font-medium">
                        <LogOut size={20} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content - Offset by sidebar width */}
            <main className="ml-0 md:ml-64 flex-1 p-4 md:p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
