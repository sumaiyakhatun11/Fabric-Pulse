import React from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const feedbacks = [
    { 
        name: 'Md. Kamal Hossain', 
        location: 'Dhaka',
        text: 'অসাধারণ পণ্য এবং দ্রুত ডেলিভারি! Amazing quality and service. Highly recommended!' 
    },
    { 
        name: 'Fatema Akter', 
        location: 'Chittagong',
        text: 'The quality is exceptional. আমি খুবই সন্তুষ্ট! Great experience with FabricPulse.' 
    },
    { 
        name: 'Rakibul Islam', 
        location: 'Sylhet',
        text: 'Very easy to order and the support is excellent. পণ্যের মান অনেক ভালো। Will order again!' 
    },
    { 
        name: 'Sadia Rahman', 
        location: 'Rajshahi',
        text: 'Outstanding service! ডেলিভারি সময়মত পেয়েছি। Product quality exceeded my expectations.' 
    },
    { 
        name: 'Tanvir Ahmed', 
        location: 'Khulna',
        text: 'Best garments shop online! দাম এবং মান দুটোই দারুণ। Customer service is also very helpful.' 
    },
    { 
        name: 'Nusrat Jahan', 
        location: 'Pabna',
        text: 'খুব সুন্দর পণ্য পেয়েছি! The fabric quality is excellent and delivery was fast. Loved it!' 
    }
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
                        <div className="flex items-center gap-3 mb-4">
                            <div className="avatar placeholder">
                                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12">
                                    <span className="text-xl font-bold">{f.name.charAt(0)}</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-base-content">{f.name}</h4>
                                <p className="text-xs text-base-content/60">📍 {f.location}, Bangladesh</p>
                            </div>
                        </div>
                        <p className="text-base-content/80 italic leading-relaxed">"{f.text}"</p>
                        <div className="flex gap-1 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-500">⭐</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </Carousel>
        </section>
    );
};

export default CustomerFeedback;
