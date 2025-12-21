import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxios from '../../Hooks/Hooks';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();

    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        quantity: 0,
        contactNumber: '',
        deliveryAddress: '',
        notes: '',
    });
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch product
    useEffect(() => {
        axiosSecure.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id, axiosSecure]);

    // Set default quantity = MOQ
    useEffect(() => {
        if (product) {
            setFormData(prev => ({
                ...prev,
                quantity: Number(product.moq),
            }));
        }
    }, [product]);

    // Calculate total price
    useEffect(() => {
        if (product && formData.quantity > 0) {
            setTotalPrice(Number(formData.quantity) * Number(product.price));
        } else {
            setTotalPrice(0);
        }
    }, [formData.quantity, product]);

    if (!product) return <p className="text-center py-10">Loading...</p>;

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    const isQuantityValid =
        formData.quantity >= product.moq &&
        formData.quantity <= product.quantity;

    // Handle Stripe payment
    const handlePayment = async () => {
        if (!totalPrice || totalPrice <= 0) {
            return alert("Invalid total amount");
        }

        try {
            const res = await axiosInstance.post('/create-payment-checkout', {
                productName: product.title,
                price: totalPrice, // must be a number
            });

            if (res.data.url) {
                window.location.href = res.data.url; // redirect to Stripe checkout
            }
        } catch (err) {
            console.error('Payment initiation failed:', err);
            alert('Payment initiation failed. Please try again.');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!isQuantityValid) return;

        const orderData = {
            userEmail: user.email,
            productId: product._id,
            productTitle: product.title,
            price: Number(product.price),
            quantity: Number(formData.quantity),
            totalPrice: totalPrice,
            payment: product.payment,
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.contactNumber,
            deliveryAddress: formData.deliveryAddress,
            notes: formData.notes,
            status: 'pending',
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post('/orders', orderData);

            if (product.payment === 'payfirst') {
                handlePayment();
            } else {
                navigate('/my-orders');
            }
        } catch (error) {
            console.error('Order submission failed:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Booking Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg w-full">
                {/* Read-only fields */}
                <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
                <input type="text" value={product.title} readOnly className="input input-bordered w-full" />
                <input type="text" value={`Price: $${Number(product.price)}`} readOnly className="input input-bordered w-full" />

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
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />

                {!isQuantityValid && (
                    <p className="text-sm text-red-500">
                        Quantity must be between {product.moq} and {product.quantity}
                    </p>
                )}

                <input
                    type="text"
                    value={`Total Price: ৳ ${totalPrice}`}
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
                    className="textarea textarea-bordered w-full"
                />

                <textarea
                    name="notes"
                    placeholder="Additional Notes / Instructions"
                    value={formData.notes}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />

                <button
                    type="submit"
                    disabled={!isQuantityValid}
                    className={`btn w-full mt-4 ${isQuantityValid ? 'btn-primary' : 'btn-disabled'}`}
                >
                    {product.payment === 'payfirst' ? 'Pay Now' : 'Order Now'}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
