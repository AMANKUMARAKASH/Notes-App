// Notes.js

import React from 'react';
import notesStore from '../stores/notesStore';
import Note from './Note';
import './Notes.css';

export default function Notes() {
  const store = notesStore();

  return (
    <div className="notes-container">
      <div className="notes-list">
        <h2>Notes:</h2>
        {store.notes &&
          store.notes.map((note) => {
            return <Note note={note} key={note._id} />;
          })}
      </div>
    </div>
  );
}

