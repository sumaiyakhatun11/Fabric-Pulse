import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/Hooks';
import { AuthContext } from '../../Provider/AuthProvider';

const ManageProducts = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "Manage Products | FabricPulse";
    }, []);

    // Fetch products
    useEffect(() => {
        if (!user?.email) return;

        axiosInstance
            .get(`/manager/products/${user.email}`)
            .then(res => {
                console.log(res.data);

                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosInstance, user?.email]);

    // Delete product
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (!confirm) return;

        axiosInstance.delete(`/manager/product/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setProducts(products.filter(product => product._id !== id));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Search filter
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    if (loading) {
        return <p className="text-center mt-10">Loading products...</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by name or category"
                className="input input-bordered w-full max-w-md mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            paginatedProducts.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.productImagesUrl}
                                            alt={product.title}
                                            className="w-12 h-12 rounded"
                                        />
                                    </td>

                                    <td>
                                        <p className="font-semibold">{product.title}</p>
                                        <p className="text-sm opacity-60">{product.category}</p>
                                    </td>

                                    <td>৳ {product.price}</td>

                                    <td className="capitalize">{product.payment}</td>

                                    <td className="space-x-2">
                                        <button
                                            onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                                            className="btn bg-green-500 hover:bg-green-600 p-3"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn bg-red-500 hover:bg-red-600 p-3"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-outline"
                    >
                        Previous
                    </button>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-outline"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
