import { IMovie, IMoviesMedias } from "../types/types"
import '../style/VerticalMovieCardsSlideshow.css'
import VerticalMovieCard from "./VerticalMovieCard"
import { useRef, useState } from "react"

function VerticalMovieCardsSlideshow({title, moviesList}: {title : {icon : string, title : string}, moviesList : IMovie[]}) {

    // use an observable to track the scroll position and update the pagination ?

    const cardWidthPlusGap = 225+32

    const [currentSlideshowPage, setCurrentSlideshowPage] = useState<number>(1)
    const moviesContainerRef = useRef<HTMLDivElement>(null)
    // useref used cause no refresh wanted
    const slideshowLeftScrolled = useRef<number>(0)

    const moviesMedias : IMoviesMedias = {
        'tt1869454' : {poster : 'goodomens2.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4'}, 
        'tt6718170' : {poster : 'supermariobros.jpg', horizontalPic : 'thelastofus.jpg', video : 'supermariobros.mp4'},
        'tt2906216' : {poster : 'dnd.jpg', horizontalPic : 'thelastofus.jpg', video : 'dnd.mp4'}, 
        'tt7631058' : {poster : 'ringsofpower.jpg', horizontalPic : 'thelastofus.jpg', video : 'ringsofpower.mp4'},  
        'tt5433140' : {poster : 'fastx.jpg', horizontalPic : 'thelastofus.jpg', video : 'fastx.mp4'},  
        'tt8111088' : {poster : '', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4'}, 
    }

    function scrollRight(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        // const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = e.currentTarget.parentElement?.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: cardWidthPlusGap*4,
            top: 0,
            behavior: 'smooth'
        })
        if(moviesContainer?.scrollLeft !== undefined) {
            slideshowLeftScrolled.current = moviesContainer.scrollLeft
            const activeSlideshowPage = Math.floor((moviesContainer.scrollLeft +  cardWidthPlusGap*4) / (cardWidthPlusGap * 4 ))+1
            console.log(moviesContainer.scrollLeft, activeSlideshowPage)
            if(activeSlideshowPage !== currentSlideshowPage) setCurrentSlideshowPage(activeSlideshowPage)
        }
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        // const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = e.currentTarget.parentElement?.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(cardWidthPlusGap*4),
            top: 0,
            behavior: 'smooth'
        })
        if(moviesContainer?.scrollLeft !== undefined) {
            slideshowLeftScrolled.current = moviesContainer.scrollLeft
            const activeSlideshowPage = Math.floor((moviesContainer.scrollLeft -  cardWidthPlusGap*4) / (cardWidthPlusGap * 4 ))+1
            console.log(moviesContainer.scrollLeft, activeSlideshowPage)
            if(activeSlideshowPage !== currentSlideshowPage) setCurrentSlideshowPage(activeSlideshowPage)
        }
    }

    // pagination should reply to onscroll to take into account the center method of the card component ?

    return (
        <section className="verticalCardsSlideshow">
            <div className="titleContainer">
                <img src={title.icon}/>
                <h2>{title.title}</h2>
                <span>See more</span>
                <div className="paginationContainer">
                    <div className={currentSlideshowPage === 1 ? "dot active" : "dot"}></div>
                    <div className={currentSlideshowPage === 2 ? "dot active" : "dot"}></div>
                    <div className={currentSlideshowPage === 3 ? "dot active" : "dot"}></div>
                    <div className={currentSlideshowPage === 4 ? "dot active" : "dot"}></div>
                    <div className={currentSlideshowPage === 5 ? "dot active" : "dot"}></div>
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
                <div ref={moviesContainerRef} className="moviesContainer">
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={index*cardWidthPlusGap}/>
                    ))}
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index + 6} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={(index+6)*cardWidthPlusGap}/>
                    ))}
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index + 12} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={(index+12)*cardWidthPlusGap}/>
                    ))}
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index + 18} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={(index+18)*cardWidthPlusGap}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VerticalMovieCardsSlideshow