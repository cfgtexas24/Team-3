import { Link } from 'react-router-dom';

function BulletinBoard() {
  return (
      <div className="bg-yellow-50 p-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Community Bulletin Board</h1>
          <nav className="mb-4">
            <Link to="/board" className="mr-4 text-blue-500 hover:text-blue-700">View Board</Link>
            <Link to="/edit" className="text-blue-500 hover:text-blue-700">Edit Board</Link>
          </nav>
        </div>
      </div>
  );
}

export default BulletinBoard;