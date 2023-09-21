import { IMovie, IMoviesMedias } from "../types/types"
import HorizontalMovieCard from "./HorizontalMovieCard"
import '../style/HorizontalMovieCardsSlideshow.css'

function HorizontalMovieCardsSlideshow({moviesList}: {moviesList : IMovie[]}){

    const cardWidthPlusGap = 320+32

    // interstellar / shinmaskedrider / revenant / tunetueraspoint / thenightofthehunter / sheershivraaj
    const moviesMedias : IMoviesMedias = {
        'tt0816692' : {poster : 'interstellar.jpg', horizontalPic : 'interstellar.jpg', video : 'goodomens2.mp4'}, 
        'tt14379088' : {poster : 'shinmaskedrider.jpg', horizontalPic : 'shinmaskedrider.jpg', video : 'goodomens2.mp4'}, 
        'tt1663202' : {poster : 'revenant.jpg', horizontalPic : 'revenant.jpg', video : 'goodomens2.mp4'}, 
        'tt2119532' : {poster : 'tunetueraspoint.jpg', horizontalPic : 'tunetueraspoint.jpg', video : 'goodomens2.mp4'}, 
        'tt0048424' : {poster : 'thenightofthehunter.jpg', horizontalPic : 'thenightofthehunter.jpg', video : 'goodomens2.mp4'}, 
        'tt17274522' : {poster : 'sheershivraaj.jpg', horizontalPic : 'sheershivraaj.jpg', video : 'goodomens2.mp4'}, 
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
                        <HorizontalMovieCard movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HorizontalMovieCardsSlideshow