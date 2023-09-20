/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from "../types/types"
import '../style/HorizontalMovieCard.css'

function HorizontalMovieCard ({movie, moviesBg} : {movie : IMovie, moviesBg : string}){
    return (
        <article className="horizontalMovieCard">
            <div className="mainPicContainer">
                <img className="mainPic" src={movie.Poster}/>
                <div className="moviePositionContainer">
                    <div className="moviePositionBar"></div>
                </div>
            </div>
            <div className="playAddMoreContainer">
                <div className="playContainer">
                    <a href="#" style={{height:'48px', borderRadius:'300px'}}><img style={{height:'48px', boxShadow:'0px 4px 8px #00000066', borderRadius:'300px'}} src="playbutton.png"/></a>
                </div>
                <div className="addMoreContainer">
                    <a style={{height:'36px', width:'36px'}} href="#"><img src="addbutton.png"/></a>
                    <a style={{height:'36px', width:'36px'}} href="#"><img src="morebutton.png"/></a>
                </div>
            </div>
            <div className="movieInfosContainer">
                <h3>{movie.Title}</h3>
                <div>{movie.Released} {movie.Runtime} {movie.Rated}</div>
                <span className="plot">
                    {movie.Plot}
                </span>
            </div>

        </article>
    )
}

export default HorizontalMovieCard