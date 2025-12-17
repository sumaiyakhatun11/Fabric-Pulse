import React, { useContext, useEffect, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';
import axios from 'axios';


const RegistrationPage = () => {
    const { setUser, createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    useEffect(() => {
        document.title = "Registration | Game Hub";
    }, []);

    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(e.target)
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo;
        const file = photo.files[0];
        const password = form.password.value;
        const email = form.email.value;
        const role = form.role.value;

        console.log(file);
        // console.log(name, photo, email, password)

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (password.length < 6) {
            showToast('Password must have at least 6 characters', 'error')
            return;
        }
        if (!uppercase.test(password)) {
            showToast('Password must contain an uppercase letter', 'error')
            return;
        }
        if (!lowercase.test(password)) {
            showToast('Password must contain a lowercase letter', 'error')
            return;
        }

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=340264134d4ce4fbd41c69a2d6d23243`, { image: file }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data);

        const photoURL = res.data.data.display_url;

        const formData = {
            name,
            email,
            photoURL,
            password,
            role
        }

        if (!res.data.success) {
            showToast('Failed to upload image', 'error');
            return;
        }
        else {
            createUser(email, password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    //console.log(user)
                    setUser(user)

                    // Update user profile with name and photo
                    updateUserProfile(name, photoURL)
                        .then(() => {
                            navigate('/');
                            showToast('Registration Successful', 'success')

                            axios.post('http://localhost:3000/users', formData)
                                .then(response => {
                                    console.log('User data saved:', response.data);
                                })
                                .catch(error => {
                                    console.error('Error saving user data:', error);
                                });

                        })
                        .catch((error) => {
                            showToast(`Profile update failed: ${error.message}`, 'error')
                            navigate('/');
                        });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    showToast(`${errorCode} - ${errorMessage}`, 'error')
                });
        }

    }

    const handleContinueWithGoogle = () => {
        signInWithGoogle()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                showToast(`${error.code} - ${error.message}`, 'error')
            });


    }




    return (
        <div className="hero bg-base-200 min-h-screen flex items-center justify-center">

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
                <h1 className="font-semibold text-2xl text-center mb-4">
                    Create Your Account
                </h1>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered"
                            name='name'
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="file"
                            placeholder="Photo URL"
                            className="input input-bordered"
                            required
                            name='photo'
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            required
                            name='email'
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Role</label>
                        <select name="role" className="select select-neutral" required>
                            <option value="" disabled>Select Role</option>
                            <option value="Manager">Manager</option>
                            <option value="Buyer">Buyer</option>
                        </select>
                    </div>



                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            required
                            name='password'
                        />
                    </div>

                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-neutral w-full">
                            Register
                        </button>
                    </div>

                </form>

                <button
                    type="button"
                    onClick={handleContinueWithGoogle}
                    className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition font-medium my-3"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-secondary font-semibold"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;