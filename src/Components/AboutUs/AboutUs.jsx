import React from "react";

const AboutUs = () => {
    return (
        <div className="container mx-auto p-16 ">

            <div className="bg-[#e6e4e4] flex flex-col items-center p-10 ">
                <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
                    Welcome to our Garments Order & Production Tracker System. We are dedicated to
                    helping garment businesses streamline their production, track orders efficiently,
                    and optimize workflow with modern technology. Our platform connects manufacturers,
                    suppliers, and buyers seamlessly, ensuring smooth operations from order placement
                    to delivery.
                </p>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    Our team believes in innovation, quality, and customer satisfaction. Whether you are
                    a small business or a large enterprise, our system provides powerful tools to
                    manage your production, track orders, and gain insights in real time.
                </p>
            </div>

        </div>
    );
};

export default AboutUs;
