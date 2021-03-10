import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'
import { activeNote, startDeleting } from '../../actions/notes'
export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active:entry } = useSelector(state => state.notes);
    const [ values, handleInputChange, reset] = useForm( entry );
    const { body, title, id } = values;

    const activeId = useRef( entry.id )


    useEffect(() => {
        if( entry.id !== activeId.current ){
            reset( entry );
            activeId.current = entry.id;
        }
    }, [entry, reset]);

    useEffect(() => {
        dispatch( activeNote(values.id, {...values}) )
    }, [values, dispatch]);

    
    const handleDelete = () => {
        dispatch( startDeleting( id ) )
    }
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                    <input
                        type="text"
                        placeholder="Some awesome title"
                        className="notes__title-input"
                        autoComplete="off"
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                    />

                    <textarea
                        placeholder="What happened?"
                        className="notes__textarea"
                        name="body"
                        value={ body }
                        onChange={handleInputChange}
                    >

                    </textarea>


                   { 

                    (entry.url) 
                    
                    &&
                   
                    (<div className="notes__image">
                        <img 
                            src={entry.url} 
                            alt="imagen"
                        />
                    </div>)
                    
                    }
            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
