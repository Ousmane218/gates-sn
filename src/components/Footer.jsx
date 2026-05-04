import { Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

// Custom Icons for Snap & TikTok (Since they aren't always in standard libraries)
const TikTokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
)

const SnapchatIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.22 1.34c-1.3-.28-2.65-.28-3.95.02-1.25.3-2.14 1.15-2.6 2.37-.25.68-.3 1.45-.3 2.18 0 1.25.32 2.45.88 3.55-1.5-.2-2.9-.6-4.22-1.3-.22-.1-.5-.12-.7-.02-.2.1-.32.32-.3.55.08.68.3 1.32.65 1.9.4.65 1.05 1.1 1.78 1.38.7.25 1.45.42 2.2.5-.4.5-.85.95-1.35 1.35-.45.38-1 .72-1.6.9-.38.1-.55.5-.38.85.1.2.3.3.52.3 1.38 0 2.68-.45 3.8-1.2.45-.3.88-.65 1.28-1.02.5.4 1.05.8 1.62 1.15 1.15.68 2.5 1.08 3.85 1.08 1.35 0 2.7-.4 3.85-1.08.58-.35 1.12-.75 1.62-1.15.4.38.82.72 1.28 1.02 1.12.75 2.42 1.2 3.8 1.2.22 0 .42-.1.52-.3.18-.35 0-.75-.38-.85-.6-.18-1.15-.52-1.6-.9-.5-.4-.95-.85-1.35-1.35.75-.08 1.5-.25 2.2-.5.72-.28 1.38-.72 1.78-1.38.35-.58.58-1.22.65-1.9.02-.22-.1-.45-.3-.55-.2-.1-.48-.08-.7.02-1.32.7-2.72 1.1-4.22 1.3.55-1.1.88-2.3.88-3.55 0-.72-.05-1.5-.3-2.18-.45-1.22-1.35-2.08-2.6-2.37-1.3-.3-2.65-.3-3.95-.02z" />
    </svg>
)

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-light tracking-[0.2em] mb-6">GATES.SN</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            L'élégance accessible. <br />
                            Dakar, Sénégal.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Navigation</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-medium">
                            <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition">Boutique</Link></li>
                            <li><Link to="/shop?category=montres" className="hover:text-white transition">Montres</Link></li>
                            <li><Link to="/shop?category=lunettes" className="hover:text-white transition">Lunettes</Link></li>
                            <li><Link to="/shop?category=chapeaux" className="hover:text-white transition">Chapeaux</Link></li>
                            <li className="pt-4 border-t border-gray-900"><Link to="/admin/login" className="text-xs text-gray-600 hover:text-white transition uppercase tracking-widest font-bold">Connexion</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Aide</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-white transition">Contactez-nous</a></li>
                            <li><a href="#" className="hover:text-white transition">Livraisons</a></li>
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Social Media - The New Part */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Rejoignez-nous</h4>
                        <div className="flex justify-center md:justify-start gap-4">

                            {/* INSTAGRAM */}
                            <a href="https://www.instagram.com/gates_sn?igsh=MTV3bmR4Y3B2ZXhjMQ==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                                <Instagram size={20} />
                            </a>

                            {/* SNAPCHAT */}
                            <a href="https://www.snapchat.com/add/gates_sn" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#FFFC00] hover:text-black transition-all duration-300 group">
                                <SnapchatIcon size={20} />
                            </a>

                            {/* TIKTOK */}
                            <a href="https://www.tiktok.com/@gates.sn?_r=1&_t=ZM-92hCesZx4gu" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#00f2ea] hover:text-black transition-all duration-300 group">
                                <TikTokIcon size={20} />
                            </a>

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 text-center text-gray-600 text-xs uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Gates.sn - Made in Dakar.
                </div>
            </div>
        </footer>
    )
}

export default Footer