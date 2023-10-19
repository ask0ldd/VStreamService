/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import Header from '../components/Header'
import VerticalMovieCardsSlideshow from '../components/VerticalMovieCardsSlideshow'
import useAPI from '../hooks/useAPI'
import { IMovie } from '../types/types'
import './App.css'
import HorizontalMovieCardsSlideshow from '../components/HorizontalMovieCardsSlideshow'
import Footer from '../components/Footer'
import LoadingAnimation from '../components/LoadingAnimation'
import { useEffect, useRef } from 'react'

function App() {

  const bannerSlideshowPosition = useRef<number>(0)

  // const {isLoading, fetchedDatas, isError} = useAPI({id:'tt3230854', longPlot:false})
  const {isLoading, fetchedDatas, isError} = useAPI({idList:['tt1869454', 'tt6718170', 'tt2906216', 'tt7631058', 'tt5433140', 'tt8111088'], longPlot:false})
  let moviesList : IMovie[] = []
  if(fetchedDatas != null && !Array.isArray(fetchedDatas)) moviesList.push({...fetchedDatas})
  if(fetchedDatas != null && Array.isArray(fetchedDatas)) moviesList = [...fetchedDatas]

  // interstellar / shinmaskedrider / revenant / tunetueraspoint / thenightofthehunter / sheershivraaj
  const {isLoading : isL, fetchedDatas : fd, isError : isE} = useAPI({idList:['tt7631058', 'tt14689620', 'tt9777666', 'tt3973768', 'tt0816692', 'tt14379088', 'tt1663202', 'tt2119532', 'tt0048424', 'tt17274522'], longPlot:false})
  let moviesList2 : IMovie[] = []
  if(fd != null && !Array.isArray(fd)) moviesList2.push({...fd})
  if(fd != null && Array.isArray(fd)) moviesList2 = [...fd]

  function nextBanner(){
    bannerSlideshowPosition.current -= 1440
    if(bannerSlideshowPosition.current === -2880-1440) bannerSlideshowPosition.current = 0
    const imgs : HTMLElement[] = Array.from(document.querySelectorAll('.banner'))
    if(imgs.length < 1) return
    imgs.forEach(img => img.style.transform = "translateX("+ bannerSlideshowPosition.current +"px)")
  }

  useEffect(() => {
    const loop = window.setInterval(nextBanner, 6000)

    return () => {
      clearInterval(loop)
    }
  }, [])

  return (
    <>
      <Header/>
      <main>
        <section className='bannersSection' onClick={nextBanner}>
          <img src="./banners/darkknight2.jpg" className='banner'/>
          <img src="./banners/darkknight3.jpg" className='banner'/>
          <img src="./banners/darkknight.jpg" className='banner'/>
        </section>
        {isLoading && <LoadingAnimation/>}
        {!isLoading && !isError && <VerticalMovieCardsSlideshow title={{icon : 'icons/fire.png', title : 'Currently Trending'}} moviesList={moviesList}/>}
        <div style={{height:'4rem'}}></div>
        {!isLoading && !isError && <VerticalMovieCardsSlideshow title={{icon : 'icons/award.png', title : 'Most Nominated Movies'}} moviesList={[...moviesList].reverse()}/>}
        <div style={{height:'4rem'}}></div>
        {isL && <LoadingAnimation/>}
        {!isL && !isE && <HorizontalMovieCardsSlideshow moviesList={moviesList2}/>}
        <div style={{height:'4rem'}}></div>
        {!isL && !isE && <HorizontalMovieCardsSlideshow moviesList={[...moviesList2].reverse()}/>}
      </main>
      <Footer/>
    </>
  )
}

export default App
