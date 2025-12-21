import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/approved-orders')
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Approved Orders</h2>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Approved Date</th>
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
                            <td>{new Date(order.approvedAt).toLocaleDateString()}</td>
                            <td className="flex gap-2">
                                <a
                                    href={`/dashboard/tracking/${order._id}`}
                                    className="btn btn-xs btn-info"
                                >
                                    View Tracking
                                </a>
                                <a
                                    href={`/dashboard/add-tracking/${order._id}`}
                                    className="btn btn-xs btn-success"
                                >
                                    Add Tracking
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedOrders;
