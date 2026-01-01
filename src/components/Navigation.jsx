import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isShopOpen, setIsShopOpen] = useState(false)
    const { cart } = useCart()
    const location = useLocation()

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
    const isHome = location.pathname === '/'

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* 1. Logo - Centered on mobile, Left on Desktop */}
                    <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tighter">
                        GATES<span className="text-blue-600">.</span>SN
                    </Link>

                    {/* 2. Desktop Menu - Clean & Centered */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
                        <Link to="/" className="hover:text-blue-600 transition">Accueil</Link>

                        {/* Dropdown for Shop */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-blue-600 transition py-4">
                                Collections <ChevronDown size={14} />
                            </button>
                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <Link to="/shop" className="block px-6 py-3 hover:bg-gray-50 text-gray-600 hover:text-black">Tout Voir</Link>
                                <Link to="/shop?category=montres" className="block px-6 py-3 hover:bg-gray-50 text-gray-600 hover:text-black">Montres</Link>
                                <Link to="/shop?category=chapeaux" className="block px-6 py-3 hover:bg-gray-50 text-gray-600 hover:text-black">Chapeaux</Link>
                            </div>
                        </div>

                        <Link to="#" className="hover:text-blue-600 transition">À Propos</Link>
                    </div>

                    {/* 3. Right Icons */}
                    <div className="flex items-center space-x-6">
                        <Link to="/cart" className="relative group">
                            <ShoppingBag size={24} className="text-gray-800 group-hover:text-blue-600 transition" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Trigger */}
                        <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-800">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Mobile Side Drawer (Better than simple dropdown) */}
            <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>

                {/* Content */}
                <div className="absolute right-0 top-0 h-full w-[80%] bg-white shadow-2xl p-6">
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-xl font-bold">Menu</span>
                        <button onClick={() => setIsOpen(false)}><X size={28} /></button>
                    </div>

                    <div className="flex flex-col space-y-6 text-lg font-bold uppercase tracking-wider">
                        <Link to="/" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-2">Accueil</Link>

                        {/* Mobile Dropdown Logic */}
                        <div className="pb-2 border-b border-gray-100">
                            <button onClick={() => setIsShopOpen(!isShopOpen)} className="flex justify-between w-full items-center">
                                Collections <ChevronDown size={16} className={`transform transition ${isShopOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isShopOpen && (
                                <div className="flex flex-col space-y-4 mt-4 pl-4 text-sm text-gray-600 normal-case font-medium">
                                    <Link to="/shop" onClick={() => setIsOpen(false)}>Tout voir</Link>
                                    <Link to="/shop?category=montres" onClick={() => setIsOpen(false)}>Nos Montres</Link>
                                    <Link to="/shop?category=chapeaux" onClick={() => setIsOpen(false)}>Nos Casquettes</Link>
                                </div>
                            )}
                        </div>

                        <Link to="#" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-2">À Propos</Link>
                        <Link to="/admin/login" onClick={() => setIsOpen(false)} className="text-xs text-gray-400 mt-auto pt-10">Admin Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation