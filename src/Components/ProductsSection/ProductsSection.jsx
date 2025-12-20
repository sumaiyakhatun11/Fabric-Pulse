import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ProductsSection = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosSecure.get('/products?limit=6')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Products</h2>

            {products.length === 0 ? (
                <p className="text-center">No products available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={product.productImagesUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-1"><strong>Category:</strong> {product.category}</p>
                                <p className="text-gray-600 mb-1"><strong>Price:</strong> ৳ {product.price}</p>
                                <p className="text-gray-600 mb-4"><strong>Available:</strong> {product.availableQuantity}</p>

                                <Link
                                    to={`/product/${product._id}`}
                                    className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsSection;
