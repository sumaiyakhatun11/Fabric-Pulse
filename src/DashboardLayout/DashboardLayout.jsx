import { Outlet } from 'react-router-dom';
import Aside from '../Components/Aside/Aside';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-900 text-white transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1">
                <aside className="bg-neutral-800 border-r border-neutral-700">
                    <Aside />
                </aside>

                <main className="flex-1 p-6 bg-neutral-900">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
