import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ViewTracking = () => {
    const { order_id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [trackingUpdates, setTrackingUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!order_id) return;

        axiosSecure.get(`/view-tracking/${order_id}`)
            .then(res => {
                setTrackingUpdates(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [order_id, axiosSecure]);

    if (loading) {
        return <p className="text-center py-10">Loading tracking updates...</p>;
    }

    if (!trackingUpdates.length) {
        return <p className="text-center py-10 text-gray-500">No tracking updates yet.</p>;
    }

    const latestIndex = trackingUpdates.length - 1;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-sm btn-outline mb-4"
            >
                ← Back
            </button>

            {/* Header + Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tracking Timeline</h2>

                <Link
                    to={`/dashboard/add-tracking/${order_id}`}
                    className="btn btn-sm btn-success"
                >
                    Update Tracking
                </Link>
            </div>

            <div className="space-y-4">
                {trackingUpdates.map((update, index) => (
                    <div
                        key={update._id}
                        className={`p-4 border rounded-lg ${index === latestIndex
                            ? 'border-success bg-success/10'
                            : 'bg-base-100'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold">{update.status}</p>
                            {index === latestIndex && (
                                <span className="badge badge-success">Latest</span>
                            )}
                        </div>

                        {update.location && (
                            <p><strong>Location:</strong> {update.location}</p>
                        )}

                        {update.note && (
                            <p><strong>Note:</strong> {update.note}</p>
                        )}

                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(update.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewTracking;
