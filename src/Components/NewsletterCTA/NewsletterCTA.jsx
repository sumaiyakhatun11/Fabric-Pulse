import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-4xl font-bold text-white mb-4"
                    >
                        Get Exclusive Offers & Updates
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-blue-100 mb-8 text-lg"
                    >
                        Subscribe to our newsletter and receive 10% off your first order
                    </motion.p>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
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
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            className="btn btn-primary font-bold px-8 py-3 rounded-lg"
                        >
                            Subscribe
                        </motion.button>
                    </motion.form>

                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg"
                        >
                            ✅ Thanks for subscribing! Check your email for the discount code.
                        </motion.div>
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
