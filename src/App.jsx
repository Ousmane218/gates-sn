import { Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/admin/Login'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AddProduct from './pages/admin/AddProduct'
import Orders from './pages/admin/Orders'
import EditProduct from './pages/admin/EditProduct'
import Products from './pages/admin/Products'

function App() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES (Wrapped in MainLayout with Navbar/Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* 2. ADMIN ROUTES (Wrapped in AdminLayout - No Public Navbar) */}
      <Route path="/admin/login" element={<Login />} />

      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  )
}

export default App
