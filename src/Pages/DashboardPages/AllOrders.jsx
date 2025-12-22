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
            <h2 className="text-3xl font-bold mb-6">All Orders</h2>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
                <input
                    type="text"
                    className="input input-bordered w-full md:max-w-md"
                    placeholder="Search by email or product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-40"
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
                <div className="badge badge-primary">
                    Total: {filteredOrders.length}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>Order ID</th>
                            <th>User Email</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-8">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            paginatedOrders.map(order => (
                                <tr key={order._id}>
                                    <td className="font-mono text-sm">{order._id?.slice(0, 8)}...</td>
                                    <td className="text-sm truncate max-w-xs">{order.userEmail || 'N/A'}</td>
                                    <td className="truncate max-w-xs">{order.productTitle || 'N/A'}</td>
                                    <td>{order.quantity || 0}</td>
                                    <td className="font-semibold">৳ {order.totalPrice || 0}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(order.status)}`}>
                                            {order.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="text-sm">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/dashboard/order/${order._id}`}
                                            className="btn btn-sm btn-primary"
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
                    className="btn btn-sm btn-outline"
                >
                    Previous
                </button>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllOrders;
