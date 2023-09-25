import { IMovie } from "../types/types"
import '../style/VerticalMovieCard.css'
import { useRef } from "react"
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { updateWatchList } from "../redux/moviesSlice"
import { Link } from "react-router-dom"

function VerticalMovieCard({movie, movieMedias, /*moviesBg, */ xPosition} : {movie : IMovie, movieMedias : {poster: string, horizontalPic : string, video : string}, xPosition:number}){

    const movieGenres = movie.Genre.split(', ')
    const cardWidthOpenPlusGap = 475+32
    const hoverStatus = useRef(false)
    const timeoutID = useRef<ReturnType<typeof setTimeout>>()

    const dispatch = useTypedDispatch()
    const watchList  = useTypedSelector((state) => state.movies.watchList)

    // ---
    // if a hovered card is partially non visible, the slideshow is scrolled to display the missing area
    // ---
    function centerCard(event : React.MouseEvent<HTMLElement>) {
        if(event.currentTarget.parentElement == null) return
        const slideShow = event.currentTarget.parentElement
        const scrollingPosition = slideShow.scrollLeft
        hoverStatus.current = true

        timeoutID.current = setTimeout(() => {
            // if the cursor is out of the card
            if(hoverStatus.current === false) return

            // if the left hovered card isn't fully visible
            if(xPosition < scrollingPosition) 
            slideShow.scrollBy({
                left: xPosition - scrollingPosition,
                top: 0,
                behavior: 'smooth'
            })

            // if the right hovered card isn't fully visible
            if(xPosition + cardWidthOpenPlusGap > scrollingPosition + slideShow.clientWidth) 
            slideShow.scrollBy({
                left: xPosition + cardWidthOpenPlusGap - (scrollingPosition + slideShow.clientWidth),
                top: 0,
                behavior: 'smooth'
            })

            hoverStatus.current = false
        }, 500)
    }

    function startVideo(event : React.MouseEvent<HTMLElement>){
        const video = event.currentTarget.querySelector('video') as HTMLVideoElement
        // sets video source src only when hovering the card => video lazy loading
        const source = video.querySelector('source')
        if(source && source.getAttribute('src') == null) {
            source.setAttribute('src', source.getAttribute('data-src') as string)
            video.load()
        }
        if(video.currentTime === 0) video.play()
    }

    function stopVideo(event : React.MouseEvent<HTMLElement>){
        const video = event.currentTarget.querySelector('video') as HTMLVideoElement
        if(video.currentTime !== 0) {
            video.pause()
            video.currentTime = 0
        }
    }

    function addtoWatchList(e : React.MouseEvent<HTMLElement>, id : string){
        e.preventDefault()
        e.stopPropagation()
        dispatch(updateWatchList({id : id}))
    }

    return(
        <Link className="horizontalCardLink" role="button" to={"/movie/"+movie.imdbID} onMouseOver={(e) => startVideo(e)} key={movie.imdbID} onMouseEnter={(e) => centerCard(e)} onMouseLeave={(e) => {hoverStatus.current = false; clearTimeout(timeoutID.current); stopVideo(e)}}>
            <article className="movieCard">
                <div className="ratingWatchlistAddContainer">
                    <div className="ratingTag">
                        {movie.imdbRating}
                        <svg style={{marginTop:'-1.5px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                    </div>
                    <div className="addWatchlistContainer" onClick={(e) => addtoWatchList(e, movie.imdbID)}>
                        {watchList.includes(movie.imdbID) ? "Remove from WatchList" : "+ Add To Watchlist"}
                    </div>
                </div>
                <div className="movieInfoContainer">
                    <h3>{movie.Title.includes(':') ? movie.Title.split(':')[0] : movie.Title}</h3>
                    <div style={{marginTop:'4px'}} className="genreTagsContainer">
                        {movieGenres.map(genre => { return(<div className="genreTag">{genre}</div>) })}
                    </div>
                    <p className="plotContainer">{movie.Plot.length < 200 ? movie.Plot : movie.Plot.slice(0, 200) + '...'}</p>
                </div>
                <img className="posterImg" src={movieMedias.poster === '' ? movie.Poster : 'verticalCardPic/' + movieMedias.poster}/>
                <video muted loop>
                    <source data-src={"videos/" + movieMedias.video} type="video/mp4"/>
                </video>
                {/*<img className="movieBgImg" src={moviesBg}/>*/}
                <div className="playContainerBorder">
                    <a href="#" style={{height:'64px', borderRadius:'300px'}}><img style={{boxShadow:'0px 4px 8px #00000066', borderRadius:'300px'}} src="buttons/playbutton.png"/></a>
                </div>
            </article>
        </Link>
    )
}

export default VerticalMovieCard