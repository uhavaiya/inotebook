import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notes = [
        {
            "_id": "614d9936c4a0605caa8f90eb",
            "user": "614d9879c4a0605caa8f90bf",
            "title": "1 title",
            "description": "1 description",
            "tag": "personal",
            "date": "2021-09-24T09:24:06.963Z",
            "__v": 0
        },
        {
            "_id": "614dc5ffff1121de828b2b3b",
            "user": "614d9879c4a0605caa8f90bf",
            "title": "1 title",
            "description": "1 description",
            "tag": "personal",
            "date": "2021-09-24T12:35:11.848Z",
            "__v": 0
        },
        {
            "_id": "614dc608ff1121de828b2b3d",
            "user": "614d9879c4a0605caa8f90bf",
            "title": "2 title",
            "description": "2 description",
            "tag": "personal",
            "date": "2021-09-24T12:35:20.945Z",
            "__v": 0
        }
    ]

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;