import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const UserDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        myOrders: 0,
        pendingOrders: 0,
        approvedOrders: 0,
        shippedOrders: 0,
    });

    const [isSuspended, setIsSuspended] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                if (!user?.email) return;

                // Fetch user status
                const userRes = await axiosSecure.get(`/user/${user.email}`);
                if (userRes.data?.status === 'suspended') {
                    setIsSuspended(true);
                }

                // Fetch all orders for this user
                const ordersRes = await axiosSecure.get(`/orders?email=${user.email}`);
                const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

                // Calculate stats
                const myOrders = orders.length;
                const pendingOrders = orders.filter(o => o.status === 'pending').length;
                const approvedOrders = orders.filter(o => o.status === 'approved').length;
                const shippedOrders = orders.filter(o => o.status === 'shipped').length;

                setStats({
                    myOrders,
                    pendingOrders,
                    approvedOrders,
                    shippedOrders,
                });
            } catch (error) {
                console.error('Failed to fetch user stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, [axiosSecure, user?.email]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                    👋 Welcome, {user?.displayName || user?.email?.split('@')[0] || 'Buyer'}
                </h1>
                <p className="text-gray-600">Track your garment orders easily</p>
            </div>

            {/* Suspension Alert */}
            {isSuspended && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
                    <div className="flex items-center">
                        <p className="text-2xl mr-3">⚠️</p>
                        <div>
                            <p className="font-bold">Your account is suspended</p>
                            <p className="text-sm">You cannot place new orders</p>
                            <p className="text-sm">You can still view existing orders</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* My Orders */}
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">My Orders</p>
                            <h2 className="text-4xl font-bold">{stats.myOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">📦</div>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Pending Orders</p>
                            <h2 className="text-4xl font-bold">{stats.pendingOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">⏳</div>
                    </div>
                </div>

                {/* Approved Orders */}
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Approved Orders</p>
                            <h2 className="text-4xl font-bold">{stats.approvedOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">✅</div>
                    </div>
                </div>

                {/* Shipped Orders */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Shipped Orders</p>
                            <h2 className="text-4xl font-bold">{stats.shippedOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">🚚</div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    to="/dashboard/my-orders"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg transition text-center"
                >
                    <p className="text-5xl mb-3">📦</p>
                    <h3 className="text-lg font-bold">My Orders</h3>
                    <p className="text-sm opacity-90 mt-2">View all your orders</p>
                </Link>

                <Link
                    to="/dashboard/my-tracking"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg shadow-lg transition text-center"
                >
                    <p className="text-5xl mb-3">🚚</p>
                    <h3 className="text-lg font-bold">Track Order</h3>
                    <p className="text-sm opacity-90 mt-2">Track your shipments</p>
                </Link>

                <Link
                    to="/profile"
                    className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-lg transition text-center"
                >
                    <p className="text-5xl mb-3">👤</p>
                    <h3 className="text-lg font-bold">My Profile</h3>
                    <p className="text-sm opacity-90 mt-2">Update your profile</p>
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;
