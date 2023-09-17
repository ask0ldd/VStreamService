/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import MoviesSlideshow from '../components/MoviesSlideshow'
import useAPI from '../hooks/useAPI'
import { IMovie } from '../types/types'
import './App.css'

function App() {

  // const {isLoading, fetchedDatas, isError} = useAPI({id:'tt3230854', longPlot:false})
  const {isLoading, fetchedDatas, isError} = useAPI({idList:['tt3230854', 'tt0804484', 'tt14688458', 'tt11280740', 'tt3581920', 'tt8111088'], longPlot:false})
  let moviesList : IMovie[] = []
  if(fetchedDatas != null && !Array.isArray(fetchedDatas)) moviesList.push({...fetchedDatas})
  if(fetchedDatas != null && Array.isArray(fetchedDatas)) moviesList = [...fetchedDatas]

  return (
    !isError && <>
      <MoviesSlideshow moviesList={moviesList}/>
    </>
  )
}

export default App
