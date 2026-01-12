import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { showToast } from '../../Shared/toast';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const LoginPage = () => {
    const { login, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const fillDemoCredentials = (userType) => {
        if (userType === 'admin') {
            setEmail('admin@gmail.com');
            setPassword('Admin321');
        } else if (userType === 'manager') {
            setEmail('manager@gmail.com');
            setPassword('Manager321');
        }
    }

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
                `https://febricpulse.vercel.app/users/email/${user.email}`
            );

            if (!res.data) {
                await axios.post('https://febricpulse.vercel.app/users', userInfo);
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
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Forgot password removed */}
                    </div>

                    {/* Demo Credentials */}
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg border border-neutral-300 dark:border-neutral-700">
                        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Demo Credentials:</p>
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials('admin')}
                                className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none"
                            >
                                👨‍💼 Admin Login
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials('manager')}
                                className="btn btn-sm bg-pink-600 hover:bg-pink-700 text-white border-none"
                            >
                                👔 Manager Login
                            </button>
                        </div>
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