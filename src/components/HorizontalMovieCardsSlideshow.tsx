import { IMovie, IMoviesBg } from "../types/types"
import HorizontalMovieCard from "./HorizontalMovieCard"
import '../style/HorizontalMovieCardsSlideshow.css'

function HorizontalMovieCardsSlideshow({moviesList}: {moviesList : IMovie[]}){

    const cardWidthPlusGap = 320+32

    const moviesBg : IMoviesBg = {
        'tt3230854' : 'theexpanse2.jpg', 
        'tt0804484' : 'foundation.png', 
        'tt14688458' : 'silo.jpg', 
        'tt11280740' : 'severance.jpg', 
        'tt3581920' : 'thelastofus.jpg', 
        'tt8111088' : 'mandalorian.jpg',
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
                <div className="moviesContainer">
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HorizontalMovieCardsSlideshow