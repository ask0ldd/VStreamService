import { IMovie } from "../types/types"
import '../style/VerticalMovieCard.css'

function VerticalMovieCard({movie, moviesBg} : {movie : IMovie, moviesBg : string}){

    const movieGenres = movie.Genre.split(', ')

    return(
        <article key={movie.imdbID} className="movieCard">
            <div className="movieInfoContainer">
                <h3>{movie.Title}</h3>
                <div style={{marginTop:'6px'}} className="genreTagsContainer">
                    {movieGenres.map(genre => { return(<div className="genreTag">{genre}</div>) })}
                </div>
                <p style={{marginTop:'9px'}}>{movie.Plot}</p>
            </div>
            <img className="posterImg" src={movie.Poster}/>
            <img className="movieBgImg" src={moviesBg}/>
        </article>
    )
}

export default VerticalMovieCard