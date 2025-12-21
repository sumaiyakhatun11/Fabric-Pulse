import React from 'react';

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
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    We provide the best shopping experience with quality products and exceptional service
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md hover:shadow-lg transition text-center"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
