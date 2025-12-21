import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        document.title = "All Products - Dashboard";
        fetchProducts();
    }, [axiosSecure]);

    const fetchProducts = () => {
        setLoading(true);
        axiosSecure.get('/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <div className="badge badge-primary badge-lg">
                    Total: {products.length}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-info">
                    <span>No products available.</span>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price (৳)</th>
                                <th>Available Qty</th>
                                <th>Manager Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={product.productImagesUrl}
                                                    alt={product.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{product.name}</td>
                                    <td>
                                        <span className="badge badge-ghost">{product.category}</span>
                                    </td>
                                    <td className="font-medium">৳{product.price}</td>
                                    <td>
                                        <span className={`badge ${product.availableQuantity > 0 ? 'badge-success' : 'badge-error'}`}>
                                            {product.availableQuantity}
                                        </span>
                                    </td>
                                    <td className="text-sm text-gray-600">{product.managerEmail || 'N/A'}</td>
                                    <td>
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllProductsTable;
