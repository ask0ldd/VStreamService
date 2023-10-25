import { createSlice } from "@reduxjs/toolkit"
import { IMovie } from "../types/types"
import { APIRequestsManager } from "../services/APIRequestsManager"

export const initialState : moviesState = {
    watchList : [],
    movieLists : [
        await APIRequestsManager.getMoviesById(['tt1869454', 'tt6718170', 'tt2906216', 'tt7631058', 'tt5433140', 'tt8111088'], true),
        await APIRequestsManager.getMoviesById(['tt7631058', 'tt14689620', 'tt9777666', 'tt3973768', 'tt0816692', 'tt14379088', 'tt1663202', 'tt2119532', 'tt0048424', 'tt17274522'], true),
    ] || [],
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
    movieLists : Array<IMovie[]>,
}