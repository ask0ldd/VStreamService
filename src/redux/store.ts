
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import moviesReducer from './moviesSlice'

export const store = configureStore({
    reducer: {
        /*movies : moviesReducer,*/
        user : userReducer,
        movies : moviesReducer,
    },
    devTools : true,
  })

// export those types so they can be used globally : to type some redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store