/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from "../types/types"
import '../style/HorizontalMovieCard.css'
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { updateWatchList } from "../redux/moviesSlice"

function HorizontalMovieCard ({movie, movieMedias/*, moviesBg*/} : {movie : IMovie, movieMedias : {poster: string, horizontalPic : string, video : string}}){
    
    const dispatch = useTypedDispatch()
    const watchList  = useTypedSelector((state) => state.movies.watchList)

    return (
        <article className="horizontalMovieCard">
            <div className="mainPicContainer">
                <img className="mainPic" src={'horizontalCardPic/' + movieMedias.horizontalPic}/>
                <div className="moviePositionContainer">
                    <div className="moviePositionBar"></div>
                </div>
            </div>
            <div className="playAddMoreContainer">
                <div className="playContainer">
                    <a href="#" style={{height:'48px', borderRadius:'300px'}}><img style={{height:'48px', boxShadow:'0px 4px 8px #00000066', borderRadius:'300px'}} src="buttons/playbutton.png"/></a>
                </div>
                <div className="addMoreContainer">
                    <img className="addButton" role="button" src={watchList.includes(movie.imdbID) ? "buttons/okbutton.png" : "buttons/addbutton.png"} onClick={() => dispatch(updateWatchList({id : movie.imdbID}))}/>
                    <a style={{height:'36px', width:'36px'}} href="#"><img src="buttons/morebutton.png"/></a>
                </div>
            </div>
            <div className="movieInfosContainer">
                <h3>{movie.Title}</h3>
                <div>{movie.Released.split(' ')[2]}&nbsp;&nbsp;{movie.Runtime}&nbsp;&nbsp;{movie.Rated}</div>
                <span className="plot">
                    {movie.Plot}
                </span>
            </div>

        </article>
    )
}

export default HorizontalMovieCard