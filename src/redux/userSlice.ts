import { createSlice } from "@reduxjs/toolkit"

export const initialState : userState = {
    firstname : 'Johnny',
    lastname : 'Cage'
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    /* c8 ignore start */
    reducers : {
        setName(state, action){
            if(action.payload?.firstname == null || action.payload?.lastname == null) return state
            return {...state, firstname : action.payload.firstname, lastname : action.payload.lastname}
        }
    }
    /* c8 ignore stop */

})

export default userSlice.reducer

interface userState {
    firstname : string
    lastname : string
}