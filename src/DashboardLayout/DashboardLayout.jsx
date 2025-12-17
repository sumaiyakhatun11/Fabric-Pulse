import { Outlet } from 'react-router-dom';
import Aside from '../Components/Aside/Aside';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="">
                <Aside >

                </Aside>
            </aside>


            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
