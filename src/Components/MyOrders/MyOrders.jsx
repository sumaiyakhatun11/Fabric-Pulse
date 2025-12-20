import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user orders
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/orders/${user.email}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const handleView = (orderId) => {
        navigate(`/dashboard/order/${orderId}`);
    };

    const handleCancel = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this order?');
        if (!confirmed) return;

        try {
            await axiosSecure.put(`/orders/cancel/${orderId}`);
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'Cancelled' } : o));
        } catch (error) {
            console.error('Cancel order failed:', error);
        }
    };

    if (loading) return <p className="text-center py-10">Loading orders...</p>;

    if (!orders.length) return <p className="text-center py-10">No orders found.</p>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.productTitle}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>
                                <td>{order.payment}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleView(order._id)}
                                        className="btn btn-sm btn-info"
                                    >
                                        View
                                    </button>

                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
