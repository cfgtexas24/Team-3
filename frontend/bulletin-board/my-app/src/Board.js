import React from 'react';

function Note({ note }) {
  return (
    <div className="bg-pink-200 p-4 rounded shadow-md relative">
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-800 rounded-full"></div>
      <img src={note.img_src} alt="Note" className="w-full h-auto mb-2" />
      <div className="text-center">
        <a href={note.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
        {note.message}
        </a>
        </div>
    </div>
  );
}

function Board({ notes }) {
  return (
    <div className="bg-amber-800 p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Board;
