import React, { useState } from 'react';

const NewsletterCTA = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Get Exclusive Offers & Updates
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Subscribe to our newsletter and receive 10% off your first order
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary font-bold px-8 py-3 rounded-lg"
                        >
                            Subscribe
                        </button>
                    </form>

                    {submitted && (
                        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg">
                            ✅ Thanks for subscribing! Check your email for the discount code.
                        </div>
                    )}

                    <p className="text-blue-100 text-sm mt-6">
                        We respect your privacy. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
