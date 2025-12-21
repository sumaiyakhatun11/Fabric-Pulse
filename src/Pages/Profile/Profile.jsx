import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';
import { useNavigate } from 'react-router';


const Profile = () => {
    const { user, dbUser, updateUserProfile, logOut, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [currentUser, setCurrentUser] = useState(dbUser);
    const [message, setMessage] = useState("");

    // Fetch latest MongoDB user info
    useEffect(() => {
        if (!user?.email) return;
        axiosSecure.get('/users/me')
            .then(res => setCurrentUser(res.data))
            .catch(err => console.error(err));
    }, [user, axiosSecure]);

    const handleUpdateToggle = () => setIsOpen(!isOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(name, photo)
            .then(() => {
                setMessage("Profile updated successfully");
                // Refresh MongoDB user info
                axiosSecure.get('/users/me')
                    .then(res => setCurrentUser(res.data));
            })
            .catch(() => setMessage("Update failed"));
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/login')
                showToast('Logged out', 'success')

            })

            .catch((error) => showToast(String(error), 'error'));

    };

    useEffect(() => {
        document.title = "Profile | Game Hub";
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col items-center">
            <div className="max-w-md mx-auto mt-10 p-6 text-black rounded-lg shadow-lg m-10">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

                {currentUser?.photoURL && (
                    <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || "User Photo"}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                )}

                <p className="mb-2"><strong>Name:</strong> {currentUser?.displayName || user?.displayName || "N/A"}</p>
                <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                <p className="mb-2"><strong>Role:</strong> {currentUser?.role || 'Buyer'}</p>
                <p className="mb-2"><strong>Status:</strong> {currentUser?.status || 'pending'}</p>

                <div className="flex justify-between mt-4 gap-2">
                    <button
                        onClick={handleUpdateToggle}
                        className="bg-gray-800 p-2 rounded-2xl text-white hover:bg-gray-600 w-1/2"
                    >
                        Update Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00] hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {isOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 bg-gray-400 p-6 rounded-lg shadow-md w-80 text-white"
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New Name"
                        className="border w-full p-2 mb-3 rounded-xl"
                        required
                    />

                    <input
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="New Photo URL"
                        className="border w-full p-2 mb-3 rounded-xl"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-800 rounded-2xl text-white p-2 hover:bg-gray-600"
                    >
                        Save Changes
                    </button>

                    {message && <p className="mt-3 text-center">{message}</p>}
                </form>
            )}
        </div>
    );
};

export default Profile;
