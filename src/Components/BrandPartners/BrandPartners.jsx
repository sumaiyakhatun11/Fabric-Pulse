import React from 'react';
import { motion } from 'framer-motion';

const BrandPartners = () => {
    const brands = [
        {
            name: 'Nike',
            logo: '✓',
            description: 'Official Partner',
            bgColor: 'bg-gradient-to-br from-black to-gray-800'
        },
        {
            name: 'Adidas',
            logo: '⚡',
            description: 'Premium Seller',
            bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800'
        },
        {
            name: 'Puma',
            logo: '🐆',
            description: 'Authorized Dealer',
            bgColor: 'bg-gradient-to-br from-red-500 to-red-700'
        },
        {
            name: 'Zara',
            logo: 'Z',
            description: 'Official Retailer',
            bgColor: 'bg-gradient-to-br from-purple-600 to-purple-800'
        },
        {
            name: 'H&M',
            logo: 'H',
            description: 'Partner Store',
            bgColor: 'bg-gradient-to-br from-green-600 to-green-800'
        },
        {
            name: 'Levi\'s',
            logo: 'L',
            description: 'Exclusive Partner',
            bgColor: 'bg-gradient-to-br from-orange-600 to-orange-800'
        },
        {
            name: 'Calvin Klein',
            logo: 'CK',
            description: 'Premium Brand',
            bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900'
        },
        {
            name: 'Tommy Hilfiger',
            logo: 'TH',
            description: 'Authorized Partner',
            bgColor: 'bg-gradient-to-br from-indigo-600 to-indigo-800'
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-base-200 to-base-100">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Our Brand Partners
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        We collaborate with world-renowned brands to bring you the best quality products
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {brands.map((brand, index) => (
                        <div key={index} className="group">
                            <div className={`${brand.bgColor} rounded-xl p-6 h-32 flex flex-col items-center justify-center shadow-lg cursor-pointer`}>
                                <div className="text-white text-4xl font-bold mb-2">
                                    {brand.logo}
                                </div>
                                <h3 className="text-white font-semibold text-lg">
                                    {brand.name}
                                </h3>
                                <p className="text-white/80 text-xs mt-1">
                                    {brand.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-base-200 rounded-xl p-8 shadow-lg"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-base-content mb-2">
                                Become a Partner
                            </h3>
                            <p className="text-base-content/70">
                                Are you a brand looking to expand your reach? Join our growing network of trusted partners.
                            </p>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-lg">
                                Partner With Us
                                <span className="ml-2">🤝</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-base-content/60 italic">
                        "Together we create fashion excellence and deliver unmatched value to our customers"
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BrandPartners;
