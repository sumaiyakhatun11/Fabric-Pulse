import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Statistics = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3
    });

    const stats = [
        {
            icon: '👥',
            count: 50000,
            suffix: '+',
            label: 'Happy Customers',
            description: 'Satisfied clients worldwide'
        },
        {
            icon: '👔',
            count: 10000,
            suffix: '+',
            label: 'Products',
            description: 'Quality garments available'
        },
        {
            icon: '🏆',
            count: 15,
            suffix: '+',
            label: 'Years Experience',
            description: 'In garment industry'
        },
        {
            icon: '🌍',
            count: 45,
            suffix: '+',
            label: 'Countries',
            description: 'Worldwide delivery'
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Our Achievements
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Numbers that speak for our excellence and commitment to quality
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-xl"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-5xl mb-4">{stat.icon}</div>
                                <h3 className="text-4xl font-bold text-primary">
                                    {inView && (
                                        <CountUp
                                            end={stat.count}
                                            duration={2.5}
                                            separator=","
                                            suffix={stat.suffix}
                                        />
                                    )}
                                </h3>
                                <h4 className="text-xl font-semibold text-base-content mt-2">
                                    {stat.label}
                                </h4>
                                <p className="text-base-content/60 text-sm">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
