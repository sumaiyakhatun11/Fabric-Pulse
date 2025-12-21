import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const BuyerLandingPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        myOrders: 0,
        pendingOrders: 0,
        approvedOrders: 0,
        shippedOrders: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [isSuspended, setIsSuspended] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBuyerStats = async () => {
        try {
            setLoading(true);
            setError('');

            if (!user?.email) {
                setLoading(false);
                return;
            }

            console.log('Fetching stats for buyer:', user.email);

            // Fetch user status
            try {
                const userRes = await axiosSecure.get(`/user/${user.email}`);
                if (userRes.data?.status === 'suspended') {
                    setIsSuspended(true);
                } else {
                    setIsSuspended(false);
                }
            } catch (err) {
                console.warn('Failed to fetch user status', err);
            }

            // Fetch all orders for this user - try multiple endpoints
            let orders = [];

            // Try endpoint 1: /orders?userEmail=
            try {
                console.log('Trying /orders?userEmail=' + user.email);
                const ordersRes = await axiosSecure.get(`/orders?userEmail=${user.email}`);
                orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                console.log('Got orders from /orders?userEmail=:', orders.length);
            } catch (err1) {
                console.warn('Failed with /orders?userEmail=', err1);

                // Try endpoint 2: /orders?email=
                try {
                    console.log('Trying /orders?email=' + user.email);
                    const ordersRes = await axiosSecure.get(`/orders?email=${user.email}`);
                    orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                    console.log('Got orders from /orders?email=:', orders.length);
                } catch (err2) {
                    console.warn('Failed with /orders?email=', err2);

                    // Try endpoint 3: /my-orders
                    try {
                        console.log('Trying /my-orders');
                        const ordersRes = await axiosSecure.get(`/my-orders`);
                        orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                        console.log('Got orders from /my-orders:', orders.length);
                    } catch (err3) {
                        console.warn('Failed with /my-orders', err3);

                        // Try endpoint 4: Get all orders and filter client-side
                        try {
                            console.log('Trying /orders (all) and filtering');
                            const ordersRes = await axiosSecure.get(`/orders`);
                            const allOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                            orders = allOrders.filter(o =>
                                o.userEmail?.toLowerCase() === user.email?.toLowerCase() ||
                                o.email?.toLowerCase() === user.email?.toLowerCase()
                            );
                            console.log('Got orders from /orders (filtered):', orders.length);
                        } catch (err4) {
                            console.error('All fetch attempts failed', err4);
                            setError('Failed to load your orders');
                        }
                    }
                }
            }

            // Calculate stats
            const myOrders = orders.length;
            const pendingOrders = orders.filter(o => o.status === 'pending').length;
            const approvedOrders = orders.filter(o => o.status === 'approved').length;
            const shippedOrders = orders.filter(o => o.status === 'shipped').length;

            console.log('Calculated stats:', { myOrders, pendingOrders, approvedOrders, shippedOrders });

            setStats({
                myOrders,
                pendingOrders,
                approvedOrders,
                shippedOrders,
            });

            // Set recent orders (last 5), sorted by date
            const sorted = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentOrders(sorted.slice(0, 5));

        } catch (error) {
            console.error('Failed to fetch buyer stats', error);
            setError('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuyerStats();
    }, [axiosSecure, user?.email]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (user?.email) {
                fetchBuyerStats();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [axiosSecure, user?.email]);

    if (loading && stats.myOrders === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl mb-4">Loading your dashboard...</p>
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Header Section */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-5xl font-bold mb-2">
                        👋 Welcome, {user?.displayName || user?.email?.split('@')[0] || 'Buyer'}
                    </h1>
                    <p className="text-gray-600 text-lg">Track your garment orders easily</p>
                </div>
                <button
                    onClick={fetchBuyerStats}
                    disabled={loading}
                    className="btn btn-sm btn-outline"
                >
                    🔄 {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-8 rounded">
                    <p className="font-bold">⚠️ {error}</p>
                </div>
            )}

            {/* Suspension Alert */}
            {isSuspended && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
                    <div>
                        <p className="font-bold text-lg">⚠️ Your account is suspended</p>
                        <p className="text-sm mt-2">You cannot place new orders</p>
                        <p className="text-sm">You can still view existing orders</p>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[{
                        title: 'My Orders',
                        value: stats.myOrders,
                        helper: 'Orders placed',
                        colors: 'from-blue-500 to-blue-600',
                        icon: '📦'
                    }, {
                        title: 'Pending Orders',
                        value: stats.pendingOrders,
                        helper: 'Awaiting approval',
                        colors: 'from-yellow-500 to-yellow-600',
                        icon: '⏳'
                    }, {
                        title: 'Approved Orders',
                        value: stats.approvedOrders,
                        helper: 'Ready to ship',
                        colors: 'from-green-500 to-green-600',
                        icon: '✅'
                    }, {
                        title: 'Shipped Orders',
                        value: stats.shippedOrders,
                        helper: 'On the way',
                        colors: 'from-purple-500 to-purple-600',
                        icon: '🚚'
                    }].map(card => (
                        <div
                            key={card.title}
                            className={`bg-gradient-to-br ${card.colors} text-white p-6 rounded-xl shadow-md`}
                        >
                            <div className="text-4xl mb-2">{card.icon}</div>
                            <p className="text-sm font-semibold opacity-80">{card.title}</p>
                            <h3 className="text-4xl font-bold mt-1">{card.value}</h3>
                            <p className="text-xs opacity-80 mt-1">{card.helper}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/dashboard/my-orders"
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition text-center"
                    >
                        <p className="text-5xl mb-3">📦</p>
                        <h3 className="text-xl font-bold">My Orders</h3>
                    </Link>

                    <Link
                        to="/dashboard/my-tracking"
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition text-center"
                    >
                        <p className="text-5xl mb-3">🚚</p>
                        <h3 className="text-xl font-bold">Track Order</h3>
                    </Link>

                    <Link
                        to="/profile"
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition text-center"
                    >
                        <p className="text-5xl mb-3">👤</p>
                        <h3 className="text-xl font-bold">My Profile</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BuyerLandingPage;
