
import MenuItem from './MenuItem';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'

const TeacherMenu = () => {
    return (
        <>
          <MenuItem icon={BsFillHouseAddFill} label='Add Class' address='add-class' />
          <MenuItem icon={MdHomeWork} label='My Classes' address='my-classes-list' />
          <MenuItem
            icon={MdOutlineManageHistory}
            label='Manage Bookings'
            address='manage-bookings'
          />
        </>
      )
};

export default TeacherMenu;