import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [
        {
            name: 'Jacket',
            icon: '🧥',
            description: 'Premium quality jackets for all seasons',
            productCount: '120+',
            gradient: 'from-blue-500 to-blue-700'
        },
        {
            name: 'Shirt',
            icon: '👔',
            description: 'Stylish shirts for every occasion',
            productCount: '250+',
            gradient: 'from-purple-500 to-purple-700'
        },
        {
            name: 'Pant',
            icon: '👖',
            description: 'Comfortable and trendy pants',
            productCount: '180+',
            gradient: 'from-green-500 to-green-700'
        },
        {
            name: 'Accessories',
            icon: '👜',
            description: 'Complete your look with accessories',
            productCount: '95+',
            gradient: 'from-pink-500 to-pink-700'
        }
    ];

    return (
        <section className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Explore our wide range of categories and find exactly what you're looking for
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div key={index}>
                            <Link to="/all-products">
                                <div className="card bg-base-100 shadow-xl cursor-pointer group overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                    <div className="card-body relative">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className={`text-5xl bg-gradient-to-br ${category.gradient} w-16 h-16 rounded-full flex items-center justify-center shadow-lg`}>
                                                <span className="text-white">{category.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="card-title text-xl">
                                                    {category.name}
                                                </h3>
                                                <span className="badge badge-primary badge-sm">
                                                    {category.productCount} Items
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-base-content/70">
                                            {category.description}
                                        </p>
                                        <div className="card-actions justify-end mt-4">
                                            <button className="btn btn-primary btn-sm group-hover:btn-accent transition-colors">
                                                Explore
                                                <span className="ml-1 inline-block">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
