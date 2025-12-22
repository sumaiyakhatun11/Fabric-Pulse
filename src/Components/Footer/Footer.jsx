import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-base-200 border-t border-base-300 ">
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                        <img src={logo} alt="logo" className="h-10 w-10" />
                        <span>FabricPulse</span>
                    </div>
                    <p className="text-sm text-gray-600">Curated products and services crafted for everyday comfort.</p>
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Links</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/all-products" className="hover:text-primary">All Products</Link></li>
                        <li><Link to="/about-us" className="hover:text-primary">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Support</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><a className="hover:text-primary" href="mailto:sumaiyameghla1111@gmail.com">Email support</a></li>
                        <li><a className="hover:text-primary" href="tel:+8801234567890">+880 1234-567890</a></li>
                        <li><span className="text-gray-500">Sat - Thu, 9:00 AM - 6:00 PM</span></li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Stay updated</h3>
                    <p className="text-sm text-gray-600">Get product news and offers.</p>
                    <form className="space-y-2">
                        <input type="email" placeholder="you@example.com" className="input input-bordered w-full" />
                        <button type="button" className="btn btn-primary w-full">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="border-t border-base-300">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-2">
                    <span>© {new Date().getFullYear()} FabricPulse. All rights reserved.</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary">Privacy</a>
                        <a href="#" className="hover:text-primary">Terms</a>
                        <a href="#" className="hover:text-primary">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
