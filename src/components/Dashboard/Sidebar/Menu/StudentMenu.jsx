import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import StudentModal from "../../../Modal/StudentModal";
import { NavLink } from "react-router-dom";


const StudentMenu = () => {
    const { user } = useAuth()
    const [role] = useRole()
    // for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
      setIsModalOpen(false)
    }
    const modalHandler = async () => {
      console.log('I want to be a host')
      try {
        const currentUser = {
          email: user?.email,
          role: 'guest',
          status: 'Requested',
        }
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser)
        console.log(data)
        if (data.modifiedCount > 0) {
          toast.success('Success! Please wait for admin confirmation')
        } else {
          toast.success('Please!, Wait for admin approval👊')
        }
      } catch (err) {
        console.log(err)
        toast.error(err.message)
      } finally {
        closeModal()
      }
    }
    return (
      <>
        <MenuItem
          icon={BsFingerprint}
          label='My enroll class'
          address='myenroll-classes'
        />
        {/* Modal */}
        <StudentModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
        />
      </>
    )
};

export default StudentMenu;