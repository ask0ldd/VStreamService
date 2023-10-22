/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie, IMoviesMedias } from "../types/types"
import HorizontalMovieCard from "./HorizontalMovieCard"
import '../style/HorizontalMovieCardsSlideshow.css'
import { useRef, useState } from "react"

function HorizontalMovieCardsSlideshow({moviesList, slideshowTitle}: {moviesList : IMovie[], slideshowTitle: string}){

    const movies : IMovie[] = [...moviesList]

    const cardWidthPlusGap = 320 + 32
    const nMoviesJumpedWhenScrolling = 3
    
    let scrollXPosition = 0
    const paginationStops : number[] = []
    while(scrollXPosition < cardWidthPlusGap * movies.length){
        paginationStops.push(scrollXPosition)
        scrollXPosition += cardWidthPlusGap * nMoviesJumpedWhenScrolling
    }

    const [currentSlideshowPage, setCurrentSlideshowPage] = useState<number>(1)
    const moviesContainerRef = useRef<HTMLDivElement>(null)
    // useref used cause no refresh wanted
    const slideshowLeftScrolled = useRef<number>(0)
    // avoid the scroll event to be taken into account a dozen times when going from X1 to X2
    const ignoreScrolling = useRef<boolean>(false)

    // add time positon to each items in the movielist

    function scrollToStop(e : React.MouseEvent<HTMLElement>, stopIndex : number){
        e.preventDefault()
        const moviesContainer = e.currentTarget.parentElement?.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollTo({
            left: paginationStops[stopIndex - 1],
            top: 0,
            behavior: 'smooth'
        })
    }

    function scrollRight(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: cardWidthPlusGap * nMoviesJumpedWhenScrolling,
            top: 0,
            behavior: 'smooth',
        })
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(cardWidthPlusGap * nMoviesJumpedWhenScrolling),
            top: 0,
            behavior: 'smooth'
        })
    }

    // pagination can only be updated every 0.3s : ignore dozens of scroll events during the scrolling process
    function updatePagination(e : React.UIEvent<HTMLDivElement, UIEvent>){
        if(ignoreScrolling.current === true) return
        ignoreScrolling.current = true
        const currentTarget = e.currentTarget
        setTimeout(()=>{
            // console.log("pagination update")
            slideshowLeftScrolled.current = currentTarget.scrollLeft
            let i = 1
            paginationStops.forEach(stop => {
                if(slideshowLeftScrolled.current <= stop) return setCurrentSlideshowPage(i)
                i++
            })
            ignoreScrolling.current = false
        }, 300)
    }

    return(
        <section className="horizontalCardsSlideshow">
            <div className="titlenDotsContainer">
                <h2>{slideshowTitle}</h2>
                <div className="paginationContainer">
                    {   // pagination dots
                        paginationStops.map((_, index) => 
                            <div key={'dot'+index} className={currentSlideshowPage === index + 1 ? "dot active" : "dot"} onClick={(e) => scrollToStop(e, index + 1)}></div>)
                    }
                </div>
            </div>
            <div className="moviesArrowsContainer">
                <div className="arrowsContainer">
                    <div onClick={scrollLeft} className="leftArrowContainer">
                        <img className="leftArrow" alt="previous movies" src="arrow-right.svg"/>
                    </div>
                    <div onClick={scrollRight} className="rightArrowContainer">
                        <img className="rightArrow" role="button" alt="next movies" src="arrow-right.svg"/>
                    </div>
                </div>
                <div ref={moviesContainerRef} className="moviesContainer" onScroll={updatePagination}>
                    {movies.map((movie, index) => (
                        <HorizontalMovieCard key={movie.imdbID+'1'+index} movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {/*moviesList.map(movie => (
                        <HorizontalMovieCard key={movie.imdbID+'2'} movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))*/}
                </div>
            </div>
        </section>
    )
}

export default HorizontalMovieCardsSlideshow

// !!! TODO passive event fix : wheel
// https://stackoverflow.com/questions/63663025/react-onwheel-handler-cant-preventdefault-because-its-a-passive-event-listenev

const moviesMedias : IMoviesMedias = {
    'tt0816692' : {poster : 'interstellarsm.jpg', horizontalPic : 'interstellarsm.jpg', video : 'goodomens2.mp4', watchedPercentage : 85}, 
    'tt14379088' : {poster : 'shinmaskedridersm.jpg', horizontalPic : 'shinmaskedridersm.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
    'tt1663202' : {poster : 'revenantsm.jpg', horizontalPic : 'revenant.jpg', video : 'goodomens2sm.mp4', watchedPercentage : 60}, 
    'tt2119532' : {poster : 'tunetueraspointsm.jpg', horizontalPic : 'tunetueraspointsm.jpg', video : 'goodomens2.mp4', watchedPercentage : 95}, 
    'tt0048424' : {poster : 'thenightofthehuntersm.jpg', horizontalPic : 'thenightofthehuntersm.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
    'tt17274522' : {poster : 'sheershivraajsm.jpg', horizontalPic : 'sheershivraajsm.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
    'tt14689620' : {poster : 'vampireacademysm.jpg', horizontalPic : 'vampireacademysm.jpg', video : 'goodomens2.mp4', watchedPercentage : 25}, 
    'tt9777666' : {poster : 'thetomorrowwarsm.jpg', horizontalPic : 'thetomorrowwarsm.jpg', video : 'goodomens2.mp4', watchedPercentage : 80}, 
    'tt3973768' : {poster : 'handofgodsm.jpg', horizontalPic : 'handofgodsm.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
    'tt7631058' : {poster : 'ringsofpowersm.jpg', horizontalPic : 'ringsofpowersm.jpg', video : 'goodomens2.mp4', watchedPercentage : 12}, 
}