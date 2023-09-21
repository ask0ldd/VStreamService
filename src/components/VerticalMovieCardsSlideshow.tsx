import { IMovie, IMoviesMedias } from "../types/types"
import '../style/VerticalMovieCardsSlideshow.css'
import VerticalMovieCard from "./VerticalMovieCard"

function VerticalMovieCardsSlideshow({moviesList}: {moviesList : IMovie[]}) {

    const cardWidthPlusGap = 225+32

    const moviesMedias : IMoviesMedias = {
        'tt1869454' : {poster : 'goodomens2.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4'}, 
        'tt6718170' : {poster : 'supermariobros.jpg', horizontalPic : 'thelastofus.jpg', video : 'supermariobros.mp4'},
        'tt2906216' : {poster : 'dnd.jpg', horizontalPic : 'thelastofus.jpg', video : 'dnd.mp4'}, 
        'tt7631058' : {poster : 'ringsofpower.jpg', horizontalPic : 'thelastofus.jpg', video : 'ringsofpower.mp4'},  
        'tt5433140' : {poster : 'fastx.jpg', horizontalPic : 'thelastofus.jpg', video : 'fastx.mp4'},  
        'tt8111088' : {poster : 'goodomens2.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4'}, 
    }

    function scrollRight(e : React.MouseEvent<HTMLElement>){
        //console.log('scroll')
        e.preventDefault()
        // const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = document.querySelector('.moviesContainer')
        //console.log(moviesContainer)
        moviesContainer?.scrollBy({
            left: cardWidthPlusGap*4,
            top: 0,
            behavior: 'smooth'
        })
    }

    function scrollLeft(e : React.MouseEvent<HTMLElement>){
        e.preventDefault()
        // const arrow = e.currentTarget as HTMLImageElement
        const moviesContainer = document.querySelector('.moviesContainer')
        moviesContainer?.scrollBy({
            left: -(cardWidthPlusGap*4),
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        
        <section className="verticalCardsSlideshow">
            <h2>Currently Trending</h2>
            <div className="moviesArrowsContainer">
                <div className="arrowsContainer">
                    <div className="arrowContainerWrapper">
                        <div onClick={scrollLeft} className="leftArrowContainer">
                            <img className="leftArrow" alt="previous movies" src="arrow-right.svg"/>
                        </div>
                    </div>
                    <div className="arrowContainerWrapper">
                        <div onClick={scrollRight} className="rightArrowContainer">
                            <img className="rightArrow" role="button" alt="next movies" src="arrow-right.svg"/>
                        </div>
                    </div>
                </div>
                <div className="moviesContainer">
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={index*cardWidthPlusGap}/>
                    ))}
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index + 6} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={(index+6)*cardWidthPlusGap}/>
                    ))}
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index + 12} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={(index+12)*cardWidthPlusGap}/>
                    ))}
                    {moviesList.map((movie, index) => (
                        <VerticalMovieCard key={'mc'+ new Date(Date.now()).toLocaleString + index + 18} movieMedias={moviesMedias[movie.imdbID]} movie={movie} xPosition={(index+18)*cardWidthPlusGap}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VerticalMovieCardsSlideshow