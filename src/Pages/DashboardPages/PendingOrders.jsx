import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import { showToast } from '../../Shared/toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../Hooks/Hooks';

const PendingOrders = () => {
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/pending-orders')
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch pending orders', err);
                setLoading(false);
            });
    }, [axiosSecure])
    const handleApprove = async (id) => {
        if (!window.confirm('Approve this order?')) return;
        try {
            await axiosSecure.put(`/orders/approve/${id}`);
            setOrders(prev => prev.filter(o => o._id !== id));
            showToast('Order approved', 'success');
        } catch (err) {
            console.error('Approve failed', err);
            showToast('Approve failed', 'error');
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm('Reject this order?')) return;
        try {
            await axiosSecure.put(`/rejected-orders/${id}`);
            setOrders(prev => prev.filter(o => o._id !== id));
            showToast('Order rejected', 'success');
        } catch (err) {
            console.error('Reject failed', err);
            showToast('Reject failed', 'error');
        }
    };

    const handleView = (id) => {
        navigate(`/dashboard/order/${id}`);
    };

    if (loading) return <p className="text-center py-10">Loading pending orders...</p>;

    if (!orders.length) return <p className="text-center py-10 text-gray-500">🎉 No pending orders right now</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Pending Orders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Order Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.userEmail}</td>
                                <td>{order.productTitle}</td>
                                <td>{order.quantity}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleView(order._id)} className="btn btn-xs btn-info">View</button>
                                    <button onClick={() => handleApprove(order._id)} className="btn btn-xs btn-success">Approve</button>
                                    <button onClick={() => handleReject(order._id)} className="btn btn-xs btn-error">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingOrders;
