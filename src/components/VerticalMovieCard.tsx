import { IMovie } from "../types/types"
import '../style/VerticalMovieCard.css'

function VerticalMovieCard({movie, moviesBg, xPosition} : {movie : IMovie, moviesBg : string, xPosition:number}){

    const movieGenres = movie.Genre.split(', ')
    //const cardWidthPlusGap = 225+32
    const cardWidthOpenPlusGap = 475+32

    function centerCard(event : React.MouseEvent<HTMLElement>) {
        if(event.currentTarget.parentElement == null) return
        const slideShow = event.currentTarget.parentElement
        const scrollingPosition = slideShow.scrollLeft
        if(xPosition < scrollingPosition) slideShow.scrollBy({
            left: xPosition - scrollingPosition,
            top: 0,
            behavior: 'smooth'
        })

        if(xPosition + cardWidthOpenPlusGap > scrollingPosition + slideShow.clientWidth) slideShow.scrollBy({
            left: xPosition + cardWidthOpenPlusGap - (scrollingPosition + slideShow.clientWidth),
            top: 0,
            behavior: 'smooth'
        })
    }

    return(
        <article key={movie.imdbID} className="movieCard" onMouseEnter={(e) => centerCard(e)}>
            <div className="ratingWatchlistAddContainer">
                <div className="ratingTag">
                    {movie.imdbRating}
                    <svg style={{marginTop:'-1.5px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                </div>
                <div className="addWatchlistContainer">
                    + Add To Watchlist
                </div>
            </div>
            <div className="movieInfoContainer">
                <h3>{movie.Title}</h3>
                <div style={{marginTop:'6px'}} className="genreTagsContainer">
                    {movieGenres.map(genre => { return(<div className="genreTag">{genre}</div>) })}
                </div>
                <p className="plotContainer">{movie.Plot}</p>
            </div>
            <img className="posterImg" src={movie.Poster}/>
            <img className="movieBgImg" src={moviesBg}/>
            <div className="playContainerBorder">
                <a href="#" style={{height:'64px', borderRadius:'300px'}}><img style={{boxShadow:'0px 4px 8px #00000066', borderRadius:'300px'}} src="playbutton.png"/></a>
            </div>
        </article>
    )
}

export default VerticalMovieCard