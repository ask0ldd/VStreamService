import { IMovie, IMoviesMedias } from "../types/types"
import HorizontalMovieCard from "./HorizontalMovieCard"
import '../style/HorizontalMovieCardsSlideshow.css'

function HorizontalMovieCardsSlideshow({moviesList}: {moviesList : IMovie[]}){

    const cardWidthPlusGap = 320+32

    const moviesMedias : IMoviesMedias = {
        'tt1869454' : {poster : 'goodomens2.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4'}, 
        'tt6718170' : {poster : 'supermariobros.jpg', horizontalPic : 'thelastofus.jpg', video : 'supermariobros.mp4'},
        'tt2906216' : {poster : 'dnd.jpg', horizontalPic : 'thelastofus.jpg', video : 'dnd.mp4'}, 
        'tt7631058' : {poster : 'ringsofpower.jpg', horizontalPic : 'thelastofus.jpg', video : 'ringsofpower.mp4'},  
        'tt5433140' : {poster : 'fastx.jpg', horizontalPic : 'thelastofus.jpg', video : 'fastx.mp4'},  
        'tt8111088' : {poster : 'goodomens2.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4'}, 
    }

    function scrollRight(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: cardWidthPlusGap*3,
            top: 0,
            behavior: 'smooth'
        })
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(cardWidthPlusGap*3),
            top: 0,
            behavior: 'smooth'
        })
    }

    return(
        <section className="horizontalCardsSlideshow">
            <h2>Currently Trending</h2>
            <div className="moviesArrowsContainer">
                <div className="arrowsContainer">
                    <div onClick={scrollLeft} className="leftArrowContainer">
                        <img className="leftArrow" alt="previous movies" src="arrow-right.svg"/>
                    </div>
                    <div onClick={scrollRight} className="rightArrowContainer">
                        <img className="rightArrow" role="button" alt="next movies" src="arrow-right.svg"/>
                    </div>
                </div>
                <div className="moviesContainer" onScroll={(e) => {e.preventDefault()}} onWheel={(e) => {e.preventDefault()}}>
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesMedias[movie.imdbID].horizontalPic}/>
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesMedias[movie.imdbID].horizontalPic}/>
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesMedias[movie.imdbID].horizontalPic}/>
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesMedias[movie.imdbID].horizontalPic}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HorizontalMovieCardsSlideshow