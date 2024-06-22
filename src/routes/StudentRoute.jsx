import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'

const StudentRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <p>Loding...........</p>
    if (role === 'student') return children
    return <Navigate to='/dashboard' />
};

export default StudentRoute;