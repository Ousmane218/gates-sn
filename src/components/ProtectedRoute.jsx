import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { session, loading } = useAuth()

    if (loading) return <div>Chargement...</div>

    // If not logged in, kick them back to login page
    if (!session) {
        return <Navigate to="/admin/login" replace />
    }

    return children
}

export default ProtectedRoute
