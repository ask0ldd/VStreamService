import { IMovie, IMoviesMedias } from "../types/types"
import HorizontalMovieCard from "./HorizontalMovieCard"
import '../style/HorizontalMovieCardsSlideshow.css'

function HorizontalMovieCardsSlideshow({moviesList}: {moviesList : IMovie[]}){

    const cardWidthPlusGap = 320+32

    const moviesMedias : IMoviesMedias = {
        'tt0816692' : {poster : 'interstellarsm.jpg', horizontalPic : 'interstellarsm.jpg', video : 'goodomens2.mp4'}, 
        'tt14379088' : {poster : 'shinmaskedridersm.jpg', horizontalPic : 'shinmaskedridersm.jpg', video : 'goodomens2.mp4'}, 
        'tt1663202' : {poster : 'revenantsm.jpg', horizontalPic : 'revenant.jpg', video : 'goodomens2sm.mp4'}, 
        'tt2119532' : {poster : 'tunetueraspointsm.jpg', horizontalPic : 'tunetueraspointsm.jpg', video : 'goodomens2.mp4'}, 
        'tt0048424' : {poster : 'thenightofthehuntersm.jpg', horizontalPic : 'thenightofthehuntersm.jpg', video : 'goodomens2.mp4'}, 
        'tt17274522' : {poster : 'sheershivraajsm.jpg', horizontalPic : 'sheershivraajsm.jpg', video : 'goodomens2.mp4'}, 
        'tt14689620' : {poster : 'vampireacademysm.jpg', horizontalPic : 'vampireacademysm.jpg', video : 'goodomens2.mp4'}, 
        'tt9777666' : {poster : 'thetomorrowwarsm.jpg', horizontalPic : 'thetomorrowwarsm.jpg', video : 'goodomens2.mp4'}, 
        'tt3973768' : {poster : 'handofgodsm.jpg', horizontalPic : 'handofgodsm.jpg', video : 'goodomens2.mp4'}, 
        'tt7631058' : {poster : 'ringsofpowersm.jpg', horizontalPic : 'ringsofpowersm.jpg', video : 'goodomens2.mp4'}, 
    }

    // add time positon to each items in the movielist

    function scrollRight(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: cardWidthPlusGap*3,
            top: 0,
            behavior: 'smooth'
        })
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = arrow.parentElement?.parentElement?.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(cardWidthPlusGap*3),
            top: 0,
            behavior: 'smooth'
        })
    }

    return(
        <section className="horizontalCardsSlideshow">
            <h2>Currently Trending</h2>
            <div className="moviesArrowsContainer">
                <div className="arrowsContainer">
                    <div onClick={scrollLeft} className="leftArrowContainer">
                        <img className="leftArrow" alt="previous movies" src="arrow-right.svg"/>
                    </div>
                    <div onClick={scrollRight} className="rightArrowContainer">
                        <img className="rightArrow" role="button" alt="next movies" src="arrow-right.svg"/>
                    </div>
                </div>
                <div className="moviesContainer" onScroll={(e) => {e.preventDefault()}} onWheel={(e) => {e.preventDefault()}}>
                    {moviesList.map(movie => (
                        <HorizontalMovieCard key={movie.imdbID+'1'} movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard key={movie.imdbID+'2'} movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard key={movie.imdbID+'3'} movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                    {moviesList.map(movie => (
                        <HorizontalMovieCard key={movie.imdbID+'4'} movie={movie} movieMedias={moviesMedias[movie.imdbID]} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HorizontalMovieCardsSlideshow

// !!! TODO passive event fix : wheel
// https://stackoverflow.com/questions/63663025/react-onwheel-handler-cant-preventdefault-because-its-a-passive-event-listenev