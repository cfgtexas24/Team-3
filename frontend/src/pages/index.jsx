import useAppStore from "../useAppStore";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const setUser = useAppStore(state => state.setUser);
  
  const signin = () => {
    setUser(uuid());
    navigate("/chat");  
  }
  
  return (
    <div className="text-gray-900">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Landing Page</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#home" className="hover:text-gray-300">RAG Page</a></li>
              <li><a href="#features" className="hover:text-gray-300">P2p Page</a></li>
              <li><a href="#contact" className="hover:text-gray-300">Message Board</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="h-screen bg-gray-100 flex flex-col justify-center items-center text-center">
        <button onClick={() => signin()} >sign in</button>
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
