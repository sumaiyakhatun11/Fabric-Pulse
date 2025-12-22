import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { showToast } from '../../Shared/toast';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const LoginPage = () => {
    const { login, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                showToast(`${errorCode} - ${errorMessage}`, 'error')
            });

    }

    const handleContinueWithGoogle = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: 'buyer',
                status: 'pending',

            };

            // check if user already exists in DB
            const res = await axios.get(
                `http://localhost:3000/users/email/${user.email}`
            );

            if (!res.data) {
                await axios.post('http://localhost:3000/users', userInfo);
            }

            showToast('Login successful', 'success');
            navigate('/');

        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    useEffect(() => {
        document.title = "Login | Game Portal";
    }, []);
    return (

        <div className="hero bg-base-200 min-h-screen flex items-center justify-center">


            <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
                <h1 className="font-semibold text-2xl text-center mb-4">
                    Log in to Your Account
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            name='password'
                        />
                        {/* Forgot password removed */}
                    </div>

                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-neutral w-full">
                            Login
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
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-secondary font-semibold"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;