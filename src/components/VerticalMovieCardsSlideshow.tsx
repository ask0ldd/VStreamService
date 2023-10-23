/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie, IMoviesMedias } from "../types/types"
import '../style/VerticalMovieCardsSlideshow.css'
import VerticalMovieCard from "./VerticalMovieCard"
import { useRef, useState } from "react"

function VerticalMovieCardsSlideshow({title, moviesList}: {title : {icon : string, title : string}, moviesList : IMovie[]}) {

    const quadrupleMovieList = [...moviesList, ...moviesList]

    // use an observable to track the scroll position and update the pagination ?
    const cardWidthPlusGap = 225 + 32
    const nMoviesJumpedWhenScrolling = 4
    // const paginationStops = [0, 4*cardWidthPlusGap, 8*cardWidthPlusGap, 12*cardWidthPlusGap, 16*cardWidthPlusGap, 20*cardWidthPlusGap]
    // scrollx stops : 0 / 1028 / 2056 / 3084 / 4112 / 5140 => 6 groups of 4 cards  
    
    let scrollXPosition = 0
    const paginationStops : number[] = []
    while(scrollXPosition < cardWidthPlusGap * quadrupleMovieList.length){
        paginationStops.push(scrollXPosition)
        scrollXPosition += cardWidthPlusGap * nMoviesJumpedWhenScrolling
    }

    const [currentSlideshowPage, setCurrentSlideshowPage] = useState<number>(1)
    const moviesContainerRef = useRef<HTMLDivElement>(null)
    // useref used cause no refresh wanted
    const slideshowLeftScrolled = useRef<number>(0)
    // avoid the scroll event to be taken into account a dozen times when going from X1 to X2
    const ignoreScrolling = useRef<boolean>(false)

    const moviesMedias : IMoviesMedias = {
        'tt1869454' : {poster : 'goodomens2sm.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
        'tt6718170' : {poster : 'supermariobrossm.jpg', horizontalPic : 'thelastofus.jpg', video : 'supermariobros.mp4', watchedPercentage : 0},
        'tt2906216' : {poster : 'dndsm.jpg', horizontalPic : 'thelastofus.jpg', video : 'dnd.mp4', watchedPercentage : 0}, 
        'tt7631058' : {poster : 'ringsofpowersm.jpg', horizontalPic : 'thelastofus.jpg', video : 'ringsofpower.mp4', watchedPercentage : 0},  
        'tt5433140' : {poster : 'fastxsm.jpg', horizontalPic : 'thelastofus.jpg', video : 'fastx.mp4', watchedPercentage : 0},  
        'tt8111088' : {poster : '', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
    }

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
        // not using document.querySelector cause multiple similar elements with the same class
        const moviesContainer = e.currentTarget.parentElement?.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: cardWidthPlusGap*4,
            top: 0,
            behavior: 'smooth'
        })
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const moviesContainer = e.currentTarget.parentElement?.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(cardWidthPlusGap*4),
            top: 0,
            behavior: 'smooth'
        })
    }

    // pagination should reply to onscroll to take into account the center method of the card component ?
    function updatePagination(e : React.UIEvent<HTMLDivElement, UIEvent>){
        if(ignoreScrolling.current === true) return
        ignoreScrolling.current = true
        const currentTarget = e.currentTarget
        setTimeout(()=>{
            slideshowLeftScrolled.current = currentTarget.scrollLeft
            let i = 1
            paginationStops.forEach(stop => {
                if(slideshowLeftScrolled.current <= stop) return setCurrentSlideshowPage(i)
                i++
            })
            ignoreScrolling.current = false
        }, 300)
    }

    return (
        <section className="verticalCardsSlideshow">
            <div className="titleContainer">
                <img className="slideshowIcon" src={title.icon}/>
                <h2>{title.title}</h2>
                <span>See more</span>
                <div className="paginationContainer">
                    {   // pagination dots
                        paginationStops.map((_, index) => 
                            <div role="button" key={'dot'+index} className={currentSlideshowPage === index + 1 ? "dot active" : "dot"} onClick={(e) => scrollToStop(e, index + 1)}></div>)
                    }
                </div>
            </div>
            <div className="moviesArrowsContainer">
                <div className="arrowsContainer">
                    <div className="arrowContainerWrapper">
                        <div onClick={scrollLeft} className="leftArrowContainer">
                            <img className="leftArrow" alt="previous movies" src="arrow-right.svg"/>
                        </div>
                    </div>
                    <div className="arrowContainerWrapper">
                        <div onClick={scrollRight} className="rightArrowContainer">
                            <img className="rightArrow" role="button" alt="next movies" src="arrow-right.svg"/>
                        </div>
                    </div>
                </div>
                <div ref={moviesContainerRef} className="moviesContainer" data-testid="movieContainer" onScroll={updatePagination}>
                    {quadrupleMovieList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={index*cardWidthPlusGap}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VerticalMovieCardsSlideshow