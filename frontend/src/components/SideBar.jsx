import SideBarIcon from "./SideBarIcon"
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs"
import { FaCalendarDay, FaHamburger, FaCamera, FaClock } from "react-icons/fa"

function SideBar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-dark text-white shadow">
            <SideBarIcon icon={<FaCalendarDay size="22" />} text="Party Requests" path="/admin" />
            <SideBarIcon icon={<FaHamburger size="22" />} text="Menus" path="/admin/menus" />
            <SideBarIcon icon={<FaCamera size="22" />} text="Pictures" path="/admin/pictures" />
            <SideBarIcon icon={<FaClock size="22" />} text="Hours" path="/admin/hours" />
        </div>
    )
}

export default SideBar