import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
    const features = [
        {
            icon: '🚚',
            title: 'Fast Delivery',
            description: 'Get your orders delivered quickly to your doorstep within 3-5 business days'
        },
        {
            icon: '🛡️',
            title: 'Secure Payment',
            description: 'Your payment information is safe with our encrypted payment system'
        },
        {
            icon: '↩️',
            title: 'Easy Returns',
            description: '30-day easy return policy for all items with no questions asked'
        },
        {
            icon: '👥',
            title: '24/7 Support',
            description: 'Our dedicated customer service team is always ready to help you'
        }
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 text-base-content">Why Choose Us?</h2>
                <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
                    We provide the best shopping experience with quality products and exceptional service
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                            className="bg-base-100 border border-base-300 p-8 rounded-lg shadow-md hover:shadow-lg transition text-center"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-base-content">{feature.title}</h3>
                            <p className="text-base-content/70 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
