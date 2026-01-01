import { Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

// Custom Icons for Snap & TikTok (Since they aren't always in standard libraries)
const TikTokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
)

const SnapchatIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0" />
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
                            <li><Link to="/shop?category=chapeaux" className="hover:text-white transition">Chapeaux</Link></li>
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