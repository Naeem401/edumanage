import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
const useRole = () => {
  const { user, loading } = useAuth()
 

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user?.email}`)
      return data.role
    },
  })

  return [role, isLoading]
}

export default useRole