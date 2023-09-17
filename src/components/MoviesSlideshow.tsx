import { IMovie } from "../types/types"
import '../style/MoviesSlideshow.css'
import VerticalMovieCard from "./VerticalMovieCard"

function MoviesSlideshow({moviesList}: {moviesList : IMovie[]}) {

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
        const moviesContainer = arrow.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: 225*4+32*4,
            top: 0,
            behavior: 'smooth'
        })
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(225*4+32*4),
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        
        <section>
            <h2>Currently Trending</h2>
            <div className="moviesArrowsContainer">
                <img onClick={scrollRight} className="rightArrow" role="button" alt="next movies" src="arrow-right.svg"/>
                <img onClick={scrollLeft} className="leftArrow" alt="previous movies" src="arrow-right.svg"/>
                <div className="moviesContainer">
                    {moviesList.map(movie => (
                        <VerticalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                    {moviesList.map(movie => (
                        <VerticalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                    {moviesList.map(movie => (
                        <VerticalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                    {moviesList.map(movie => (
                        <VerticalMovieCard movie={movie} moviesBg={moviesBg[movie.imdbID]}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MoviesSlideshow

export interface IMoviesBg {
    [key: string]: string;
  }