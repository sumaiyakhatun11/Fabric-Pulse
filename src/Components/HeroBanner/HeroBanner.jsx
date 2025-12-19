import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../../assets/images (1).jpeg';
import img2 from '../../assets/img2.webp';
import img3 from '../../assets/img3.jpg';

const HeroBanner = () => {
    return (
        <div className="w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
            <Swiper
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                modules={[Navigation, Autoplay, Pagination]}
                className="w-full h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={img1} alt="Garments" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12">
                            <div className="text-white max-w-xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    Track Your Garments Orders Easily
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200 mb-4">
                                    Monitor production, manage orders, and streamline your workflow.
                                </p>
                                <Link
                                    to="/all-products"
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded"
                                >
                                    View Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={img2} alt="Production" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12">
                            <div className="text-white max-w-xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    Manage Orders & Inventory
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200 mb-4">
                                    Keep track of stock levels and order status in real-time.
                                </p>
                                <Link
                                    to="/all-products"
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded"
                                >
                                    Explore Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={img3} alt="Dashboard" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12">
                            <div className="text-white max-w-xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    Simplify Your Production Tracking
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200 mb-4">
                                    Real-time insights to make smarter business decisions.
                                </p>
                                <Link
                                    to="/all-products"
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default HeroBanner;
