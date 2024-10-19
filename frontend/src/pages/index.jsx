function App() {
  return (
    <div className="text-gray-900">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src="storm.png" alt="Storm Logo" className="w-10 h-10 mr-4" />
          <h1 className="text-2xl font-bold">STORM</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#home" className="hover:text-gray-300 hover:scale-110 transition-transform duration-300">RAG Page</a></li>
              <li><a href="#features" className="hover:text-gray-300 hover:scale-110 transition-transform duration-300">P2p Page</a></li>
              <li><a href="#contact" className="hover:text-gray-300 hover:scale-110 transition-transform duration-300">Message Board</a></li>
              <li><a href="#resources" className="hover:text-gray-300 hover:scale-110 transition-transform duration-300">Resources</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="h-screen bg-gray-100 flex flex-col justify-center items-center text-center">
       
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-200 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="bg-gray-200 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 My Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;