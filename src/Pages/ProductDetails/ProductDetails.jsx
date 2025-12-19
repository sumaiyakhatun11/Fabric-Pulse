import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [product, setProduct] = useState(null);
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id, axiosSecure]);

    // Fetch user details from backend
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/email/${user.email}`)
                .then(res => setDbUser(res.data))
                .catch(err => console.error(err));
        }
    }, [user, axiosSecure]);

    if (!product) return <p>Loading...</p>;

    // Show button only for logged-in users who are NOT Admin or Manager
    const canOrder =
        user &&
        dbUser &&
        dbUser.role !== 'admin' &&
        dbUser.role !== 'manager';

    const handleOrderRedirect = () => {
        // Redirect to Booking / Order Form page
        navigate(`/booking/${product._id}`);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <img
                    src={product.productImagesUrl}
                    alt={product.title}
                    className="rounded-lg w-full"
                />

                {/* Product Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-3">{product.title}</h2>
                    <p className="mb-2">{product.description}</p>

                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ৳{product.price}</p>
                    <p><strong>Available:</strong> {product.quantity}</p>
                    <p><strong>Minimum Order:</strong> {product.moq}</p>
                    <p><strong>Payment:</strong> {product.payment}</p>

                    {canOrder ? (
                        <button
                            className="btn btn-primary w-full mt-6"
                            onClick={handleOrderRedirect}
                        >
                            Order / Book Now
                        </button>
                    ) : (
                        <p className="text-red-500 mt-6">
                            Only Buyers (not Admin/Manager) can place orders
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
