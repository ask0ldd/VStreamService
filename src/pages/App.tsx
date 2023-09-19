/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import Header from '../components/Header'
import VerticalMovieCardsSlideshow from '../components/VerticalMovieCardsSlideshow'
import useAPI from '../hooks/useAPI'
import { IMovie } from '../types/types'
import './App.css'
import HorizontalMovieCardsSlideshow from '../components/HorizontalMovieCardsSlideshow'
import Footer from '../components/Footer'

function App() {

  // const {isLoading, fetchedDatas, isError} = useAPI({id:'tt3230854', longPlot:false})
  const {isLoading, fetchedDatas, isError} = useAPI({idList:['tt3230854', 'tt0804484', 'tt14688458', 'tt11280740', 'tt3581920', 'tt8111088'], longPlot:false})
  let moviesList : IMovie[] = []
  if(fetchedDatas != null && !Array.isArray(fetchedDatas)) moviesList.push({...fetchedDatas})
  if(fetchedDatas != null && Array.isArray(fetchedDatas)) moviesList = [...fetchedDatas]

  return (
    <>
      <Header/>
      {!isLoading && !isError && <VerticalMovieCardsSlideshow moviesList={moviesList}/>}
      <div style={{height:'4rem'}}></div>
      {!isLoading && !isError && <VerticalMovieCardsSlideshow moviesList={moviesList}/>}
      <div style={{height:'4rem'}}></div>
      {!isLoading && !isError && <HorizontalMovieCardsSlideshow moviesList={moviesList}/>}
      <div style={{height:'4rem'}}></div>
      {!isLoading && !isError && <HorizontalMovieCardsSlideshow moviesList={moviesList}/>}
      <Footer/>
    </>
  )
}

export default App
