import React, { useEffect } from 'react';
import HeroBanner from '../../Components/HeroBanner/HeroBanner';
import ProductsSection from '../../Components/ProductsSection/ProductsSection';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import CustomerFeedback from '../../Components/CustomerFeedback/CustomerFeedback';
import FeaturesSection from '../../Components/FeaturesSection/FeaturesSection';
import NewsletterCTA from '../../Components/NewsletterCTA/NewsletterCTA';

const Home = () => {
    useEffect(() => {
        document.title = "Home | FabricPulse";
    }, []);

    return (
        <div>
            <HeroBanner></HeroBanner>
            <ProductsSection></ProductsSection>
            <FeaturesSection></FeaturesSection>
            <HowItWorks></HowItWorks>
            <CustomerFeedback></CustomerFeedback>
            <NewsletterCTA></NewsletterCTA>
        </div>
    );
};

export default Home;