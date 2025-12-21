import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const MainDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        activeManagers: 0,
        ordersThisMonth: 0,
        newUsersWeek: 0,
    });

    const [timeFilter, setTimeFilter] = useState('30days'); // today, 7days, 30days
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        orders: [],
        products: [],
        userRoles: []
    });

    // Fetch dashboard statistics
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsRes, ordersRes, usersRes, managersRes, monthOrdersRes, newUsersRes] = await Promise.all([
                    axiosSecure.get('/products'),
                    axiosSecure.get('/orders'),
                    axiosSecure.get('/users'),
                    axiosSecure.get('/users?role=manager'),
                    axiosSecure.get('/orders?thisMonth=true'),
                    axiosSecure.get('/users?newThisWeek=true'),
                ]);

                setStats({
                    totalProducts: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
                    totalOrders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
                    totalUsers: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
                    activeManagers: Array.isArray(managersRes.data) ? managersRes.data.length : 0,
                    ordersThisMonth: Array.isArray(monthOrdersRes.data) ? monthOrdersRes.data.length : 0,
                    newUsersWeek: Array.isArray(newUsersRes.data) ? newUsersRes.data.length : 0,
                });

                // Generate chart data
                generateChartData(ordersRes.data, productsRes.data, usersRes.data, timeFilter);
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [axiosSecure, timeFilter]);

    const generateChartData = (orders, products, users, filterKey) => {
        const filteredOrders = filterByRange(orders, filterKey);
        const filteredProducts = filterByRange(products, filterKey);

        // Orders Over Time
        const ordersOverTime = generateOrdersOverTime(filteredOrders, filterKey);

        // Products Added (by day within filter range)
        const productsAdded = generateProductsAdded(filteredProducts, filterKey);

        // User Role Distribution (Pie chart)
        const userRoles = generateUserRoles(users);

        setChartData({
            orders: ordersOverTime,
            products: productsAdded,
            userRoles: userRoles
        });
    };

    const generateOrdersOverTime = (orders, filterKey) => {
        const buckets = buildDateBuckets(filterKey);

        if (Array.isArray(orders)) {
            orders.forEach(order => {
                if (!order.createdAt) return;
                const orderDate = new Date(order.createdAt);
                const dateStr = formatBucket(orderDate, filterKey);
                if (buckets.hasOwnProperty(dateStr)) {
                    buckets[dateStr]++;
                }
            });
        }

        return Object.entries(buckets).map(([date, count]) => ({
            date,
            orders: count
        }));
    };

    const generateProductsAdded = (products, filterKey) => {
        const buckets = buildDateBuckets(filterKey);

        if (Array.isArray(products)) {
            products.forEach(product => {
                if (!product.createdAt) return;
                const productDate = new Date(product.createdAt);
                const dateStr = formatBucket(productDate, filterKey);
                if (buckets.hasOwnProperty(dateStr)) {
                    buckets[dateStr]++;
                }
            });
        }

        return Object.entries(buckets).map(([date, count]) => ({
            date,
            products: count
        }));
    };

    const filterByRange = (items, filterKey) => {
        if (!Array.isArray(items)) return [];
        const now = new Date();

        return items.filter(item => {
            const created = item.createdAt ? new Date(item.createdAt) : null;
            if (!created) return false;

            const diffMs = now - created;
            const diffDays = diffMs / (1000 * 60 * 60 * 24);

            if (filterKey === 'today') return created.toDateString() === now.toDateString();
            if (filterKey === '7days') return diffDays <= 7;
            return diffDays <= 30; // default 30days
        });
    };

    const buildDateBuckets = (filterKey) => {
        const buckets = {};
        const now = new Date();
        const span = filterKey === 'today' ? 0 : filterKey === '7days' ? 6 : 29;

        for (let i = span; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const label = formatBucket(d, filterKey);
            buckets[label] = 0;
        }

        return buckets;
    };

    const formatBucket = (date, filterKey) => {
        if (filterKey === 'today') {
            return date.toLocaleTimeString('en-US', { hour: 'numeric' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const generateUserRoles = (users) => {
        const roles = { admin: 0, manager: 0, customer: 0 };

        if (Array.isArray(users)) {
            users.forEach(user => {
                const role = user.role || 'customer';
                if (roles.hasOwnProperty(role)) {
                    roles[role]++;
                } else {
                    roles.customer++;
                }
            });
        }

        return [
            { name: 'Admin', value: roles.admin, fill: '#8b5cf6' },
            { name: 'Manager', value: roles.manager, fill: '#3b82f6' },
            { name: 'Customer', value: roles.customer, fill: '#10b981' }
        ];
    };

    const filterLabel = timeFilter === 'today' ? 'Today' : timeFilter === '7days' ? 'Last 7 Days' : 'Last 30 Days';

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">👋 Welcome back, Admin</h1>
                <p className="text-gray-600">Here’s what’s happening in your system today</p>
            </div>

            {/* Chart Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                {[
                    { key: 'today', label: 'Today' },
                    { key: '7days', label: 'Last 7 Days' },
                    { key: '30days', label: 'Last 30 Days' },
                ].map(opt => (
                    <button
                        key={opt.key}
                        onClick={() => setTimeFilter(opt.key)}
                        className={`btn btn-sm ${timeFilter === opt.key ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Total Products */}
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Total Products</p>
                            <h2 className="text-3xl font-bold">{stats.totalProducts}</h2>
                        </div>
                        <div className="text-5xl opacity-30">📦</div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Total Orders</p>
                            <h2 className="text-3xl font-bold">{stats.totalOrders}</h2>
                        </div>
                        <div className="text-5xl opacity-30">📑</div>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Total Users</p>
                            <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
                        </div>
                        <div className="text-5xl opacity-30">👥</div>
                    </div>
                </div>

                {/* Active Managers */}
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Active Managers</p>
                            <h2 className="text-3xl font-bold">{stats.activeManagers}</h2>
                        </div>
                        <div className="text-5xl opacity-30">🤵</div>
                    </div>
                </div>

                {/* Orders This Month */}
                <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Orders This Month</p>
                            <h2 className="text-3xl font-bold">{stats.ordersThisMonth}</h2>
                        </div>
                        <div className="text-5xl opacity-30">📈</div>
                    </div>
                </div>

                {/* New Users (7 days) */}
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">New Users (7 days)</p>
                            <h2 className="text-3xl font-bold">{stats.newUsersWeek}</h2>
                        </div>
                        <div className="text-5xl opacity-30">⭐</div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Orders Over Time */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Orders Over Time ({filterLabel})</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData.orders}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Products Added Over Time */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Products Added ({filterLabel})</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData.products}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="products" fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Role Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4">User Role Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData.userRoles}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.userRoles.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    to="/dashboard/all-users"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg transition text-center"
                >
                    <p className="text-4xl mb-2">👥</p>
                    <h3 className="text-xl font-bold">Manage Users</h3>
                    <p className="text-sm opacity-90 mt-2">View and manage all users</p>
                </Link>

                <Link
                    to="/dashboard/manage-product"
                    className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-lg transition text-center"
                >
                    <p className="text-4xl mb-2">📦</p>
                    <h3 className="text-xl font-bold">All Products</h3>
                    <p className="text-sm opacity-90 mt-2">Manage product inventory</p>
                </Link>

                <Link
                    to="/dashboard/pending-orders"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg shadow-lg transition text-center"
                >
                    <p className="text-4xl mb-2">📑</p>
                    <h3 className="text-xl font-bold">All Orders</h3>
                    <p className="text-sm opacity-90 mt-2">Review pending orders</p>
                </Link>
            </div>
        </div>
    );
};

export default MainDashboard;