import { Link } from "react-router-dom"

function SideBarIcon({icon, text="tooltip", path}) {
    return (
        <Link to={path} className="sidebar-icon group">
            {icon}

            <span class="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </Link>
    )
}

export default SideBarIcon