import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const ManagerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        myProducts: 0,
        pendingOrders: 0,
        approvedOrders: 0,
        totalSalesQty: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [isSuspended, setIsSuspended] = useState(false);
    const [suspensionReason, setSuspensionReason] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch data function
    const fetchManagerStats = async () => {
        try {
            setLoading(true);
            setError('');

            if (!user?.email) {
                setLoading(false);
                return;
            }

            // Fetch manager status
            const userRes = await axiosSecure.get(`/user/${user.email}`);
            if (userRes.data?.status === 'suspended') {
                setIsSuspended(true);
                setSuspensionReason(userRes.data?.suspensionReason || 'Violation of policy');
            } else {
                setIsSuspended(false);
            }

            // Fetch manager's products
            let products = [];
            try {
                const productsRes = await axiosSecure.get(`/manager/products/${user.email}`);
                products = Array.isArray(productsRes.data) ? productsRes.data : [];
            } catch (err) {
                console.warn('Failed to fetch manager products, trying fallback');
                try {
                    const productsRes = await axiosSecure.get(`/products?managerEmail=${user.email}`);
                    products = Array.isArray(productsRes.data) ? productsRes.data : [];
                } catch (err2) {
                    console.error('Products fetch failed completely', err2);
                }
            }

            // Fetch manager's orders (from their products)
            let orders = [];
            try {
                const ordersRes = await axiosSecure.get(`/orders?managerEmail=${user.email}`);
                orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
            } catch (err) {
                console.warn('Failed to fetch manager orders, trying fallback');
                try {
                    const ordersRes = await axiosSecure.get(`/orders`);
                    orders = Array.isArray(ordersRes.data)
                        ? ordersRes.data.filter(o => o.managerEmail === user.email)
                        : [];
                } catch (err2) {
                    console.error('Orders fetch failed completely', err2);
                }
            }

            // Calculate stats
            const myProducts = products.length;
            const pendingOrders = orders.filter(o => o.status === 'pending').length;
            const approvedOrders = orders.filter(o => o.status === 'approved').length;
            const totalSalesQty = orders.reduce((sum, o) => sum + (o.quantity || 0), 0);

            setStats({
                myProducts,
                pendingOrders,
                approvedOrders,
                totalSalesQty,
            });

            // Set recent orders (last 10), sorted by date
            const sorted = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentOrders(sorted.slice(0, 10));

        } catch (error) {
            console.error('Failed to fetch manager stats', error);
            setError('Failed to load dashboard data. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        fetchManagerStats();
    }, [axiosSecure, user?.email]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (user?.email) {
                fetchManagerStats();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [axiosSecure, user?.email]);

    if (loading && stats.myProducts === 0 && recentOrders.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-xl mb-4">Loading dashboard...</p>
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Welcome Section */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        👋 Welcome, {user?.displayName || 'Manager'}
                    </h1>
                    <p className="text-gray-600">Manage products & approve orders efficiently</p>
                </div>
                <button
                    onClick={fetchManagerStats}
                    disabled={loading}
                    className="btn btn-sm btn-outline"
                    title="Refresh dashboard data"
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
                    <div className="flex items-center">
                        <p className="text-2xl mr-3">⚠️</p>
                        <div>
                            <p className="font-bold">Your account is suspended</p>
                            <p className="text-sm">Reason: {suspensionReason}</p>
                            <p className="text-sm">You cannot add products or approve orders</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* My Products */}
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">My Products</p>
                            <h2 className="text-4xl font-bold">{stats.myProducts}</h2>
                        </div>
                        <div className="text-5xl opacity-30">📦</div>
                    </div>
                    <Link to="/dashboard/manage-product" className="text-xs opacity-75 hover:opacity-100 mt-2 block">
                        View products →
                    </Link>
                </div>

                {/* Pending Orders */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Pending Orders</p>
                            <h2 className="text-4xl font-bold">{stats.pendingOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">⏳</div>
                    </div>
                    <Link to="/dashboard/pending-orders" className="text-xs opacity-75 hover:opacity-100 mt-2 block">
                        Review pending →
                    </Link>
                </div>

                {/* Approved Orders */}
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Approved Orders</p>
                            <h2 className="text-4xl font-bold">{stats.approvedOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">✅</div>
                    </div>
                    <Link to="/dashboard/approved-orders" className="text-xs opacity-75 hover:opacity-100 mt-2 block">
                        View approved →
                    </Link>
                </div>

                {/* Total Sales Qty */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Total Sales Qty</p>
                            <h2 className="text-4xl font-bold">{stats.totalSalesQty}</h2>
                        </div>
                        <div className="text-5xl opacity-30">📈</div>
                    </div>
                    <p className="text-xs opacity-75 mt-2">Units sold across all orders</p>
                </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link
                    to={isSuspended ? '#' : '/dashboard/add-product'}
                    onClick={(e) => isSuspended && e.preventDefault()}
                    className={`p-6 rounded-lg shadow-lg transition text-center ${isSuspended
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-xl'
                        }`}
                >
                    <p className="text-5xl mb-3">➕</p>
                    <h3 className="text-lg font-bold">Add New Product</h3>
                    <p className="text-sm opacity-90 mt-2">Create a new product</p>
                </Link>

                <Link
                    to="/dashboard/pending-orders"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-lg shadow-lg transition text-center hover:shadow-xl"
                >
                    <p className="text-5xl mb-3">⏳</p>
                    <h3 className="text-lg font-bold">Pending Orders</h3>
                    <p className="text-sm opacity-90 mt-2">Approve orders ({stats.pendingOrders})</p>
                </Link>

                <Link
                    to="/dashboard/approved-orders"
                    className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-lg transition text-center hover:shadow-xl"
                >
                    <p className="text-5xl mb-3">✅</p>
                    <h3 className="text-lg font-bold">Approved Orders</h3>
                    <p className="text-sm opacity-90 mt-2">View approved ({stats.approvedOrders})</p>
                </Link>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Recent Orders</h2>
                    <p className="text-xs text-gray-500">Last 10 orders • Auto-refreshes every 30s</p>
                </div>
                {recentOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        {loading ? '📦 Loading your orders...' : 'No orders yet. Your orders will appear here.'}
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Product</th>
                                    <th className="p-3">Qty</th>
                                    <th className="p-3">Total Price</th>
                                    <th className="p-3">User Email</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order._id}>
                                        <td className="p-3 font-mono text-sm">{order._id?.slice(0, 8)}...</td>
                                        <td className="p-3 truncate max-w-xs">{order.productTitle}</td>
                                        <td className="p-3">{order.quantity}</td>
                                        <td className="p-3 font-semibold">৳ {order.totalPrice}</td>
                                        <td className="p-3 text-sm truncate max-w-xs">{order.userEmail}</td>
                                        <td className="p-3">
                                            <span
                                                className={`badge ${order.status === 'pending'
                                                    ? 'badge-warning'
                                                    : order.status === 'approved'
                                                        ? 'badge-success'
                                                        : order.status === 'shipped'
                                                            ? 'badge-info'
                                                            : 'badge-secondary'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <Link
                                                to={`/dashboard/order/${order._id}`}
                                                className="btn btn-xs btn-primary"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerDashboard;
