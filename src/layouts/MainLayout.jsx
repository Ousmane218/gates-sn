import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-white text-black font-sans flex flex-col">
            <Navigation />
            <main className="flex-grow">
                <Outlet /> {/* This is where Home, Shop, etc. will appear */}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
