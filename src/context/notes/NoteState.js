import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)

  // Get All note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDk4NzljNGEwNjA1Y2FhOGY5MGJmIn0sImlhdCI6MTYzMjQ3NTI1N30.eB8yKSRCXTSZvxhvKPK4ttiuITgLy-FXXhPfWQABxVo"
      },
    });
    const json = await response.json();
    setNotes(json)



  }
  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDk4NzljNGEwNjA1Y2FhOGY5MGJmIn0sImlhdCI6MTYzMjQ3NTI1N30.eB8yKSRCXTSZvxhvKPK4ttiuITgLy-FXXhPfWQABxVo"
      },
      body: JSON.stringify({ title, description, tag })
    });



    const note = {
      "_id": "614dc5ffff1121de828db2b3b",
      "user": "614d9879c4a0605caa8f90bf",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-24T12:35:11.848Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDk4NzljNGEwNjA1Y2FhOGY5MGJmIn0sImlhdCI6MTYzMjQ3NTI1N30.eB8yKSRCXTSZvxhvKPK4ttiuITgLy-FXXhPfWQABxVo"
      },
    })
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDk4NzljNGEwNjA1Y2FhOGY5MGJmIn0sImlhdCI6MTYzMjQ3NTI1N30.eB8yKSRCXTSZvxhvKPK4ttiuITgLy-FXXhPfWQABxVo"
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;