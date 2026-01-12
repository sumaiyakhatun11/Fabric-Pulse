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
        <nav className="w-full bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 text-neutral-900 dark:text-white shadow-lg px-6 py-4 flex items-center justify-between md:justify-between border-b border-purple-100 dark:border-neutral-700 transition-colors duration-300">

            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold text-neutral-800 dark:text-white tracking-wide">
                <img className="h-15 rounded-4xl" src={logo} alt="Logo" />
                <Link to="/">
                    <span className='text-purple-600 dark:text-purple-400'>Fabric</span><span className='text-pink-500 dark:text-pink-400'>Pulse</span>
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-neutral-800 dark:text-white font-medium">
                <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Home</Link>
                <Link to="/about-us" className="hover:text-purple-600 dark:hover:text-purple-400 transition">About Us</Link>
                <Link to="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Contact Us</Link>
                <Link to="/all-products" className="hover:text-purple-600 dark:hover:text-purple-400 transition">All Products</Link>

                {user && (
                    <>
                        <div className="flex items-center gap-8 text-neutral-800 dark:text-white font-medium">
                            <Link to="/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Dashboard</Link>
                        </div>
                        <Link to="/profile">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                referrerPolicy="no-referrer"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-purple-500 dark:border-purple-400 hover:scale-105 transition"
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
                        className="btn btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600 text-white"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="btn btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600 text-white"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none text-neutral-800 dark:text-white">
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
                <div className="md:hidden absolute top-20 left-0 right-0 bg-purple-50 dark:bg-neutral-800 border-b border-purple-100 dark:border-neutral-700 flex flex-col gap-4 px-6 py-4 shadow-lg">
                    <Link to="/" className="text-neutral-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition">Home</Link>
                    <Link to="/all-products" className="text-neutral-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition">All Products</Link>
                    <Link to="/about-us" className="text-neutral-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition">About Us</Link>
                    <Link to="/contact" className="text-neutral-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition">Contact Us</Link>

                    {user && (
                        <>
                            <Link to="/dashboard" className="text-neutral-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition">Dashboard</Link>
                            <Link to="/profile" className="flex items-center gap-2 text-neutral-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-purple-500 dark:border-purple-400"
                                />
                                Profile
                            </Link>
                        </>
                    )}

                    {/* Theme Toggle */}
                    <label className="flex gap-2 items-center text-neutral-800 dark:text-white">
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
                            className="btn btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600 text-white w-full"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600 text-white w-full"
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
