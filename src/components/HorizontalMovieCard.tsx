/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from "../types/types"
import '../style/HorizontalMovieCard.css'
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { updateWatchList } from "../redux/moviesSlice"
import { Link } from "react-router-dom"

function HorizontalMovieCard ({movie, movieMedias/*, moviesBg*/} : {movie : IMovie, movieMedias : {poster: string, horizontalPic : string, video : string}}){
    
    const dispatch = useTypedDispatch()
    const watchList  = useTypedSelector((state) => state.movies.watchList)

    function addtoWatchList(e : React.MouseEvent<HTMLElement>, id : string){
        e.preventDefault()
        e.stopPropagation()
        dispatch(updateWatchList({id : id}))
    }

    return (
        <Link className="horizontalCardLink" role="button" to={"/movie/"+movie.imdbID}>
            <article className="horizontalMovieCard">
                <div className="mainPicContainer">
                    <img className="mainPic" src={'horizontalCardPic/' + movieMedias.horizontalPic}/>
                    <div className="moviePositionContainer">
                        <div className="moviePositionBar"></div>
                    </div>
                </div>
                <div className="playAddMoreContainer">
                    <div className="playContainer">
                        <img style={{height:'48px', boxShadow:'0px 4px 8px #00000066', borderRadius:'300px'}} src="buttons/playbutton.png"/>
                    </div>
                    <div className="addMoreContainer">
                        <img className="addButton" role="button" src={watchList.includes(movie.imdbID) ? "buttons/okbutton.png" : "buttons/addbutton.png"} onClick={(e) => addtoWatchList(e, movie.imdbID)}/>
                        <img src="buttons/morebutton.png"/>
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
        </Link>
    )
}

export default HorizontalMovieCard