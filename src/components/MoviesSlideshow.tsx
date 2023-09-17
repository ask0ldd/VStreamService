import { IMovie } from "../services/APIRequestsManager"

function MoviesSlideshow({moviesList}: {moviesList : IMovie[]}) {
    return (
        <section>
            {moviesList.map(movie => (<img key={movie.imdbID} src={movie.Poster}/>))}
        </section>
    )
}

export default MoviesSlideshow