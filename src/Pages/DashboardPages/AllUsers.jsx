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
            <h2 className="text-2xl font-semibold mb-4 text-white">All Users</h2>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-4 items-center">
                <input
                    type="text"
                    className="input input-bordered w-full md:max-w-sm bg-neutral-800 text-white border-neutral-600 placeholder-neutral-500"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-40 bg-neutral-800 text-white border-neutral-600"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <select
                    className="select select-bordered w-full md:w-44 bg-neutral-800 text-white border-neutral-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                </select>
                <div className="badge badge-primary bg-purple-600 border-purple-600">Total: {filteredUsers.length}</div>
            </div>

            <div className="overflow-x-auto bg-neutral-800 rounded-lg border border-neutral-700">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-neutral-700 border-b border-neutral-600">
                            <th className="px-4 py-2 text-white">Name</th>
                            <th className="px-4 py-2 text-white">Email</th>
                            <th className="px-4 py-2 text-white">Role</th>
                            <th className="px-4 py-2 text-white">Status</th>
                            <th className="px-4 py-2 text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map(u => (
                            <tr key={u._id} className="text-center border-b border-neutral-700 hover:bg-neutral-700">
                                <td className="px-4 py-2 text-neutral-300">{u.name}</td>
                                <td className="px-4 py-2 text-neutral-300">{u.email}</td>
                                <td className="px-4 py-2">
                                    {u.role === 'admin' ? (
                                        <span className="badge badge-warning bg-yellow-600 border-yellow-600">{u.role}</span>
                                    ) : (
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className="border px-2 py-1 rounded bg-neutral-700 text-white border-neutral-600"
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-neutral-300">
                                    {u.status}
                                </td>
                                <td className="px-4 py-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleStatusChange(u._id, 'approved')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(u._id, 'suspended')}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                                    >
                                        Suspend
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {paginatedUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-neutral-400">
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
                    className="btn btn-sm btn-outline text-neutral-300 border-neutral-600 hover:bg-neutral-800"
                >
                    Previous
                </button>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-primary bg-purple-600 border-purple-600' : 'btn-outline text-neutral-300 border-neutral-600 hover:bg-neutral-800'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline text-neutral-300 border-neutral-600 hover:bg-neutral-800"
                >
                    Next
                </button>
            </div>

            {/* Suspend Modal */}
            {suspendOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-neutral-800 rounded-xl p-6 w-full max-w-lg shadow-xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-4 text-white">Suspend User</h3>
                        <div className="space-y-3">
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text text-neutral-300">Reason</span></div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600 placeholder-neutral-500"
                                    value={suspendReason}
                                    onChange={(e) => setSuspendReason(e.target.value)}
                                    placeholder="e.g., Policy violation, spam, etc."
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text text-neutral-300">Feedback (optional)</span></div>
                                <textarea
                                    className="textarea textarea-bordered h-24 bg-neutral-700 text-white border-neutral-600 placeholder-neutral-500"
                                    value={suspendFeedback}
                                    onChange={(e) => setSuspendFeedback(e.target.value)}
                                    placeholder="Guidance or explanation for the user"
                                />
                            </label>
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button className="btn btn-ghost text-neutral-300 hover:bg-neutral-700" onClick={() => setSuspendOpen(false)}>Cancel</button>
                            <button className="btn btn-primary bg-purple-600 border-purple-600 hover:bg-purple-700" onClick={submitSuspension}>Suspend</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
