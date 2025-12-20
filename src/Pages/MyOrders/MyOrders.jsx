import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/orders/${user.email}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, [user, axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{order.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td>৳ {order.totalPrice}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>
                                        <span className="badge badge-warning">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
