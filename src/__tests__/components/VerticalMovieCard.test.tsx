/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import store from "../../redux/store"
import { IMovie, IMoviesMedias } from "../../types/types"
import VerticalMovieCard from "../../components/VerticalMovieCard"

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <VerticalMovieCard movieMedias={moviesMedias[mockedMovie.imdbID]} movie={mockedMovie} xPosition={0}/>
            </BrowserRouter>
        </Provider>
    )
}

describe('Horizontal Slideshow Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('Card infos are displayed', async () => {
        await waitFor(() => expect(screen.getByText(mockedMovie.Title)).toBeInTheDocument())
        expect(screen.getByText(mockedMovie.Plot)).toBeInTheDocument()
        expect(screen.getByText(mockedMovie.imdbRating)).toBeInTheDocument()
        expect(screen.getByText("+ Add To Watchlist")).toBeInTheDocument()
    })

    // add to watchlist

    test('Add to watchlist', async() =>  {
        await waitFor(() => expect(screen.getByText(mockedMovie.Title)).toBeInTheDocument())
        const addtoWatchlistButton = screen.getByText("+ Add To Watchlist") as HTMLElement
        act(() => addtoWatchlistButton.click())
        await waitFor(() => expect(addtoWatchlistButton.innerText).toBe('Remove from WatchList'))
        act(() => addtoWatchlistButton.click())
        await waitFor(() => expect(addtoWatchlistButton.innerText).toBe('+ Add To Watchlist'))
    })
})

const mockedMovie : IMovie = {
    Title: "Good Omens",
    Year: "2019–2023",
    Rated: "TV-MA",
    Released: "31 May 2019",
    Runtime: "328 min",
    Genre: "Comedy, Fantasy",
    Director: "N/A",
    Writer: "Neil Gaiman",
    Actors: "David Tennant, Michael Sheen, Miranda Richardson",
    Plot: "Now exiled from Heaven and Hell, Aziraphale and Crowley must team up once again after the mysterious arrival of a familiar face.",
    Language: "English",
    Country: "United Kingdom, United States",
    Awards: "Nominated for 3 Primetime Emmys. 5 wins & 14 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzNhY2JkMTctZjM5Ny00OGIxLWJhOWMtMzYxYzllOTZhMTY4XkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "8.0/10" }],
    Metascore: "N/A",
    imdbRating: "8.0",
    imdbVotes: "104,703",
    imdbID: "tt1869454",
    Type: "series",
    totalSeasons: "2",
    Response: "True",
  }

  const moviesMedias : IMoviesMedias = {
    'tt1869454' : {poster : 'goodomens2sm.jpg', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
    'tt6718170' : {poster : 'supermariobrossm.jpg', horizontalPic : 'thelastofus.jpg', video : 'supermariobros.mp4', watchedPercentage : 0},
    'tt2906216' : {poster : 'dndsm.jpg', horizontalPic : 'thelastofus.jpg', video : 'dnd.mp4', watchedPercentage : 0}, 
    'tt7631058' : {poster : 'ringsofpowersm.jpg', horizontalPic : 'thelastofus.jpg', video : 'ringsofpower.mp4', watchedPercentage : 0},  
    'tt5433140' : {poster : 'fastxsm.jpg', horizontalPic : 'thelastofus.jpg', video : 'fastx.mp4', watchedPercentage : 0},  
    'tt8111088' : {poster : '', horizontalPic : 'thelastofus.jpg', video : 'goodomens2.mp4', watchedPercentage : 0}, 
}