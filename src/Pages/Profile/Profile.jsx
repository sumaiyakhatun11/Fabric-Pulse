import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const Profile = () => {
    const { user, dbUser, updateUserProfile, logOut, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [currentUser, setCurrentUser] = useState(null);
    const [message, setMessage] = useState("");

    // 🔄 Fetch latest MongoDB user data (role, status, etc.)
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get('/users/me')
            .then(res => setCurrentUser(res.data))
            .catch(err => console.error(err));

    }, [user?.email, dbUser, axiosSecure]);

    const handleUpdateToggle = () => setIsOpen(!isOpen);

    const handleSubmit = (e) => {
        e.preventDefault();

        updateUserProfile(name, photo)
            .then(() => {
                setMessage("Profile updated successfully");

                // 🔁 Refresh DB user after update
                return axiosSecure.get('/users/me');
            })
            .then(res => setCurrentUser(res.data))
            .catch(() => setMessage("Update failed"));
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                showToast('Logged out', 'success');
                navigate('/login');
            })
            .catch((error) => showToast(String(error), 'error'));
    };

    useEffect(() => {
        document.title = "Profile | Game Hub";
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col items-center">
            <div className="max-w-md mx-auto mt-10 p-6 text-black rounded-lg shadow-lg m-10 bg-white">
                <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>

                {(currentUser?.photoURL || user?.photoURL) && (
                    <img
                        src={currentUser?.photoURL || user?.photoURL}
                        alt="User"
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                )}

                <p className="mb-2">
                    <strong>Name:</strong> {currentUser?.displayName || user?.displayName || "N/A"}
                </p>

                <p className="mb-2">
                    <strong>Email:</strong> {user?.email}
                </p>

                <p className="mb-2">
                    <strong>Role:</strong> {currentUser?.role || dbUser?.role || 'Buyer'}
                </p>

                <p className="mb-2">
                    <strong>Status:</strong> {currentUser?.status || 'pending'}
                </p>

                {/* 🚫 Suspended message */}
                {currentUser?.status === 'suspended' && (
                    <div className="mt-4 p-4 rounded-lg border border-red-300 bg-red-50">
                        <h3 className="text-lg font-semibold text-red-700">Account Suspended</h3>

                        {currentUser?.suspensionReason && (
                            <p className="mt-2 text-sm">
                                <strong>Reason:</strong> {currentUser.suspensionReason}
                            </p>
                        )}

                        {currentUser?.suspensionFeedback && (
                            <p className="mt-1 text-sm">
                                <strong>Feedback:</strong> {currentUser.suspensionFeedback}
                            </p>
                        )}

                        <p className="mt-2 text-xs text-red-600">
                            You can view your profile and orders, but actions like adding products or booking are restricted.
                        </p>
                    </div>
                )}

                <div className="flex justify-between mt-6 gap-3">
                    <button
                        onClick={handleUpdateToggle}
                        className="bg-gray-800 p-2 rounded-2xl text-white hover:bg-gray-600 w-1/2"
                    >
                        Update Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 p-2 rounded-2xl text-white hover:bg-red-500 w-1/2"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* ✏ Update Form */}
            {isOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 bg-gray-400 p-6 rounded-lg shadow-md w-80 text-white"
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New Name"
                        className="border w-full p-2 mb-3 rounded-xl text-black"
                        required
                    />

                    <input
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="New Photo URL"
                        className="border w-full p-2 mb-3 rounded-xl text-black"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-800 rounded-2xl text-white p-2 hover:bg-gray-600"
                    >
                        Save Changes
                    </button>

                    {message && (
                        <p className="mt-3 text-center text-sm">{message}</p>
                    )}
                </form>
            )}
        </div>
    );
};

export default Profile;
