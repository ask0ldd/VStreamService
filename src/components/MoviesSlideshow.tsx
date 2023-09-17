import { IMovie } from "../types/types"
import '../style/MoviesSlideshow.css'

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
        if(arrow.parentElement) arrow.parentElement.scrollBy({
            left: 462,
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        
        <section>
            <h2>Currently Trending</h2>
            <div className="moviesContainer">
                <img onClick={scrollRight} className="arrow" src="arrow-right.svg"/>
                {moviesList.map(movie => (
                    <article key={movie.imdbID} className="movieCard">
                        <h3>{movie.Title}</h3>
                        <img className="posterImg" src={movie.Poster}/>
                        <img className="movieBgImg" src={moviesBg[movie.imdbID]}/>
                    </article>
                ))}
                {moviesList.map(movie => (
                    <article key={movie.imdbID} className="movieCard">
                        <h3>{movie.Title}</h3>
                        <img className="posterImg" src={movie.Poster}/>
                        <img className="movieBgImg" src={moviesBg[movie.imdbID]}/>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default MoviesSlideshow

interface IMoviesBg {
    [key: string]: string;
  }