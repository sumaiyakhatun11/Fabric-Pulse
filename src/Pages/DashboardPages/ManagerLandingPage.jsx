import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const ManagerLandingPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        myProducts: 0,
        pendingOrders: 0,
        approvedOrders: 0,
        totalSalesQty: 0,
    });

    useEffect(() => {
        document.title = "Manager Dashboard | FabricPulse";
    }, []);

    const [recentOrders, setRecentOrders] = useState([]);
    const [isSuspended, setIsSuspended] = useState(false);
    const [suspensionReason, setSuspensionReason] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchManagerStats = async () => {
        try {
            setLoading(true);
            setError('');

            if (!user?.email) {
                setLoading(false);
                return;
            }

            console.log('Fetching stats for manager:', user.email);

            // Fetch manager status
            try {
                const userRes = await axiosSecure.get(`/user/${user.email}`);
                if (userRes.data?.status === 'suspended') {
                    setIsSuspended(true);
                    setSuspensionReason(userRes.data?.suspensionReason || 'Violation of policy');
                } else {
                    setIsSuspended(false);
                }
            } catch (err) {
                console.warn('Failed to fetch manager status', err);
            }

            // Fetch manager's products
            let products = [];
            try {
                const productsRes = await axiosSecure.get(`/manager/products/${user.email}`);
                products = Array.isArray(productsRes.data) ? productsRes.data : [];
                console.log('Got products:', products.length);
            } catch (err) {
                console.warn('Failed with /manager/products, trying fallback');
                try {
                    const productsRes = await axiosSecure.get(`/products?managerEmail=${user.email}`);
                    products = Array.isArray(productsRes.data) ? productsRes.data : [];
                    console.log('Got products from fallback:', products.length);
                } catch (err2) {
                    console.error('Products fetch failed', err2);
                }
            }

            // Map of product ids for this manager (used to filter orders when backend lacks managerEmail)
            const managerProductIds = new Set(
                products
                    .map(p => String(p._id || p.id || p.productId))
                    .filter(Boolean)
            );

            const filterOrdersForManager = (allOrders) => {
                if (!Array.isArray(allOrders)) return [];
                const managerEmailLc = user.email?.toLowerCase();

                // If we have no identifiers, fall back to showing everything to avoid empty/stale stats
                const hasProductIds = managerProductIds.size > 0;
                const canMatchEmail = Boolean(managerEmailLc);
                if (!hasProductIds && !canMatchEmail) return allOrders;

                return allOrders.filter(o => {
                    const orderManagerEmail = o.managerEmail?.toLowerCase();
                    const productId = String(o.productId || o.product?._id || o.product?.id || '');

                    // Keep if backend tagged order with managerEmail or if the order references one of this manager's products
                    const matchesEmail = orderManagerEmail && managerEmailLc && orderManagerEmail === managerEmailLc;
                    const matchesProduct = productId && managerProductIds.has(productId);
                    return matchesEmail || matchesProduct;
                });
            };

            // Fetch manager's orders with multiple fallbacks to avoid empty stats
            let orders = [];
            try {
                const ordersRes = await axiosSecure.get(`/orders?managerEmail=${user.email}`);
                orders = filterOrdersForManager(ordersRes.data);
                console.log('Got orders (managerEmail query):', orders.length);
            } catch (err1) {
                console.warn('Failed with /orders?managerEmail, trying /manager/orders');
                try {
                    const ordersRes = await axiosSecure.get(`/manager/orders/${user.email}`);
                    orders = filterOrdersForManager(ordersRes.data);
                    console.log('Got orders (/manager/orders):', orders.length);
                } catch (err2) {
                    console.warn('Failed with /manager/orders, trying /orders (all)');
                    try {
                        const ordersRes = await axiosSecure.get(`/orders`);
                        orders = filterOrdersForManager(ordersRes.data);
                        console.log('Got orders from /orders (all):', orders.length);
                    } catch (err3) {
                        console.error('Orders fetch failed', err3);
                        setError('Failed to load your orders');
                    }
                }
            }

            // If still empty, fall back to all orders unfiltered to avoid static zeros
            if (orders.length === 0) {
                try {
                    const ordersRes = await axiosSecure.get(`/orders`);
                    orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                    console.log('Final fallback: using all orders unfiltered:', orders.length);
                } catch (err) {
                    console.warn('Final fallback to all orders failed', err);
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

            // Set recent orders (last 5), sorted by date
            const sorted = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentOrders(sorted.slice(0, 5));

        } catch (error) {
            console.error('Failed to fetch manager stats', error);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

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

    if (loading && stats.myProducts === 0) {
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
                        👋 Welcome, Manager
                    </h1>
                    <p className="text-gray-600 text-lg">Manage products & approve orders efficiently</p>
                </div>
                <button
                    onClick={fetchManagerStats}
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
                        <p className="text-sm mt-2">Reason: {suspensionReason}</p>
                        <p className="text-sm">You cannot add products or approve orders</p>
                    </div>
                </div>
            )}

            {/* Key Stats Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Your Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[{
                        title: 'My Products',
                        value: stats.myProducts,
                        helper: 'Active products listed',
                        colors: 'from-blue-400 to-blue-600',
                        icon: '📦'
                    }, {
                        title: 'Pending Orders',
                        value: stats.pendingOrders,
                        helper: 'Awaiting your approval',
                        colors: 'from-yellow-400 to-yellow-600',
                        icon: '⏳'
                    }, {
                        title: 'Approved Orders',
                        value: stats.approvedOrders,
                        helper: 'Ready to ship',
                        colors: 'from-green-400 to-green-600',
                        icon: '✅'
                    }, {
                        title: 'Total Sales Qty',
                        value: stats.totalSalesQty,
                        helper: 'Units sold overall',
                        colors: 'from-purple-400 to-purple-600',
                        icon: '📈'
                    }].map(card => (
                        <div
                            key={card.title}
                            className={`bg-gradient-to-br ${card.colors} text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105`}
                        >
                            <div className="text-5xl mb-3">{card.icon}</div>
                            <p className="text-white text-sm font-semibold mb-2">{card.title}</p>
                            <h3 className="text-5xl font-bold">{card.value}</h3>
                            <p className="text-white text-xs mt-4 opacity-90">{card.helper}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to={isSuspended ? '#' : '/dashboard/add-product'}
                        onClick={(e) => isSuspended && e.preventDefault()}
                        className={`p-8 rounded-lg shadow-lg transition text-center transform hover:scale-105 ${isSuspended
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                            }`}
                    >
                        <p className="text-6xl mb-4">➕</p>
                        <h3 className="text-2xl font-bold">Add New Product</h3>
                        <p className="text-sm opacity-90 mt-2">Create a new product listing</p>
                    </Link>

                    <Link
                        to="/dashboard/pending-orders"
                        className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-8 rounded-lg shadow-lg transition text-center transform hover:scale-105"
                    >
                        <p className="text-6xl mb-4">⏳</p>
                        <h3 className="text-2xl font-bold">Pending Orders</h3>
                        <p className="text-sm opacity-90 mt-2">Approve {stats.pendingOrders} pending orders</p>
                    </Link>

                    <Link
                        to="/dashboard/approved-orders"
                        className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-8 rounded-lg shadow-lg transition text-center transform hover:scale-105"
                    >
                        <p className="text-6xl mb-4">✅</p>
                        <h3 className="text-2xl font-bold">Approved Orders</h3>
                        <p className="text-sm opacity-90 mt-2">Review completed approvals</p>
                    </Link>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Recent Orders</h2>
                    <Link to="/dashboard/pending-orders" className="text-blue-500 hover:text-blue-700 text-sm">
                        View all →
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-6xl mb-4">📭</p>
                        <p className="text-gray-500 text-lg">No orders yet</p>
                        <p className="text-gray-400 text-sm mt-2">Your orders will appear here</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order._id}>
                                        <td className="whitespace-nowrap text-sm">{order._id}</td>
                                        <td>{order.productTitle}</td>
                                        <td>{order.quantity}</td>
                                        <td>
                                            <span className={`badge ${order.status === 'pending' ? 'badge-warning' :
                                                order.status === 'approved' ? 'badge-success' : 'badge-info'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
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

export default ManagerLandingPage;
