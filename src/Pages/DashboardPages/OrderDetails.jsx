import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Order Details | FabricPulse";
    }, []);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get(`/order-details/${id}`, {
                headers: { 'Cache-Control': 'no-cache' }
            });
            setOrder(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load order');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) return <p className="text-center py-10">Loading order...</p>;
    if (error) return <p className="text-center py-10 text-error">{error}</p>;
    if (!order) return <p className="text-center py-10">Order not found</p>;

    return (
        <div className="p-6">
            <div className="flex gap-2 mb-4">
                <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline">
                    ← Back
                </button>
                <button onClick={fetchOrder} className="btn btn-sm btn-info">
                    🔄 Refresh
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Order Details</h2>

            <div className="grid md:grid-cols-2 gap-4 bg-base-100 p-4 rounded-lg border border-base-300">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>User:</strong> {order.userEmail}</p>
                <p><strong>Product:</strong> {order.productTitle}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total Price:</strong> ৳ {order.totalPrice}</p>
                <p><strong>Payment:</strong> {order.payment}</p>

                <p>
                    <strong>Status:</strong>{' '}
                    <span className={`badge ${order.status === 'approved'
                        ? 'badge-success'
                        : order.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}>
                        {order.status}
                    </span>
                </p>

                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default OrderDetails;
