import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ProductsSection = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosSecure.get('/products?limit=6&sort=createdAt&order=desc')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : [];
                // Sort by createdAt descending (newest first) and take first 6 as fallback
                const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 6);
                setProducts(sorted);
            })
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Products</h2>

            {products.length === 0 ? (
                <p className="text-center">No products available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-base-100 border border-base-200 shadow rounded-lg overflow-hidden"
                        >
                            <img
                                src={product.productImagesUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-xl mb-2 text-base-content">{product.name}</h3>
                                <p className="text-base-content/70 mb-1"><strong>Category:</strong> {product.category}</p>
                                <p className="text-base-content/70 mb-1"><strong>Price:</strong> ৳ {product.price}</p>
                                <p className="text-base-content/70 mb-4"><strong>Available:</strong> {product.quantity}</p>

                                <Link
                                    to={`/product/${product._id}`}
                                    className="btn btn-primary w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsSection;
