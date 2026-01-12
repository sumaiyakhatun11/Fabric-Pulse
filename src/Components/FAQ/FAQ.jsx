import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What is your shipping policy?',
            answer: 'We offer free shipping on orders above $50. Standard delivery takes 3-5 business days, while express delivery is available within 1-2 business days for an additional fee. We ship to all major cities and regions.'
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is dispatched, you will receive a tracking number via email and SMS. You can also track your order in real-time from the "My Orders" section of your account dashboard.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day easy return policy. If you\'re not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be unused and in original packaging.'
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship to over 45 countries worldwide. International shipping rates and delivery times vary by destination. Custom duties and taxes may apply based on your country\'s regulations.'
        },
        {
            question: 'Are the products authentic?',
            answer: 'Absolutely! We are authorized dealers and official partners of all brands we carry. Every product comes with authenticity guarantee and original tags. We never sell counterfeit or replica items.'
        },
        {
            question: 'How do I choose the right size?',
            answer: 'Each product page includes a detailed size chart. You can also use our size guide tool or contact our customer support team who can help you find the perfect fit based on your measurements.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit/debit cards, mobile banking, online payment gateways, and cash on delivery (COD) for select locations. All transactions are secured with SSL encryption for your safety.'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'Our customer support team is available 24/7 via live chat, email (support@fabricpulse.com), or phone. You can also reach us through our social media channels. We typically respond within 1-2 hours.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Find answers to common questions about our products, shipping, and services
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <div className="collapse collapse-plus bg-base-200 shadow-md">
                                <input
                                    type="radio"
                                    name="faq-accordion"
                                    checked={openIndex === index}
                                    onChange={() => toggleFAQ(index)}
                                />
                                <div className="collapse-title text-xl font-medium pr-12">
                                    <div className="flex items-center gap-3">
                                        <span className="text-primary text-2xl">❓</span>
                                        <span>{faq.question}</span>
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="text-base-content/70 leading-relaxed pt-2 pl-11">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="bg-base-200 rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-base-content mb-3">
                            Still Have Questions?
                        </h3>
                        <p className="text-base-content/70 mb-6">
                            Can't find the answer you're looking for? Our customer support team is here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn btn-primary">
                                Contact Support
                                <span className="ml-2">💬</span>
                            </button>
                            <button className="btn btn-outline btn-primary">
                                Live Chat
                                <span className="ml-2">🗨️</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
