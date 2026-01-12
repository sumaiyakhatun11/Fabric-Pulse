import React, { useEffect, useState } from 'react';
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
        <section className='w-full lg:w-11/12 mx-auto mb-20 px-9'>

        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Products</h2>

            {products.length === 0 ? (
                <p className="text-center">No products available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-base-100 border border-base-200 shadow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-purple-400 cursor-pointer"
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

                                <div className="text-center mt-4">
                                    <Link to={`/product/${product._id}`} className=" text-purple-700 px-5 py-3  font-bold hover:bg-purple-100 rounded-lg inline-block">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </section>

        
    );
};

export default ProductsSection;
