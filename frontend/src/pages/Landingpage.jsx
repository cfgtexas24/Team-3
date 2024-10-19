// src/LandingPage.jsx
import React from 'react';
//import './LandingPage.css'; // Import your CSS for styling

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <header className="hero">
                <h1>Empowering Our Community Through Hope and Support</h1>
                <p>
                    Welcome to the Storm Center of Hope and Services! Our mission is to provide essential support and resources to individuals and families in need, creating a nurturing environment that fosters hope, empowerment, and positive change.
                </p>
                <button className="cta-button">Get Involved</button>
            </header>

            {/* Services Section */}
            <section className="services">
                <h2>Our Key Services</h2>
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
            <section className="impact">
                <h2>Community Impact</h2>
                <p>
                    By addressing immediate needs and fostering long-term solutions, we enhance the well-being of our community through collaboration and support.
                </p>
            </section>

            {/* Get Involved Section */}
            <section className="get-involved">
                <h2>Get Involved</h2>
                <p>
                    Join us in our mission! You can make a meaningful difference through volunteering, donations, or participation in our programs.
                </p>
                <button className="cta-button">Donate Now</button>
                <button className="cta-button">Volunteer</button>
                <button className="cta-button">Learn More</button>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>Testimonials</h2>
                <blockquote>
                    <p>“Thanks to the Storm Center, I found the support I needed to get back on my feet!” — A Grateful Client</p>
                </blockquote>
            </section>

            {/* Contact Section */}
            <footer className="contact">
                <h2>Contact Us</h2>
                <p>
                    For more information, visit our website or reach out to us directly. Together, we can build a stronger, more compassionate community.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
