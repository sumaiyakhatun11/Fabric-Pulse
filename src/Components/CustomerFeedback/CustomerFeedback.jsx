import React from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const feedbacks = [
    { name: 'John Doe', text: 'Amazing products and fast delivery!' },
    { name: 'Jane Smith', text: 'The quality is top-notch. Highly recommend.' },
    { name: 'Alex Johnson', text: 'Very easy to order and the support is excellent.' },
];

const CustomerFeedback = () => {
    return (
        <section className="py-20">
            <h2 className="text-4xl font-bold mb-10 text-center text-base-content">Customer Feedback</h2>
            <Carousel
                autoPlay
                infinite
                responsive={{
                    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
                    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
                    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
                }}
            >
                {feedbacks.map((f, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-base-100 border border-base-300 p-6 rounded-lg shadow m-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        <p className="text-base-content/80 mb-3">"{f.text}"</p>
                        <h4 className="font-bold text-base-content">{f.name}</h4>
                    </motion.div>
                ))}
            </Carousel>
        </section>
    );
};

export default CustomerFeedback;
