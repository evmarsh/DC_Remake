import { useState } from 'react';
import NavBarItem from './NavBarItem'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import DropdownNavBarItem from './DropdownNavBarItem';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false); // State to control menu visibility

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute inset-x-0 top-0 h-16 min-w-full bg-dark flex flex-row items-center px-4 z-10">
            {/* Logo/Brand Name (optional) */}
            <div className="py-2 px-3 rounded-md cursor-pointer">
                <Link to="/">
                    <h1 className='text-white font-stretch-50%'>Dick Clark's</h1>
                </Link>
            </div>

            {/* Hamburger Icon - Visible on small screens, hidden on medium and larger */}
            <div className="flex items-center hamburger">
                {/* Hamburger Icon - Visible on small screens, hidden on medium and larger */}
                <button
                    className="text-white md:hidden focus:outline-none p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? (
                        // Close icon (e.g., an 'X')
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    )}
                </button>

                <div className={`
                    ${isOpen ? 'flex' : 'hidden'}
                    flex-col absolute top-16 right-0 w-48 bg-dark p-4 rounded-b-lg shadow-lg
                    md:flex md:flex-row md:static md:w-auto md:bg-transparent md:p-0 md:shadow-none z-30
                `}>
                    <NavBarItem to="/menu" text="Menu" onClick={toggleMenu} />
                    <NavBarItem to="/book_a_party" text="Book a Party" onClick={toggleMenu} />
                    <DropdownNavBarItem
                    text="Order Online"
                    items={[
                        { text: "Uber Eats", to: "https://www.ubereats.com/store/dick-clarks-family-restaurant/LtUoSCBIWNivm6_vTPg5nA", external: true },
                        { text: "DoorDash", to: "https://order.online/store/dick-clark's-family-restaurant-princeton-24897238/?hideModal=true&pickup=true&redirected=true", external: true },
                    ]}
                    onClick={toggleMenu}
                    /> 
                </div>
            </div>
        </div>
    );
}

export default NavBar;