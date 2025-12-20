import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Payment Successful | FabricPulse";
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="max-w-md w-full bg-base-100 rounded-2xl shadow-lg p-8 text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
                    <p className="text-gray-600">
                        Your order has been placed successfully. We'll send you a confirmation email shortly.
                    </p>
                </div>

                {/* Order Details Info */}
                <div className="bg-base-200 rounded-lg p-4 space-y-2 text-sm">
                    <p className="text-gray-700">
                        <span className="font-semibold">What's next?</span>
                    </p>
                    <ul className="text-left text-gray-600 space-y-1">
                        <li>✓ Confirmation email sent to your inbox</li>
                        <li>✓ Order is being processed</li>
                        <li>✓ Track your order in My Orders section</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                    <Link
                        to="/my-orders"
                        className="btn btn-neutral w-full"
                    >
                        View My Orders
                    </Link>
                    <Link
                        to="/"
                        className="btn btn-outline w-full"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
