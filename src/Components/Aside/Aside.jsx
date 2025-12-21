import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';



const Aside = () => {

    const { user } = useContext(AuthContext);
    const { role } = useContext(AuthContext); // ✅ destructure role here

    return (
        <aside className="w-64 bg-gray-100 h-screen p-4">
            <Link to="/dashboard" className="text-xl font-bold mb-4 block">Dashboard</Link>
            <ul className="space-y-2">
                <li>
                    <Link to="/" className="block p-2 rounded hover:bg-gray-200">Back to Home</Link>
                </li>


                {/* Admin Menu */}
                {role === 'admin' && (
                    <>
                        <li>
                            <Link to="/dashboard/all-users" className="block p-2 rounded hover:bg-gray-200">All Users</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/all-blood-donation-request" className="block p-2 rounded hover:bg-gray-200">Add Products</Link>
                        </li>
                    </>
                )}

                {/* Volunteer Menu */}
                {role === 'manager' && (
                    <li>
                        <li>
                            <Link to="/dashboard/add-product" className="block p-2 rounded hover:bg-gray-200">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/manage-product" className="block p-2 rounded hover:bg-gray-200">Manage Product</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/pending-orders" className="block p-2 rounded hover:bg-gray-200">Pending Orders</Link>
                        </li>

                        <li>
                            <Link to="/dashboard/approved-orders" className="block p-2 rounded hover:bg-gray-200">Approved Orders</Link>
                        </li>
                    </li>
                )}

                {role === 'buyer' && (
                    <li>
                        <li>
                            <Link to="/dashboard/my-orders" className="block p-2 rounded hover:bg-gray-200">My Orders</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-tracking" className="block p-2 rounded hover:bg-gray-200">My Tracking</Link>
                        </li>

                    </li>
                )}



                <li>
                    <Link to="/profile">
                        <div className='flex items-center gap-2'>
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                referrerPolicy="no-referrer"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-[#713600] hover:scale-105 transition"
                            />
                            <p>My Profile</p>
                        </div>
                    </Link>

                </li>
            </ul>
        </aside>
    );
};

export default Aside;
