import React from 'react';

const Resources = () => {
    return (
        <div className="resources-page container mx-auto p-4">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-3xl font-bold mr-4">Resources</h1>
                <img src="Storm.png" alt="Storm Center" className="w-32 h-auto rounded-lg" />
            </div>

            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">1. Emergency Services</h2>
                <p>
                    <strong>Emergency Shelter:</strong> We offer safe and secure housing for individuals and families experiencing homelessness or crises. Our shelters provide a warm environment and essential services to help you get back on your feet.
                </p>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">2. Food Assistance</h2>
                <p>
                    <strong>Food Pantry:</strong> Our food pantry provides nutritious food options to reduce hunger. We partner with local farms and grocery stores to ensure a variety of healthy choices for our community.
                </p>
            </div>

            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">3. Counseling and Support</h2>
                <p>
                    <strong>Mental Health Services:</strong> Our licensed counselors are here to provide mental health support, including individual and group therapy sessions. We also offer support groups for various challenges, including grief, anxiety, and depression.
                </p>
            </div>

            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">4. Job Training and Employment Services</h2>
                <p>
                    <strong>Skill Development Programs:</strong> We offer job training programs to help individuals develop essential skills for employment. Our workshops cover resume writing, interview preparation, and job training.
                </p>
            </div>

            <div className="bg-purple-100 border-l-4 border-purple-500 p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">5. Get Involved</h2>
                <p>
                    <strong>Volunteer Opportunities:</strong> We welcome volunteers to help with our various programs and services. Whether you want to assist in the food pantry, help with events, or provide mentorship, your support makes a difference.
                </p>
            </div>

            <div className="bg-gray-100 border-l-4 border-gray-500 p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">6. Contact Information</h2>
                <p>
                    <strong>Reach Out:</strong> If you have questions or need assistance, please don’t hesitate to contact us. Our team is here to help you find the resources you need.
                </p>
                <p>
                    Phone: <a href="tel:4694313582" className="font-bold">469-431-3582</a>
                </p>
                <p>
                    Email: <a href="mailto:contact@stormcohs.org" className="font-bold">contact@stormcohs.org</a>
                </p>
            </div>
        </div>
    );
};

export default Resources;
