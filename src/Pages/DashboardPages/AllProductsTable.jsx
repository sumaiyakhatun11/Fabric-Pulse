import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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

    // Pagination logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

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
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">All Products</h2>
                <div className="badge badge-primary badge-lg bg-purple-600 border-purple-600">
                    Total: {products.length}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-info bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700">
                    <span className="text-blue-800 dark:text-blue-200">No products available.</span>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-neutral-800 rounded-lg shadow border border-neutral-200 dark:border-neutral-700">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-neutral-100 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
                                <th className="text-neutral-900 dark:text-white">#</th>
                                <th className="text-neutral-900 dark:text-white">Image</th>
                                <th className="text-neutral-900 dark:text-white">Product Name</th>
                                <th className="text-neutral-900 dark:text-white">Category</th>
                                <th className="text-neutral-900 dark:text-white">Price (৳)</th>
                                <th className="text-neutral-900 dark:text-white">Available Qty</th>
                                <th className="text-neutral-900 dark:text-white">Manager Email</th>
                                <th className="text-neutral-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((product, index) => (
                                <tr key={product._id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                    <td className="text-neutral-700 dark:text-neutral-300">{startIndex + index + 1}</td>
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
                                    <td className="font-semibold text-neutral-900 dark:text-white">{product.name}</td>
                                    <td>
                                        <span className="badge badge-ghost bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-200">{product.category}</span>
                                    </td>
                                    <td className="font-medium text-neutral-900 dark:text-white">৳{product.price}</td>
                                    <td>
                                        <span className={`badge ${product.quantity > 0 ? 'badge-success' : 'badge-error'}`}>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className="text-sm text-neutral-600 dark:text-neutral-400">{product.managerEmail || 'N/A'}</td>
                                    <td>
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 border-purple-600"
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
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    Previous
                </button>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-primary bg-purple-600 border-purple-600' : 'btn-outline text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    Next
                </button>
            </div>
            )}
        </div>
    );
};

export default AllProductsTable;
