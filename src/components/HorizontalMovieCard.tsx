/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from "../types/types"
import '../style/HorizontalMovieCard.css'

function HorizontalMovieCard ({movie, moviesBg} : {movie : IMovie, moviesBg : string}){
    return (
        <article className="horizontalMovieCard">
            <div className="mainPicContainer">
                <img className="mainPic" src={movie.Poster}/>
            </div>
            <h3>{movie.Title}</h3>
            <div>{movie.Released} {movie.Runtime} {movie.Rated}</div>
            <span className="plot">
                {movie.Plot}
            </span>

        </article>
    )
}

export default HorizontalMovieCard