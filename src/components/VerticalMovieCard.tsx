import { IMovie } from "../types/types"
import { IMoviesBg } from "./MoviesSlideshow"

function VerticalMovieCard({movie, moviesBg} : {movie : IMovie, moviesBg : IMoviesBg}){
    return(
        <article key={movie.imdbID} className="movieCard">
            <h3>{movie.Title}</h3>
            <img className="posterImg" src={movie.Poster}/>
            <img className="movieBgImg" src={moviesBg[movie.imdbID]}/>
        </article>
    )
}

export default VerticalMovieCard