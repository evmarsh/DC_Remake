import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';
import Footer from './Footer';

const AppLayout = ({ layoutType, className }) => {
    return (
        <div>
            {layoutType === 'admin' ? <SideBar /> : <Navbar />}
            <main className={className}>
                <Outlet />
            </main>
            {layoutType !== 'admin' ? <Footer /> : null}
        </div>
    );
};

export default AppLayout;