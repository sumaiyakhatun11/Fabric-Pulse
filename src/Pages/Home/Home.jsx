import React, { useEffect } from 'react';
import HeroBanner from '../../Components/HeroBanner/HeroBanner';
import ProductsSection from '../../Components/ProductsSection/ProductsSection';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import CustomerFeedback from '../../Components/CustomerFeedback/CustomerFeedback';
import FeaturesSection from '../../Components/FeaturesSection/FeaturesSection';
import NewsletterCTA from '../../Components/NewsletterCTA/NewsletterCTA';
import Statistics from '../../Components/Statistics/Statistics';
import Categories from '../../Components/Categories/Categories';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';
import BrandPartners from '../../Components/BrandPartners/BrandPartners';
import FAQ from '../../Components/FAQ/FAQ';
import CallToAction from '../../Components/CallToAction/CallToAction';

const Home = () => {
    useEffect(() => {
        document.title = "Home | FabricPulse";
    }, []);

    return (
        <div>
            <HeroBanner></HeroBanner>
            <Statistics></Statistics>
            <ProductsSection></ProductsSection>
            <Categories></Categories>
            <FeaturesSection></FeaturesSection>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <BrandPartners></BrandPartners>
            <CustomerFeedback></CustomerFeedback>
            <FAQ></FAQ>
            <CallToAction></CallToAction>
            <NewsletterCTA></NewsletterCTA>
        </div>
    );
};

export default Home;