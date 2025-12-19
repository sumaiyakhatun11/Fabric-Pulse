import axios from 'axios';
import React, { use, useContext, useState } from 'react';
import { Await } from 'react-router';
// import useAxios from '../../Hooks/Hooks';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddProducts = () => {
    const { user } = useContext(AuthContext);

    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const moq = form.moq.value;
        const images = form.images.files;
        const video = form.video.value;
        const payment = form.payment.value;
        const showHome = form.showHome.checked;
        const managerEmail = user?.email;

        const imageFiles = images[0];


        const res = await axios.post(`https://api.imgbb.com/1/upload?key=340264134d4ce4fbd41c69a2d6d23243`, { image: imageFiles }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const productImagesUrl = res.data.data.display_url;
        console.log(res.data);


        const formData = {
            name,
            title,
            description,
            category,
            price: parseInt(price),
            quantity: parseInt(quantity),
            moq: parseInt(moq),
            productImagesUrl,
            video,
            payment,
            showHome,
            managerEmail
        }

        if (!res.data.success) {
            alert('Failed to upload images');
            return;
        }
        else {
            axiosSecure.post('/products', formData)
                .then(response => {
                    console.log('Product added:', response.data);
                    alert('Product added successfully');
                    form.reset();
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                    alert('Error adding product');
                });
        }



    };




    return (

        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Product Name / Title"
                    className="w-full border p-2 rounded"

                    required
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    className="w-full border p-2 rounded"
                    rows={4}

                    required
                />

                <select
                    name="category"
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
                    placeholder="Price"
                    className="w-full border p-2 rounded"

                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Available Quantity"
                    className="w-full border p-2 rounded"

                    required
                />

                <input
                    type="number"
                    name="moq"
                    placeholder="Minimum Order Quantity (MOQ)"
                    className="w-full border p-2 rounded"

                    required
                />

                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    className="w-full"
                />

                <input
                    type="url"
                    name="video"
                    placeholder="Demo Video Link (optional)"
                    className="w-full border p-2 rounded"

                />

                <select
                    name="payment"
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

export default AddProducts;