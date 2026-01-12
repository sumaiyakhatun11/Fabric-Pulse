import React, { useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us | FabricPulse";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 py-16"
            >
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        About FabricPulse
                    </h1>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Revolutionizing the garment industry with smart order tracking and production management
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-300">
                            <h2 className="text-3xl font-bold mb-4 text-base-content">Our Mission</h2>
                            <p className="text-base-content/80 leading-relaxed">
                                At FabricPulse, we're dedicated to transforming the garment industry through innovative technology. 
                                Our platform empowers businesses to streamline production, track orders efficiently, and optimize 
                                workflows with cutting-edge solutions.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-300">
                            <h2 className="text-3xl font-bold mb-4 text-base-content">Our Vision</h2>
                            <p className="text-base-content/80 leading-relaxed">
                                We envision a future where manufacturers, suppliers, and buyers collaborate seamlessly. 
                                From order placement to final delivery, our system ensures transparency, efficiency, 
                                and real-time insights for businesses of all sizes.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center text-base-content">What We Stand For</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: "🚀",
                                title: "Innovation",
                                description: "Pioneering modern solutions for traditional industries"
                            },
                            {
                                icon: "⭐",
                                title: "Quality",
                                description: "Excellence in every feature and interaction"
                            },
                            {
                                icon: "🤝",
                                title: "Partnership",
                                description: "Building lasting relationships with our clients"
                            },
                            {
                                icon: "📊",
                                title: "Transparency",
                                description: "Real-time insights and complete visibility"
                            }
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-purple-400 cursor-pointer"
                            >
                                <div className="text-4xl mb-3">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-base-content">{value.title}</h3>
                                <p className="text-base-content/70 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-white/80">Active Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">10K+</div>
                            <div className="text-white/80">Orders Tracked</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">98%</div>
                            <div className="text-white/80">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-white/80">Support</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutUs;
