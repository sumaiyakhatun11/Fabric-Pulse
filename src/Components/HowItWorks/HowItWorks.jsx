import React from 'react';

const steps = [
    {
        title: 'Browse & discover',
        desc: 'Explore curated products tailored to your needs with clear photos and specs.',
        icon: '🔍'
    },
    {
        title: 'Choose & customize',
        desc: 'Pick your favorites, set quantities, and add any notes or preferences.',
        icon: '🛒'
    },
    {
        title: 'Order & enjoy',
        desc: 'Fast checkout, timely delivery, and support that is ready to help.',
        icon: '🚚'
    }
];

const HowItWorks = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">How it works</p>
                <h2 className="text-3xl md:text-4xl font-bold text-base-content">Shop in three simple steps</h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">From browsing to delivery, we keep every step clear and effortless.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                    <div key={step.title} className="bg-base-100 border border-base-200 rounded-2xl p-6 shadow-sm space-y-3">
                        <div className="text-3xl" aria-hidden="true">{step.icon}</div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs">{idx + 1}</span>
                            <span>Step {idx + 1}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-base-content">{step.title}</h3>
                        <p className="text-base-content/70 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
