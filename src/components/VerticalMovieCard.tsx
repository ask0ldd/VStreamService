import { IMovie } from "../types/types"
import '../style/VerticalMovieCard.css'

function VerticalMovieCard({movie, moviesBg} : {movie : IMovie, moviesBg : string}){
    return(
        <article key={movie.imdbID} className="movieCard">
            <div className="movieInfoContainer">
                <h3>{movie.Title}</h3>
                <p>{movie.Plot}</p>
            </div>
            <img className="posterImg" src={movie.Poster}/>
            <img className="movieBgImg" src={moviesBg}/>
        </article>
    )
}

export default VerticalMovieCard