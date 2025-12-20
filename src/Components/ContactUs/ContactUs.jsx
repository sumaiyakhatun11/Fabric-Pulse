import React, { useState } from 'react';

const ContactUs = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Fake submit handler; wire to backend or email service later
        console.log({ name, email, message });
        setStatus('Message sent! We will get back to you soon.');
        e.target.reset();
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">Contact</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">We would love to hear from you</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Questions about products, partnerships, or support? Drop us a line and the team will respond quickly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5 bg-base-200 rounded-2xl p-6 shadow-sm border border-base-300">
                    <h3 className="text-xl font-semibold">Contact Information</h3>
                    <div className="space-y-3 text-gray-700">
                        <p><span className="font-medium">Email:</span> sumaiyameghla1111@gmail.com</p>
                        <p><span className="font-medium">Phone:</span> +880 1234-567890</p>
                        <p><span className="font-medium">Address:</span> Dhaka, Bangladesh</p>
                        <p className="text-sm text-gray-500">Sat - Thu, 9:00 AM - 6:00 PM (Closed on Friday)</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <a
                            className="btn btn-sm btn-neutral"
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=sumaiyameghla1111@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Email Us
                        </a>
                        <a className="btn btn-sm btn-outline" href="tel:+8801234567890">Call Now</a>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200">
                    <div className="grid md:grid-cols-2 gap-4">
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">Name</span></div>
                            <input name="name" type="text" placeholder="Your name" className="input input-bordered w-full" required />
                        </label>
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">Email</span></div>
                            <input name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text">Subject</span></div>
                        <input name="subject" type="text" placeholder="How can we help?" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text">Message</span></div>
                        <textarea name="message" className="textarea textarea-bordered h-28" placeholder="Type your message" required></textarea>
                    </label>
                    <button type="submit" className="btn btn-neutral w-full">Send message</button>
                    {status && <p className="text-sm text-success text-center">{status}</p>}
                </form>
            </div>
        </section>
    );
};

export default ContactUs;
