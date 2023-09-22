import { createSlice } from "@reduxjs/toolkit"

export const initialState : moviesState = {
    idList : []
}

export const userSlice = createSlice({
    name : 'movies',
    initialState,
    reducers : {
        addId(state, action){
            if(action.payload?.id == null) return state
            const newIdList = [...state.idList]
            newIdList.push(action.payload.id)
            return {...state, idList : newIdList}
        }
    }

})

export default userSlice.reducer

interface moviesState {
    idList : string[],

}