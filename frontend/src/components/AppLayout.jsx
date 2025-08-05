import Navbar from './Navbar';
import SideBar from './SideBar';

const AppLayout = ({ layoutType, children, className }) => {
    return (
        <div>
            {layoutType === 'admin' ? <SideBar /> : <Navbar />}
            <main className={className}>{children}</main>
            {layoutType !== 'admin' ? <Footer /> : null}
        </div>
    );
};

export default AppLayout;