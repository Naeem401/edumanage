import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import EnrollmentModal from '../../../components/Modal/EnrollmentModal';

const ClassEnrollment = ({classDetails}) => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
   
  
    const closeModal = () => {
      setIsOpen(false)
    }
    return (
      <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
        <div className='flex items-center gap-1 p-4'>
          <div className='text-2xl font-semibold'>$ {classDetails.price}</div>
          <div className='font-light text-neutral-600'>/class</div>
        </div>
        <hr />
        <div className='p-4'>
         <button className='btn bg-purple-50'
            onClick={() => setIsOpen(true)}
            >Enroll</button>
        </div>
  
        {/* Modal */}
        <EnrollmentModal
          isOpen={isOpen}
          closeModal={closeModal}
          enrollmentInfo={{
            ...classDetails,
            price: classDetails.price,
          }}
        />
        <hr />
        <div className='p-4 flex items-center justify-between font-semibold text-lg'>
          <div>Total</div>
          <div>${classDetails.price}</div>
        </div>
      </div>
    )
};

export default ClassEnrollment;