import { Link } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-6 border-b-4 border-orange-500">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">STORM Center Virtual Drop-in</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Our Virtual Community</h2>
          <p className="mb-4">At STORM Center of Hope and Services, we&apos;re dedicated to inspiring hope, empowering breakthroughs, and alleviating barriers to mental and emotional wellness for vulnerable youth and young adults.</p>
          <p>Our virtual drop-in center is designed to keep you connected and address your real-time needs. Whether you&apos;re looking for support, resources, or just a friendly chat, we&apos;re here for you.</p>
        </section>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to="/auth" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Mentee</Link>
          <Link to="/auth" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Mentor</Link>
          <Link to="/emergency" className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Emergency</Link>
        </div>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">What We Offer:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Instant access to emergency shelter applications</li>
            <li>Critical life skills sessions</li>
            <li>Connections with mentors and peers for support</li>
            <li>Interactive virtual spaces for engagement</li>
            <li>Resources for education and employment</li>
          </ul>
          <p className="font-semibold text-lg">Join our community today and take the first step towards a brighter future!</p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} STORM Center of Hope and Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;