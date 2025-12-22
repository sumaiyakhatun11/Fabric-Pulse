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

    useEffect(() => {
        document.title = "My Orders | FabricPulse";
    }, []);

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
        const confirmed = window.confirm(
            'Are you sure you want to cancel this order?'
        );
        if (!confirmed) return;

        try {
            await axiosSecure.put(`/orders/cancel/${orderId}`);
            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, status: 'cancelled' }
                        : order
                )
            );
        } catch (error) {
            console.error('Cancel failed:', error);
        }
    };

    if (loading) {
        return <p className="text-center py-10">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-center py-10">No orders found.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order._id}</td>
                                <td>{order.productTitle}</td>
                                <td>{order.quantity}</td>
                                <td>৳ {order.totalPrice}</td>
                                <td>{order.payment}</td>
                                <td>
                                    <span
                                        className={`badge ${order.status === 'pending'
                                            ? 'badge-warning'
                                            : 'badge-success'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleView(order._id)}
                                        className="btn btn-xs btn-info"
                                    >
                                        View
                                    </button>

                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            className="btn btn-xs btn-error"
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
