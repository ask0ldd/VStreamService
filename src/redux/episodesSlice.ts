import { createSlice } from "@reduxjs/toolkit"
import { IEpisode } from "../types/types"

export const initialState : {
    list : IEpisode[] 
} = { list : []}

export const episodesSlice = createSlice({
    name : 'episodes',
    initialState,
    reducers : {
        setEpisodesList(state, action){
            if(action.payload?.episodes == null || action.payload?.episodes.length === false) return state
            return {state, list : [...action.payload.episodes]}
        }
    }

})

export const {
    setEpisodesList,
} = episodesSlice.actions

export default episodesSlice.reducer