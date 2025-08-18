import { Navigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext'

const AdminAndModerator = ({ children }) => {
    const { user } = useAuthContext()
    if (!user) {
        return <Navigate to='/signin' />;
    }

    if (user?.authorities.includes('ROLES_ADMIN') || user?.authorities.includes('ROLES_MODERATOR')) {
        return children;
    }

    return <Navigate to='/notallowed' />;
}

export default AdminAndModerator