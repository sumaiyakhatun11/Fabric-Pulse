import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddTracking = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [form, setForm] = useState({
        status: '',
        location: '',
        note: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.status) {
            alert('Status is required', 'error');
            return;
        }

        try {
            await axiosSecure.post('/tracking', {
                orderId,
                ...form
            });

            alert('Tracking added successfully', 'success');
            navigate(`/dashboard/view-tracking/${orderId}`);
        } catch (err) {
            console.error(err);
            alert('Failed to add tracking', 'error');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Tracking Update</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Status */}
                <select
                    name="status"
                    className="select select-bordered w-full"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="">Select Status</option>
                    <option>Cutting Completed</option>
                    <option>Sewing Started</option>
                    <option>Finishing</option>
                    <option>QC Checked</option>
                    <option>Packed</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                </select>

                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="Location (optional)"
                    className="input input-bordered w-full"
                    value={form.location}
                    onChange={handleChange}
                />

                {/* Note */}
                <textarea
                    name="note"
                    placeholder="Additional note"
                    className="textarea textarea-bordered w-full"
                    value={form.note}
                    onChange={handleChange}
                />

                <button className="btn btn-success w-full">
                    Save Tracking
                </button>
            </form>
        </div>
    );
};

export default AddTracking;
