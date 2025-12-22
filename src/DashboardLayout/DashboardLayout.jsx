import { Outlet } from 'react-router-dom';
import Aside from '../Components/Aside/Aside';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <aside className="">
                    <Aside />
                </aside>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
