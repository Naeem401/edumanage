import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Main
