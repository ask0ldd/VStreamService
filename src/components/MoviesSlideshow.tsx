import { IMovie } from "../types/types"
import '../style/MoviesSlideshow.css'

function MoviesSlideshow({moviesList}: {moviesList : IMovie[]}) {
    return (
        
        <section>
            <h2>Currently Trending</h2>
            <div className="moviesContainer">
                {moviesList.map(movie => (
                    <article className="movieCard">
                        <img className="posterImg" key={movie.imdbID} src={movie.Poster}/>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default MoviesSlideshow