import { types } from "../types/types"

//log in is a asynchronous operation, so it's useful to have a dispatch function
export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login(123, 'Pedro') )
        }, 3000)
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
    
})