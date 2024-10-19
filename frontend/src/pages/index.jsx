/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ArrowRight, Gift, Users, BookOpen, Briefcase } from "lucide-react";

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <div className={`bg-white p-4 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-105 ${className}`}>
    <Icon className="w-10 h-10 mb-2" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ActionButton = ({ to, children, className }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2 rounded-full text-white font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg ${className}`}
  >
    {children}
    <ArrowRight className="ml-2 h-5 w-5" />
  </Link>
);

function App() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 font-sans min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white py-8 border-b-4 border-indigo-400">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">
            STORM Center Virtual Drop-in
          </h1>
          <p className="text-center text-lg text-indigo-200">
            Inspiring Hope, Empowering Breakthroughs
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white rounded-3xl shadow-2xl p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            Welcome to Our Virtual Community
          </h2>
          <p className="text-gray-700 text-base mb-3 leading-relaxed">
            At STORM Center of Hope and Services, we&apos;re dedicated to inspiring hope, empowering breakthroughs, and alleviating barriers to mental and emotional wellness for vulnerable youth and young adults.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Our virtual drop-in center is designed to keep you connected and address your real-time needs. Whether you&apos;re looking for support, resources, or just a friendly chat, we&apos;re here for you.
          </p>
        </section>

        <div className="flex justify-center gap-4 mb-12">
          <ActionButton to="/auth" className="bg-blue-500 hover:bg-blue-600">Mentee</ActionButton>
          <ActionButton to="/auth" className="bg-green-500 hover:bg-green-600">Mentor</ActionButton>
          <ActionButton to="/auth" className="bg-red-500 hover:bg-red-600">Emergency</ActionButton>
        </div>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <FeatureCard
            icon={Gift}
            title="Emergency Shelter"
            description="Instant access to emergency shelter applications"
            className="bg-red-50 text-red-800"
          />
          <FeatureCard
            icon={Users}
            title="Life Skills Sessions"
            description="Critical life skills sessions for personal growth"
            className="bg-blue-50 text-blue-800"
          />
          <FeatureCard
            icon={BookOpen}
            title="Mentor Connections"
            description="Connect with mentors and peers for support"
            className="bg-green-50 text-green-800"
          />
          <FeatureCard
            icon={Briefcase}
            title="Career Resources"
            description="Resources for education and employment opportunities"
            className="bg-yellow-50 text-yellow-800"
          />
        </section>
      </main>

      <footer className="bg-indigo-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base">
            &copy; {new Date().getFullYear()} STORM Center of Hope and Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
