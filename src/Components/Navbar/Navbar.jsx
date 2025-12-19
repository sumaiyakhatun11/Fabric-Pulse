import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { showToast } from '../../Shared/toast';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => showToast('Logged out', 'success'))
            .catch((error) => showToast(String(error), 'error'));
    };

    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const handleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <nav className="w-full bg-[#e6e4e4] text-black shadow-lg px-6 py-4 flex items-center justify-between md:justify-between">

            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold text-[#827e7b] tracking-wide">
                <img className="h-15 rounded-4xl" src={logo} alt="Logo" />
                <Link to="/">
                    Jonaki
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-black font-medium">
                <Link to="/" className="hover:text-[#713600]">Home</Link>
                <Link to="/all-products" className="hover:text-[#713600]">All Products</Link>




                {user && (
                    <>
                        <div className="flex items-center gap-8 text-black font-medium">

                            <Link to="/dashboard" className="hover:text-[#713600]">Dashboard</Link>
                        </div>
                        <Link to="/profile">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                referrerPolicy="no-referrer"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-[#713600] hover:scale-105 transition"
                            />
                        </Link>


                    </>
                )}

                {/* Theme Toggle */}
                <label className="flex cursor-pointer gap-2 items-center">
                    <input
                        type="checkbox"
                        checked={isDark}
                        onChange={handleTheme}
                        className="toggle theme-controller"
                    />
                </label>

                {/* Login/Logout */}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00] hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00] hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 px-4">
                    <Link to="/" className="hover:text-[#713600]">Home</Link>
                    <Link to="/services" className="hover:text-[#713600]">Pets & Supplies</Link>

                    {user && (
                        <>
                            <Link to="/addServices" className="hover:text-[#713600]">Add Listing</Link>
                            <Link to="/myServices" className="hover:text-[#713600]">My Listings</Link>
                            <Link to="/myOrders" className="hover:text-[#713600]">My Orders</Link>
                            <Link to="/profile" className="flex items-center gap-2">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-[#713600]"
                                />
                                Profile
                            </Link>
                        </>
                    )}

                    {/* Theme Toggle */}
                    <label className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={handleTheme}
                            className="toggle theme-controller"
                        />
                        <span>Dark Mode</span>
                    </label>

                    {/* Login/Logout */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00] hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00] hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}

        </nav>
    );
};

export default Navbar;
