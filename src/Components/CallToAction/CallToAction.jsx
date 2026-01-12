import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-base-100/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Left Side - Content */}
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                        Ready to Upgrade Your Wardrobe?
                                    </h2>
                                    <p className="text-white/90 text-lg mb-6">
                                        Join thousands of fashion-forward customers who trust FabricPulse for their style needs. Get exclusive access to new collections, special discounts, and more!
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-3 text-white">
                                            <span className="text-2xl">✅</span>
                                            <span>Free shipping on first order</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-white">
                                            <span className="text-2xl">✅</span>
                                            <span>20% off for new members</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-white">
                                            <span className="text-2xl">✅</span>
                                            <span>Early access to sales</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-white">
                                            <span className="text-2xl">✅</span>
                                            <span>Exclusive member perks</span>
                                        </li>
                                    </ul>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link to="/all-products">
                                            <button className="btn btn-accent btn-lg w-full sm:w-auto shadow-xl">
                                                Shop Now
                                                <span className="ml-2">🛍️</span>
                                            </button>
                                        </Link>
                                        <Link to="/registration">
                                            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg w-full sm:w-auto">
                                                Sign Up Free
                                                <span className="ml-2">→</span>
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Side - Visual */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="relative hidden lg:block"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Decorative circles */}
                                        <motion.div
                                            animate={{ 
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 360]
                                            }}
                                            transition={{ 
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"
                                        />
                                        <motion.div
                                            animate={{ 
                                                scale: [1.2, 1, 1.2],
                                                rotate: [360, 0]
                                            }}
                                            transition={{ 
                                                duration: 15,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/30 rounded-full blur-3xl"
                                        />
                                        
                                        {/* Center icon/text */}
                                        <div className="relative z-10 text-center">
                                            <div className="text-9xl mb-4">👗</div>
                                            <p className="text-white text-2xl font-bold">
                                                Fashion<br/>Excellence
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto"
                >
                    {[
                        { number: '50K+', label: 'Happy Customers' },
                        { number: '10K+', label: 'Products' },
                        { number: '4.9/5', label: 'Rating' },
                        { number: '24/7', label: 'Support' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="text-3xl md:text-4xl font-bold mb-2">
                                {stat.number}
                            </div>
                            <div className="text-white/80">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;
