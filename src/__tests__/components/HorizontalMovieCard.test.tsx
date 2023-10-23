/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import store from "../../redux/store"
import { IMovie } from "../../types/types"
import HorizontalMovieCard from "../../components/HorizontalMovieCard"

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <HorizontalMovieCard movie={mockedMovie} movieMedias={{poster : 'interstellarsm.jpg', horizontalPic : 'interstellarsm.jpg', video : 'goodomens2.mp4', watchedPercentage : 85}}/>
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
        expect(screen.getByAltText("more options")).toBeInTheDocument()
        expect(screen.getByAltText("add to watchlist")).toBeInTheDocument()
    })
})

const mockedMovie : IMovie = {
    Title: "The Lord of the Rings: The Rings of Power",
    Year: "2022–",
    Rated: "TV-14",
    Released: "01 Sep 2022",
    Runtime: "N/A",
    Genre: "Action, Adventure, Drama",
    Director: "N/A",
    Writer: "Patrick McKay, John D. Payne",
    Actors: "Morfydd Clark, Mike Wood, Ismael Cruz Cordova",
    Plot: "Epic drama set thousands of years before the events of J.R.R. Tolkien's 'The Hobbit' and 'The Lord of the Rings' follows an ensemble cast of characters, both familiar and new, as they confront the long-feared re-emergence of evil ...",
    Language: "English, Sindarin",
    Country: "United States",
    Awards: "Nominated for 6 Primetime Emmys. 13 wins & 30 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNTg3NjcxYzgtYjljNC00Y2I2LWE3YmMtOTliZTkwYTE1MmZiXkEyXkFqcGdeQXVyNTY4NDc5MDE@._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "7.0/10" }],
    Metascore: "N/A",
    imdbRating: "7.0",
    imdbVotes: "339,250",
    imdbID: "tt7631058",
    Type: "series",
    totalSeasons: "1",
    Response: "True",
  }