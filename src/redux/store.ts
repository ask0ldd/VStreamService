
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        /*movies : moviesReducer,*/
    },
    devTools : true,
  })

// export those types so they can be used globally : to type some redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store