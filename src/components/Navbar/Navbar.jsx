import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { MdClose, MdMenu } from "react-icons/md";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [role] = useRole()
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const menuOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleLogout = () => {
        logOut();
    };
    console.log(user)
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white font-bold text-xl">
                            EduManage
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center">
             <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/all-classes-for-student" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            All Classes
                        </Link>
                        {!(role === 'admin') ? (
                  <Link to="/teach" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Teach on EduManage
                  </Link>
                ) : (
                  <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed opacity-50">
                    Teach on EduManage
                  </span>
                )}
                        {/* Conditionally render based on user authentication status */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition"
                                    aria-label="User menu"
                                    aria-expanded={isDropdownOpen}
                                >
                                    {/* Render user profile picture */}
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.photoURL}
                                        alt="User Profile"
                                    />
                                </button>
                                {/* Dropdown menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                        <div className="py-1" role="none">
                                            {/* Render user name */}
                                            <span className="block px-4 py-2 text-sm text-gray-700">{user.displayName}</span>
                                            {/* Link to user dashboard */}
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</Link>
                                            {/* Logout button */}
                                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Sign In button (if not logged in)
                            <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Sign In
                            </Link>
                        )}
        </div>

                    {/* for Mobile */}
                    <div className='md:hidden'>
                        <button onClick={menuOpen}>
                            {
                                isOpen ? <MdClose className='text-white text-2xl' /> : <MdMenu className='text-white text-2xl' />
                            }
                        </button>
                        <div className={`absolute flex flex-col items-center top-16 bg-black bg-opacity-30 h-screen px-8 py-4 w-[40%] transition-all duration-300 ease-in-out ${isOpen ? 'right-0' : '-right-56 hidden'}`}>
                       {
                        user && <div>
                            {/* Render user profile picture */}
                            <img
                                        className="h-8 w-8 rounded-full mx-auto"
                                        src={user.photoURL}
                                        alt="User Profile"
                                    />
                                    <ul>
                                        <li className='text-white'>{user.displayName}</li>
                                    </ul>
                        </div>
                       }
                       <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/all-classes-for-student" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            All Classes
                        </Link>
                        {!(role === 'admin') ? (
                  <Link to="/teach" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-center">
                    Teach on EduManage
                  </Link>
                ) : (
                  <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed opacity-50">
                    Teach on EduManage
                  </span>
                )}
                {
                    user ? (
                        <div>
                            <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" role="menuitem">Dashboard</Link>
                            <button onClick={handleLogout} className="block w-full text-center px-4 py-2 text-sm text-white" role="menuitem">Logout</button>
                        </div>
                    ) : (
                         // Sign In button (if not logged in)
                         <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                         Sign In
                     </Link>
                     
                    )
                }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
