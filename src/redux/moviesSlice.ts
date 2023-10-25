import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IMovie } from "../types/types"
import { APIRequestsManager } from "../services/APIRequestsManager"

const fetchMovies = async() : Promise<Array<IMovie[]>> => {
    return [
        await APIRequestsManager.getMoviesById(['tt1869454', 'tt6718170', 'tt2906216', 'tt7631058', 'tt5433140', 'tt8111088'], false),
        await APIRequestsManager.getMoviesById(['tt7631058', 'tt14689620', 'tt9777666', 'tt3973768', 'tt0816692', 'tt14379088', 'tt1663202', 'tt2119532', 'tt0048424', 'tt17274522'], false),
    ]
}

export const initialState : moviesState = {
    watchList : [],
    moviesLists : [],
    moviesLoading : 'idle',
    moviesError : true,
}

export const getMoviesLists = createAsyncThunk('movies/getMoviesLists', async () => {
    return await fetchMovies()
})

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
        }, 
    },
    extraReducers: (builder) => {
        builder
          .addCase(getMoviesLists.pending, (state) => {
            return {...state, moviesLoading : 'pending', moviesError: false}
          })
          .addCase(getMoviesLists.fulfilled, (state, action) => {
            return {...state, moviesLoading : 'succeeded', moviesLists : action.payload}
          })
          .addCase(getMoviesLists.rejected, (state) => {
            return {...state, moviesLoading : 'failed', moviesError: true}
          })
    },

})

export const {
    updateWatchList,
} = moviesSlice.actions

export default moviesSlice.reducer

interface moviesState {
    watchList : string[],
    moviesLists : Array<IMovie[]>,
    moviesLoading : 'idle' | 'pending' | 'succeeded' | 'failed',
    moviesError : boolean
}