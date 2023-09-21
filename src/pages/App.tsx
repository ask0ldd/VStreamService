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
  const {isLoading, fetchedDatas, isError} = useAPI({idList:['tt1869454', 'tt6718170', 'tt2906216', 'tt7631058', 'tt5433140', 'tt8111088'], longPlot:false})
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
