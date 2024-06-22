import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Teacher Request' address='teacher-requests-handle' />
      <MenuItem icon={FaUserCog} label='All Classes' address='admin-get-all-classes' />
    </>
  )
}

export default AdminMenu