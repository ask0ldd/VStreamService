import { IMovie } from "../types/types"
import '../style/MoviesSlideshow.css'

function MoviesSlideshow({moviesList}: {moviesList : IMovie[]}) {
    return (
        
        <section>
            <h2>Currently Trending</h2>
            <div className="moviesContainer">
                {moviesList.map(movie => (
                    <article key={movie.imdbID} className="movieCard">
                        <h3>{movie.Title}</h3>
                        <img className="posterImg" src={movie.Poster}/>
                        <img className="movieBgImg" src='mandalorian.jpg'/>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default MoviesSlideshow