import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, Package, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminLayout = () => {
    const { signOut } = useAuth()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-500 hover:bg-white hover:text-blue-600"

    const NavContent = () => (
        <>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h1 className="text-2xl font-black tracking-tighter text-gray-900">
                    GATES<span className="text-blue-600">.</span>ADMIN
                </h1>
                {/* Close Button (Mobile Only) */}
                <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-500">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link
                    to="/admin/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/admin/dashboard')}`}
                >
                    <LayoutDashboard size={20} /> Vue d'ensemble
                </Link>
                <Link
                    to="/admin/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive('/admin/products')}`}
                >
                    <Package size={20} /> Produits
                </Link>
                <Link
                    to="/admin/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive('/admin/orders')}`}
                >
                    <ShoppingCart size={20} /> Commandes
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button onClick={signOut} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition font-medium">
                    <LogOut size={20} /> Déconnexion
                </button>
            </div>
        </>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

            {/* 1. MOBILE HEADER (Visible only on phone) */}
            <div className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-30">
                <span className="font-black text-lg">GATES.ADMIN</span>
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-gray-100 rounded-lg">
                    <Menu size={24} />
                </button>
            </div>

            {/* 2. SIDEBAR (Desktop: Fixed / Mobile: Slide-over) */}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r fixed h-full flex-col z-20">
                <NavContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    {/* Menu Content */}
                    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl flex flex-col">
                        <NavContent />
                    </div>
                </div>
            )}

            {/* 3. MAIN CONTENT */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                {/* Added pb-32 to fix the 'cut-off' issue at the bottom */}
                <div className="pb-32">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
