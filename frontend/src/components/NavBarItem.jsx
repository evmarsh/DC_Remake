import { Link } from "react-router-dom";

// Add onClick to props
function NavBarItem({ text, to, className, onClick }) {
    return (
        // Apply onClick handler
        <div className={`navbar-item ${className || ''}`} onClick={onClick}>
            <Link to={to}>
                <p className="text-white text-lg font-medium">{text}</p>
            </Link>
        </div>
    );
}

export default NavBarItem;