import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        document.title = "All Products | FabricPulse";
    }, []);

    useEffect(() => {
        document.title = "All Products ";

        // Fetch products from backend
        axiosSecure.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    // Client-side search across name and category (case-insensitive)
    const normalized = (value) => (value || '').toString().toLowerCase();
    const filteredProducts = products.filter((product) => {
        const term = normalized(searchTerm);
        if (!term) return true;
        return (
            normalized(product.name).includes(term) ||
            normalized(product.category).includes(term)
        );
    });

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-8 text-center">All Products</h2>

            {products.length === 0 ? (
                <p className="text-center">No products available.</p>
            ) : (
                <>
                    <div className="max-w-2xl mx-auto mb-8">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by product name or category"
                            className="w-full border border-base-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {filteredProducts.length === 0 ? (
                        <p className="text-center">No products match your search.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
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
                                        <p className="text-gray-600 mb-4"><strong>Available:</strong> {product.quantity}</p>

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="btn btn-primary w-full"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllProducts;
