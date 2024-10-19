/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ArrowRight, Gift, Users, BookOpen, Briefcase } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-105 ${className}`}
  >
    <Icon className="w-12 h-12 text-indigo-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 font-sans min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white py-8 border-b-4 border-indigo-400">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            STORM Center Virtual Drop-in
          </h1>
          <p className="text-center mt-2 text-indigo-200">
            Inspiring Hope, Empowering Breakthroughs
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            Welcome to Our Virtual Community
          </h2>
          <p className="text-gray-600 mb-4">
            At STORM Center of Hope and Services, we're dedicated to inspiring
            hope, empowering breakthroughs, and alleviating barriers to mental
            and emotional wellness for vulnerable youth and young adults.
          </p>
          <p className="text-gray-600">
            Our virtual drop-in center is designed to keep you connected and
            address your real-time needs. Whether you're looking for support,
            resources, or just a friendly chat, we're here for you.
          </p>
        </section>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {["Mentee", "Mentor", "Emergency"].map((role, index) => (
            <Link
              key={role}
              to="/auth"
              className={`
                flex items-center px-6 py-3 rounded-full text-white font-semibold
                transition duration-300 transform hover:scale-105 hover:shadow-lg
                ${
                  index === 0
                    ? "bg-blue-500 hover:bg-blue-600"
                    : index === 1
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }
              `}
            >
              {role}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ))}
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <FeatureCard
            icon={Gift}
            title="Emergency Shelter"
            description="Instant access to emergency shelter applications"
            className="bg-red-100 text-red-800"
          />
          <FeatureCard
            icon={Users}
            title="Life Skills Sessions"
            description="Critical life skills sessions for personal growth"
          />
          <FeatureCard
            icon={BookOpen}
            title="Mentor Connections"
            description="Connect with mentors and peers for support"
          />
          <FeatureCard
            icon={Briefcase}
            title="Career Resources"
            description="Resources for education and employment opportunities"
          />
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} STORM Center of Hope and Services.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
