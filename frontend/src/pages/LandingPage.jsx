
// src/pages/LandingPage.jsx

import React from 'react';
import FlipNavWrapper from '../components/navbar'; // Adjust the path if necessary
import { SwipeCarousel } from '../components/swipe'; // Adjust the path if necessary
import ScrollingTestimonials from '../components/ScrollingTestimonials'; // Adjust the path if necessary
// import './LandingPage.css'; // Uncomment if you have a CSS file for custom styles

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Navigation Bar */}
            <FlipNavWrapper />

            {/* Hero Section */}
            <header className="hero text-center mx-auto">
                <h1 className="text-4xl mx-auto font-bold">Storm Center of Hope and Service</h1>
                <h2 className="mx-auto"></h2>
                <p className="mx-auto">
                    Welcome to the Storm Center of Hope and Services! Our mission is to provide essential support and resources to individuals and families in need. We strive to create a nurturing environment that fosters hope, empowerment, and positive change.
                </p>
            </header>

            {/* Swipe Carousel Section */}
            <section className="carousel-section text-center mx-auto">
                <SwipeCarousel />
            </section>

            {/* Services Section */}
            <section className="services text-center mx-auto">
                <h2 className="text-3xl font-bold">Our Key Services</h2>
                <ul>
                    <li><strong>Emergency Shelter:</strong> Safe and secure housing for those experiencing homelessness or crises.</li>
                    <li><strong>Food Assistance:</strong> A food pantry offering nutritious options to alleviate hunger and promote health.</li>
                    <li><strong>Counseling and Support:</strong> Mental health counseling and support groups to help individuals cope with challenges.</li>
                    <li><strong>Job Training:</strong> Skill development programs to empower economic stability.</li>
                    <li><strong>Youth Programs:</strong> Educational programs focusing on personal development.</li>
                    <li><strong>Advocacy:</strong> Raising awareness about social issues and advocating for justice.</li>
                </ul>
            </section>

            {/* Community Impact Section */}
            <section className="impact text-center mx-auto">
                <h2>Community Impact</h2>
                <p>
                    By addressing immediate needs and fostering long-term solutions, we enhance the well-being of our community through collaboration and support.
                </p>
            </section>

            {/* Get Involved Section */}
            <section className="get-involved text-center mx-auto">
                <h2>Get Involved</h2>
                <p>
                    Join us in our mission! You can make a meaningful difference through volunteering, donations, or participation in our programs.
                </p>
                <button className="cta-button">Donate Now</button>
                <button className="cta-button">Volunteer</button>
                <button className="cta-button">Learn More</button>
            </section>

            {/* Scrolling Testimonials Section */}
            <section className="testimonials-section text-center mx-auto">
                <h2>Testimonials</h2>
                <ScrollingTestimonials />
            </section>

            {/* Contact Section */}
            <footer className="contact text-center mx-auto">
                <h2>Contact Us</h2>
                <p>
                    For more information, visit our website or reach out to us directly. Together, we can build a stronger, more compassionate community.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;