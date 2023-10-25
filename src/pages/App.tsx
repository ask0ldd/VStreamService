/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from '../components/Header'
import VerticalMovieCardsSlideshow from '../components/VerticalMovieCardsSlideshow'
import './App.css'
import HorizontalMovieCardsSlideshow from '../components/HorizontalMovieCardsSlideshow'
import Footer from '../components/Footer'
import LoadingAnimation from '../components/LoadingAnimation'
import { useEffect, useRef } from 'react'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { getMoviesLists } from '../redux/moviesSlice'

function App() {

  const dispatch = useTypedDispatch()

  const bannerSlideshowPosition = useRef<number>(0)
  const bannerLoop = useRef<number>(0)
  const movies = useTypedSelector((state) => state.movies)

  function nextBanner(){
    bannerSlideshowPosition.current -= 1440
    if(bannerSlideshowPosition.current === -2880-1440) bannerSlideshowPosition.current = 0
    const imgs : HTMLElement[] = Array.from(document.querySelectorAll('.banner'))
    if(imgs.length < 1) return
    imgs.forEach(img => img.style.transform = "translateX("+ bannerSlideshowPosition.current +"px)")
    // reset the timer when a banner is clicked
    clearInterval(bannerLoop.current)
    bannerLoop.current = window.setInterval(nextBanner, 6000)
  }

  useEffect(() => {
    bannerLoop.current = window.setInterval(nextBanner, 6000)

    // retrieve the moviesLists out of the API and store them into the movie redux slice
    dispatch(getMoviesLists())

    return () => {
      clearInterval(bannerLoop.current)
    }
  }, [])

  return (
    <>
      <Header/>
      <main>
        <section className='bannersSection' onClick={nextBanner}>
          <img src="./banners/darkknight2.jpg" alt="the dark knight batman" className='banner'/>
          <img src="./banners/darkknight3.jpg" alt="the dark knight bane" loading="lazy" className='banner'/>
          <img src="./banners/darkknight.jpg" alt="the dark knight catwoman" loading="lazy" className='banner'/>
        </section>
        {movies.moviesLoading == 'pending' && <LoadingAnimation/>}
        {(movies.moviesLoading == 'succeeded' && movies.moviesError === false) && <VerticalMovieCardsSlideshow title={{icon : 'icons/fire.png', title : 'Currently Trending'}} moviesList={[...movies.moviesLists[0], ...movies.moviesLists[0], ]}/>}
        <div style={{height:'4rem'}}></div>
        {(movies.moviesLoading == 'succeeded' && movies.moviesError === false) && <VerticalMovieCardsSlideshow title={{icon : 'icons/award.png', title : 'Most Nominated Movies'}} moviesList={[...[...movies.moviesLists[0]].reverse(), ...[...movies.moviesLists[0]].reverse()]}/>}
        <div style={{height:'4rem'}}></div>
        {movies.moviesLoading == 'pending' && <LoadingAnimation/>}
        {(movies.moviesLoading == 'succeeded' && movies.moviesError === false) && <HorizontalMovieCardsSlideshow slideshowTitle="Previously Watched" moviesList={[...movies.moviesLists[1], ...movies.moviesLists[1], ]}/>}
        <div style={{height:'4rem'}}></div>
        {(movies.moviesLoading == 'succeeded' && movies.moviesError === false) && <HorizontalMovieCardsSlideshow slideshowTitle="Suggested For You" moviesList={[...[...movies.moviesLists[1]].reverse(), ...[...movies.moviesLists[1]].reverse()]}/>}
      </main>
      <Footer/>
    </>
  )
}

export default App
