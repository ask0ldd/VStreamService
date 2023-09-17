/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import MoviesSlideshow from '../components/MoviesSlideshow'
import useAPI from '../hooks/useAPI'
import { IMovie } from '../types/types'
import './App.css'

function App() {

  const {isLoading, fetchedDatas, isError} = useAPI({id:'tt3230854', longPlot:false})
  const moviesList : IMovie[] = []
  if(fetchedDatas != null ) moviesList.push(fetchedDatas)

  return (
    !isError && <>
      <MoviesSlideshow moviesList={moviesList}/>
    </>
  )
}

export default App
