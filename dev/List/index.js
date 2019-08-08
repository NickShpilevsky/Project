import React from 'react';

import Note from "../Note";

const List = ({ peopleList, updateNote, showForm, removeNote }) => { //данные берем из пропсов, пишем так вместо {...} = props;
        return (
            <React.Fragment>
                {
                    peopleList.map(note => (
                        <Note key={note.id}
                              id={note.id}
                              name={note.name}
                              company={note.company}
                              eMail={note.eMail}
                              phoneNumber={note.phoneNumber}
                              status={note.status}
                              category={note.category}
                              textArea={note.textArea}
                              photo={note.photo}
                              updateNote={updateNote}
                              showForm={showForm}
                              removeNote={removeNote}
                              sendButtonTitle={'create'}
                        />
                    ))
                }
            </React.Fragment>
        )
};

export default List;