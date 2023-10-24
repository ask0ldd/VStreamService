/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import store from "../../redux/store"
import { IMovie, IMoviesMedias } from "../../types/types"
import VerticalMovieCard from "../../components/VerticalMovieCard"
import { vi } from "vitest"

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <VerticalMovieCard movieMedias={moviesMedias[mockedMovie.imdbID]} movie={mockedMovie} xPosition={0}/>
            </BrowserRouter>
        </Provider>
    )
}

window.HTMLMediaElement.prototype.load = vi.fn(() => {
    (this! as HTMLMediaElement).dispatchEvent(new Event('loadeddata'))
})
window.HTMLMediaElement.prototype.play = vi.fn()
window.HTMLMediaElement.prototype.pause = vi.fn()
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
    get: () => 1
    // vi.fn().mockReturnValue(1)
})
Object.defineProperty(window.HTMLMediaElement.prototype, 'readyState', {
    get: () => 4
})

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

    test('Add to watchlist', async() =>  {
        await waitFor(() => expect(screen.getByText(mockedMovie.Title)).toBeInTheDocument())
        const addtoWatchlistButton = screen.getByText("+ Add To Watchlist") as HTMLElement
        act(() => addtoWatchlistButton.click())
        await waitFor(() => expect(screen.getByText('Remove from WatchList')).toBeInTheDocument())
        act(() => addtoWatchlistButton.click())
        await waitFor(() => expect(screen.getByText("+ Add To Watchlist")).toBeInTheDocument())
    })

    test('Hover is loading an expected video', async() =>  {
        await waitFor(() => expect(screen.getByText(mockedMovie.Title)).toBeInTheDocument())
        const video = screen.getByTestId("video") as HTMLVideoElement
        const source = video.children[0] as HTMLSourceElement
        expect(source.src).toBe('')
        act(() => fireEvent.mouseOver(screen.getAllByRole('button')[0]))
        await waitFor(() => expect(source.src.includes(source.getAttribute('data-src') || 'randomezeaeazezezaezezaezaezazezea')).toBeTruthy())
        // video.play = vi.fn(video.play)
        await waitFor(() => {expect(video.load).toHaveBeenCalled()}, { timeout: 5000 })
        //await waitFor(() => {expect(video.play).toHaveBeenCalled()}, { timeout: 5000 })
        // await waitFor(() => expect(video.readyState).toBe(4), { timeout: 5000 })
        console.log('current', video.currentTime)
        act(() => fireEvent.mouseLeave(screen.getAllByRole('button')[0]))
        // await waitFor(() => {expect(video.pause).toHaveBeenCalled()}, { timeout: 5000 })
        // video.play = vi.fn(video.play)
        // await waitFor(() => {expect(video.stop).toHaveBeenCalled()}, { timeout: 5000 })
    }, 7000)

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