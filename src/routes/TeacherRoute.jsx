import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'

const TeacherRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <p>Loding...........</p>
    if (role === 'teacher') return children
    return <Navigate to='/dashboard' />
  }

export default TeacherRoute;