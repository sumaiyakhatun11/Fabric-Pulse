import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const MyTracking = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/orders/${user.email}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const handleViewTracking = (orderId) => {
        navigate(`/dashboard/view-tracking/${orderId}`);
    };



    if (loading) {
        return <p className="text-center py-10">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-center py-10">No orders found.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Track Your Orders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total Price</th>

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

                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleViewTracking(order._id)}
                                        className="btn btn-xs btn-info"
                                    >
                                        View Tracking Details
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTracking;
