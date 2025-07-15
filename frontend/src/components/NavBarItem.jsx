import { Link } from "react-router-dom";

// Add onClick to props
function NavBarItem({ text, to, className, onClick }) {
    return (
        // Apply onClick handler
        <div>
            <Link to={to} className={`navbar-item ${className || ''}`} onClick={onClick}>
                <p className="text-white text-lg font-medium">{text}</p>
            </Link>
        </div>
    );
}

export default NavBarItem;