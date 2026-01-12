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
        <div className="w-10/12 mx-auto my-8 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
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
                            <div className="text-white max-w-xl space-y-4">
                                <div className="inline-block">
                                    <span className="px-4 py-2 bg-primary/80 rounded-full text-sm font-semibold">
                                        ✨ Advanced Tracking
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold">
                                    Track Your Garments Orders Easily
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200">
                                    Monitor production, manage orders, and streamline your workflow with real-time tracking.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        to="/all-products"
                                        className="btn btn-primary px-6 py-3"
                                    >
                                        View Products →
                                    </Link>
                                    <button className="px-4 py-2 bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all rounded-lg font-medium">
                                        Learn More
                                    </button>
                                </div>
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
                            <div className="text-white max-w-xl space-y-4">
                                <div className="inline-block">
                                    <span className="px-4 py-2 bg-primary/80 rounded-full text-sm font-semibold">
                                        📊 Smart Management
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold">
                                    Manage Orders & Inventory
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200">
                                    Keep track of stock levels and order status in real-time with our intelligent system.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        to="/all-products"
                                        className="btn btn-primary px-6 py-3"
                                    >
                                        Explore Products →
                                    </Link>
                                    <button className="px-4 py-2 bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all rounded-lg font-medium">
                                        Learn More
                                    </button>
                                </div>
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
                            <div className="text-white max-w-xl space-y-4">
                                <div className="inline-block">
                                    <span className="px-4 py-2 bg-primary/80 rounded-full text-sm font-semibold">
                                        🚀 Production Excellence
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold">
                                    Simplify Your Production Tracking
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200">
                                    Real-time insights to make smarter business decisions and optimize your operations.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        to="/all-products"
                                        className="btn btn-primary px-6 py-3"
                                    >
                                        Get Started →
                                    </Link>
                                    <button className="px-4 py-2 bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all rounded-lg font-medium">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>

            {/* Scroll to Explore */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-center">
                <p className="text-white text-sm font-medium mb-2">Scroll to explore</p>
                <div className="animate-bounce">
                    <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
