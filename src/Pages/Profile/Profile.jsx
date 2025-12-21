import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Profile = () => {
    const { user, updateUserProfile, logOut } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [role, setRole] = useState(user?.role || "Buyer");
    const [status, setStatus] = useState(user?.status || "pending");
    const [message, setMessage] = useState("");

    const handleUpdate = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateUserProfile(name, photo)
            .then(() => setMessage("Profile updated successfully"))
            .catch(() => setMessage("Update failed"));
    };

    const handleLogout = () => {
        logOut()
            .then(() => showToast('Logged out', 'success'))
            .catch((error) => showToast(String(error), 'error'));
    };

    useEffect(() => {
        document.title = "Profile | Game Hub";
    }, []);

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col items-center">
            <div className="max-w-md mx-auto mt-10 p-6 text-black rounded-lg shadow-lg m-10">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

                {user?.photoURL && (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || "User Photo"}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                )}

                <p className="mb-2"><strong>Name:</strong> {user?.displayName || "N/A"}</p>
                <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                <p className="mb-2"><strong>Role:</strong> {role}</p>
                <p className="mb-2"><strong>Status:</strong> {status}</p>

                <div className="flex justify-between mt-4 gap-2">
                    <button
                        onClick={handleUpdate}
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
