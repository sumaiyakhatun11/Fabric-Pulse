import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import logo from '../../assets/logo.png';



const Aside = () => {

    const { user, dbUser, role } = useContext(AuthContext);
    const isSuspended = dbUser?.status === 'suspended';

    return (
        <aside className="w-64 border-r border-neutral-700 h-full p-6 overflow-y-auto shadow-lg bg-neutral-800 my-1 transition-colors duration-300">
            <img src={logo} className='h-20' alt="FabricPulse Logo" />
            {/* Logo/Dashboard Title */}
            <Link to="/dashboard" className="text-2xl font-bold mb-8 block text-purple-400 hover:opacity-80 transition">
                Dashboard
            </Link>

            <nav className="space-y-1">

                {/* Admin Menu */}
                {role === 'admin' && (
                    <>
                        <div className="mt-6 pt-6 border-t border-neutral-700">
                            <p className="text-xs font-bold uppercase text-neutral-400 px-4 mb-3">Admin Panel</p>
                            <Link
                                to="/dashboard/all-users"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                All Users
                            </Link>
                            <Link
                                to="/dashboard/all-products"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                All Products
                            </Link>
                            <Link
                                to="/dashboard/all-orders"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                All Orders
                            </Link>
                        </div>
                    </>
                )}

                {/* Manager Menu */}
                {role === 'manager' && (
                    <>
                        <div className="mt-6 pt-6 border-t border-neutral-700">
                            <p className="text-xs font-bold uppercase text-neutral-400 px-4 mb-3">Manager Panel</p>
                            {isSuspended ? (
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg opacity-50 cursor-not-allowed text-neutral-300 font-medium"
                                    title="Suspended — cannot add products"
                                >
                                    Add Product
                                </button>
                            ) : (
                                <Link
                                    to="/dashboard/add-product"
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                                >
                                    Add Product
                                </Link>
                            )}
                            <Link
                                to="/dashboard/manage-product"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                Manage Product
                            </Link>
                            <Link
                                to="/dashboard/pending-orders"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                Pending Orders
                            </Link>
                            <Link
                                to="/dashboard/approved-orders"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                Approved Orders
                            </Link>
                        </div>
                    </>
                )}

                {/* Buyer Menu */}
                {role === 'buyer' && (
                    <>
                        <div className="mt-6 pt-6 border-t border-neutral-700">
                            <p className="text-xs font-bold uppercase text-neutral-400 px-4 mb-3">Buyer Panel</p>
                            <Link
                                to="/dashboard/my-orders"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                My Orders
                            </Link>
                            <Link
                                to="/dashboard/my-tracking"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-700 transition font-medium"
                            >
                                My Tracking
                            </Link>
                        </div>
                    </>
                )}

                {/* Profile */}
                <div className="mt-8 pt-8 border-t border-neutral-700">
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition font-medium text-neutral-300"
                    >
                        <img
                            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                            referrerPolicy="no-referrer"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-purple-600 object-cover"
                        />
                        <span>My Profile</span>
                    </Link>
                </div>
            </nav>
        </aside>
    );
};

export default Aside;
