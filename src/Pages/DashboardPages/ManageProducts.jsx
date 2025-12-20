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

    // Fetch products
    useEffect(() => {
        if (!user?.email) return;

        axiosInstance
            .get(`/manager/products/${user.email}`)
            .then(res => {
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
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map(product => (
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
        </div>
    );
};

export default ManageProducts;
