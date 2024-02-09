// Note.js

import React from 'react';
import notesStore from '../stores/notesStore';
import './Note.css';

export default function Note({ note }) {
  const store = notesStore((store) => {
    return { deleteNote: store.deleteNote, toggleUpdate: store.toggleUpdate };
  });

  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => store.deleteNote(note._id)}>Delete note</button>
      <button onClick={() => store.toggleUpdate(note)}>Update note</button>
    </div>
  );
}

