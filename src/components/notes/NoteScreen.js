import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'
import { activeNote } from '../../actions/notes'
export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active:entry } = useSelector(state => state.notes);
    const [ values, handleInputChange, reset] = useForm( entry );
    const { body, title} = values;

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
                            src="data:image/jpeg;base64,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" 
                            alt="imagen"
                        />
                    </div>)
                    
                    }
            </div>
        </div>
    )
}
