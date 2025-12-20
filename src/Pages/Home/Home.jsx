import React from 'react';
import HeroBanner from '../../Components/HeroBanner/HeroBanner';
import ProductsSection from '../../Components/ProductsSection/ProductsSection';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import CustomerFeedback from '../../Components/CustomerFeedback/CustomerFeedback';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <ProductsSection></ProductsSection>
            <HowItWorks></HowItWorks>
            <CustomerFeedback></CustomerFeedback>
        </div>
    );
};

export default Home;