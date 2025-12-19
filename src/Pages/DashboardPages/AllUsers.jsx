import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const AllUsers = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    // Fetch all users
    useEffect(() => {
        if (!user || loading) return;

        axiosSecure.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err.response?.data || err.message));
    }, [user, loading, axiosSecure]);

    // Update user role
    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await axiosSecure.put(`/users/role/${userId}`, { role: newRole });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
            showToast(`Role updated to ${newRole}`, 'success');
        } catch (error) {
            showToast('Failed to update role', 'error');
        }
    };

    // Approve or Suspend user
    const handleStatusChange = async (userId, newStatus) => {
        try {
            const res = await axiosSecure.put(`/users/status/${userId}`, { status: newStatus });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
            showToast(`Status changed to ${newStatus}`, 'success');
        } catch (error) {
            showToast('Failed to update status', 'error');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} className="text-center border-b">
                                <td className="px-4 py-2">{u.name}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    >
                                        <option value="buyer">Buyer</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    {u.status}
                                </td>
                                <td className="px-4 py-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleStatusChange(u._id, 'approved')}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(u._id, 'suspended')}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Suspend
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
