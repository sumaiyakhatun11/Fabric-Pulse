import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: '💎',
            title: 'Premium Quality',
            description: 'We source only the finest fabrics and materials to ensure durability and comfort in every piece.',
            color: 'text-blue-500'
        },
        {
            icon: '🎯',
            title: 'Latest Trends',
            description: 'Stay ahead of fashion with our constantly updated collection featuring the latest global trends.',
            color: 'text-pink-500'
        },
        {
            icon: '💰',
            title: 'Best Prices',
            description: 'Get premium quality at competitive prices with regular discounts and exclusive deals.',
            color: 'text-green-500'
        },
        {
            icon: '🚀',
            title: 'Fast Shipping',
            description: 'Lightning-fast delivery across the country with real-time tracking for all orders.',
            color: 'text-orange-500'
        },
        {
            icon: '🌱',
            title: 'Eco-Friendly',
            description: 'Committed to sustainable fashion with environmentally conscious production practices.',
            color: 'text-emerald-500'
        },
        {
            icon: '⭐',
            title: 'Customer Satisfaction',
            description: '99% customer satisfaction rate with hassle-free returns and dedicated support team.',
            color: 'text-yellow-500'
        }
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Why Choose FabricPulse?
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Discover what makes us the preferred choice for thousands of customers
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-lg border border-base-300 group"
                        >
                            <div className="card-body">
                                <div className={`text-6xl mb-4 ${reason.color}`}>
                                    {reason.icon}
                                </div>
                                <h3 className="card-title text-2xl mb-2">
                                    {reason.title}
                                </h3>
                                <p className="text-base-content/70">
                                    {reason.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl shadow-xl">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Still Not Convinced?
                        </h3>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust FabricPulse for their fashion needs
                        </p>
                        <button className="btn btn-accent btn-lg">
                            Start Shopping Now
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
