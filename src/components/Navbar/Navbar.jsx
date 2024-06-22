import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
const [role] = useRole()
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); 
    };

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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
