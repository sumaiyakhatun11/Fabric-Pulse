import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../Hooks/Hooks';
import { showToast } from '../../Shared/toast';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosInstance
            .get(`/manager/product/${id}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [axiosInstance, id]);

    if (!product) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const moq = form.moq.value;
        const video = form.video.value;
        const payment = form.payment.value;
        const showHome = form.showHome.checked;
        const updatedProduct = {
            title,
            description,
            category,
            price: parseInt(price),
            quantity: parseInt(quantity),
            moq: parseInt(moq),
            video,
            payment,
            showHome
        };

        axiosInstance.put(`manager/updateProduct/${id}`, updatedProduct)
            .then(() => {
                navigate('/dashboard/manage-product');
                showToast('Product updated successfully', 'success');
            })
            .catch(err => {
                console.error(err);
                showToast('Failed to update product', 'error');
            });
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Update Product</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    defaultValue={product.title}
                    placeholder="Product Name / Title"
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="description"
                    defaultValue={product.description}
                    placeholder="Product Description"
                    className="w-full border p-2 rounded"
                    rows={4}
                    required
                />

                <select
                    name="category"
                    defaultValue={product.category}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="shirt">Shirt</option>
                    <option value="pant">Pant</option>
                    <option value="jacket">Jacket</option>
                    <option value="accessories">Accessories</option>
                </select>

                <input
                    type="number"
                    name="price"
                    defaultValue={product.price}
                    placeholder="Price"
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    defaultValue={product.quantity}
                    placeholder="Available Quantity"
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="moq"
                    defaultValue={product.moq}
                    placeholder="Minimum Order Quantity (MOQ)"
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="url"
                    name="video"
                    defaultValue={product.video}
                    placeholder="Demo Video Link (optional)"
                    className="w-full border p-2 rounded"
                />

                <select
                    name="payment"
                    defaultValue={product.payment}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Payment Option</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="payfirst">PayFirst</option>
                </select>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="showHome"
                        defaultChecked={product.showHome}
                    />
                    Show on Home Page
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Save Product
                </button>
            </form>

        </div>
    );
};

export default UpdateProduct;
