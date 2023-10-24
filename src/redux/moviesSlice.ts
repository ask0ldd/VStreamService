import { createSlice } from "@reduxjs/toolkit"

export const initialState : moviesState = {
    watchList : []
}

export const moviesSlice = createSlice({
    name : 'movies',
    initialState,
    reducers : {
        updateWatchList(state, action){
            if(action.payload?.id == null) /* c8 ignore next */ return state
            const newWatchList = [...state.watchList]
            if(state.watchList.includes(action.payload.id)){
                newWatchList.splice([...state.watchList].indexOf(action.payload.id), 1)
            }else{
                newWatchList.push(action.payload.id)
            }         
            return {...state, watchList : newWatchList}
        }
    }

})

export const {
    updateWatchList,
} = moviesSlice.actions

export default moviesSlice.reducer

interface moviesState {
    watchList : string[],

}