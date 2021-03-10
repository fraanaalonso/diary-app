import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote(doc.id, newNote) );
        

    }
}


//react-journal
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes) )
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        if(!note.url){
            delete note.url;
        }
        const notetoFireStore = {...note};
        delete notetoFireStore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update( notetoFireStore );

        dispatch( startLoadingNoteChange(note.id, note ));

        Swal.fire('Saved', note.title, 'success');

    }
}

export const startLoadingNoteChange = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note:{
            id, 
            ...note 
        }
    }
});


export const startUploading = ( file ) => {
    return async(dispatch, getState) => {
        const {active: activenote} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please, wait.',
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        const fileURL = await fileUpload( file );
        activenote.url = fileURL
        dispatch( startSaveNote( activeNote ) );

        Swal.close();
        
    }
}


export const startDeleting = ( note_id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ note_id }`).delete();

        dispatch( deleteNote(note_id) );



    }
}


export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})