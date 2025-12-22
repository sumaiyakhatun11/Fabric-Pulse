import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const AllUsers = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch all users
    useEffect(() => {
        if (!user || loading) return;

        axiosSecure.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err.response?.data || err.message));
    }, [user, loading, axiosSecure]);

    // Derived filters
    const normalized = (s) => (s || '').toString().toLowerCase();
    const filteredUsers = users.filter(u => {
        const matchesSearch = normalized(u.name).includes(normalized(searchTerm))
            || normalized(u.email).includes(normalized(searchTerm));
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || (u.status || '').toLowerCase() === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Reset to first page on filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, statusFilter]);

    // Pagination logic based on filtered data
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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

    // Suspend modal state
    const [suspendOpen, setSuspendOpen] = useState(false);
    const [suspendUserId, setSuspendUserId] = useState(null);
    const [suspendReason, setSuspendReason] = useState('');
    const [suspendFeedback, setSuspendFeedback] = useState('');

    // Approve or Suspend user
    const handleStatusChange = async (userId, newStatus) => {
        if (newStatus === 'suspended') {
            setSuspendUserId(userId);
            setSuspendReason('');
            setSuspendFeedback('');
            setSuspendOpen(true);
            return;
        }
        try {
            const res = await axiosSecure.put(`/users/status/${userId}`, { status: newStatus });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
            showToast(`Status changed to ${newStatus}`, 'success');
        } catch (error) {
            showToast('Failed to update status', 'error');
        }
    };

    const submitSuspension = async () => {
        if (!suspendUserId) return;
        if (!suspendReason.trim()) {
            showToast('Please provide a suspension reason', 'error');
            return;
        }
        try {
            const res = await axiosSecure.put(`/users/status/${suspendUserId}`, {
                status: 'suspended',
                suspensionReason: suspendReason,
                suspensionFeedback: suspendFeedback,
            });
            setUsers(prev => prev.map(u =>
                u._id === suspendUserId
                    ? { ...u, status: 'suspended', suspensionReason: suspendReason, suspensionFeedback: suspendFeedback }
                    : u
            ));
            showToast('User suspended', 'success');
            setSuspendOpen(false);
            setSuspendUserId(null);
        } catch (error) {
            showToast('Failed to suspend user', 'error');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-4 items-center">
                <input
                    type="text"
                    className="input input-bordered w-full md:max-w-sm"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-40"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <select
                    className="select select-bordered w-full md:w-44"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                </select>
                <div className="badge badge-primary">Total: {filteredUsers.length}</div>
            </div>

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
                        {paginatedUsers.map(u => (
                            <tr key={u._id} className="text-center border-b">
                                <td className="px-4 py-2">{u.name}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2">
                                    {u.role === 'admin' ? (
                                        <span className="badge badge-warning">{u.role}</span>
                                    ) : (
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    )}
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
                        {paginatedUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline"
                >
                    Previous
                </button>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline"
                >
                    Next
                </button>
            </div>

            {/* Suspend Modal */}
            {suspendOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
                        <h3 className="text-xl font-semibold mb-4">Suspend User</h3>
                        <div className="space-y-3">
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Reason</span></div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={suspendReason}
                                    onChange={(e) => setSuspendReason(e.target.value)}
                                    placeholder="e.g., Policy violation, spam, etc."
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Feedback (optional)</span></div>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    value={suspendFeedback}
                                    onChange={(e) => setSuspendFeedback(e.target.value)}
                                    placeholder="Guidance or explanation for the user"
                                />
                            </label>
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button className="btn btn-ghost" onClick={() => setSuspendOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={submitSuspension}>Suspend</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
