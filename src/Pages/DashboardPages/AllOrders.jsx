import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "All Orders | FabricPulse";
    }, []);

    useEffect(() => {
        axiosSecure.get('/orders')
            .then(res => {
                setOrders(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch orders', err);
                setLoading(false);
            });
    }, [axiosSecure]);

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'all' || (order.status || '').toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch = searchTerm === '' ||
            (order.userEmail && order.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.productTitle && order.productTitle.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, searchTerm]);

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'badge-warning',
            approved: 'badge-success',
            shipped: 'badge-info',
            delivered: 'badge-secondary',
            rejected: 'badge-error',
        };
        return badges[status] || 'badge-ghost';
    };

    if (loading) {
        return <p className="text-center py-10">Loading orders...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-white">All Orders</h2>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
                <input
                    type="text"
                    className="input input-bordered w-full md:max-w-md bg-neutral-800 text-white border-neutral-600 placeholder-neutral-500"
                    placeholder="Search by email or product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-40 bg-neutral-800 text-white border-neutral-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                </select>
                <div className="badge badge-primary bg-purple-600 border-purple-600">
                    Total: {filteredOrders.length}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-neutral-800 rounded-lg shadow border border-neutral-700">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-neutral-700 border-neutral-600">
                            <th className="text-white">Order ID</th>
                            <th className="text-white">User Email</th>
                            <th className="text-white">Product</th>
                            <th className="text-white">Qty</th>
                            <th className="text-white">Total Price</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Date</th>
                            <th className="text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-8 text-neutral-400">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            paginatedOrders.map(order => (
                                <tr key={order._id} className="border-neutral-700 hover:bg-neutral-700">
                                    <td className="font-mono text-sm text-neutral-300">{order._id?.slice(0, 8)}...</td>
                                    <td className="text-sm truncate max-w-xs text-neutral-400">{order.userEmail || 'N/A'}</td>
                                    <td className="truncate max-w-xs text-neutral-400">{order.productTitle || 'N/A'}</td>
                                    <td className="text-neutral-400">{order.quantity || 0}</td>
                                    <td className="font-semibold text-white">৳ {order.totalPrice || 0}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(order.status)}`}>
                                            {order.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="text-sm text-neutral-400">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/dashboard/order/${order._id}`}
                                            className="btn btn-sm btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline text-neutral-300 border-neutral-600 hover:bg-neutral-800"
                >
                    Previous
                </button>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-primary bg-purple-600 border-purple-600' : 'btn-outline text-neutral-300 border-neutral-600 hover:bg-neutral-800'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline text-neutral-300 border-neutral-600 hover:bg-neutral-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllOrders;
