import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        quantity: 0,
        contactNumber: '',
        deliveryAddress: '',
        notes: ''
    });
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch product details
    useEffect(() => {
        axiosSecure.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id, axiosSecure]);

    // Set default quantity to minimum order after product loads
    useEffect(() => {
        if (product) {
            setFormData(prev => ({
                ...prev,
                quantity: product.moq
            }));
        }
    }, [product]);

    // Update total price whenever quantity changes
    useEffect(() => {
        if (product && formData.quantity > 0) {
            setTotalPrice(formData.quantity * product.price);
        } else {
            setTotalPrice(0);
        }
    }, [formData.quantity, product]);

    if (!product) return <p>Loading...</p>;

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (formData.quantity < product.moq) {
            return alert(`Minimum order quantity is ${product.moq}`);
        }

        if (formData.quantity > product.quantity) {
            return alert('Order quantity exceeds available stock');
        }

        const orderData = {
            userEmail: user.email,
            productId: product._id,
            productTitle: product.title,
            price: product.price,
            quantity: formData.quantity,
            totalPrice,
            payment: product.payment,
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.contactNumber,
            deliveryAddress: formData.deliveryAddress,
            notes: formData.notes,
            status: 'pending',
            createdAt: new Date()
        };

        axiosSecure.post('/orders', orderData)
            .then(() => {
                if (product.payment === 'payfirst') {
                    navigate('/payment');
                } else {
                    navigate('/dashboard/my-orders');
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto px-4 py-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Booking Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                {/* Read-only fields */}
                <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    value={product.title}
                    readOnly
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    value={`Price: ৳${product.price}`}
                    readOnly
                    className="input input-bordered w-full"
                />

                {/* Editable fields */}
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    name="quantity"
                    min={product.moq}
                    max={product.quantity}
                    placeholder={`Order Quantity (min ${product.moq})`}
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    value={`Total Price: ৳${totalPrice}`}
                    readOnly
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
                <textarea
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
                <textarea
                    name="notes"
                    placeholder="Additional Notes / Instructions"
                    value={formData.notes}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Submit Order
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
