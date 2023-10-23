/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import store from "../../redux/store"
import { IMovie } from "../../types/types"
import { vi } from "vitest"
import VerticalMovieCardsSlideshow from "../../components/VerticalMovieCardsSlideshow"

const cardWidthPlusGap = 225 + 32
const nMoviesJumpedWhenScrolling = 4

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <VerticalMovieCardsSlideshow title={{icon : 'icons/fire.png', title : 'Generic Title'}} moviesList={[...mockMovieList, ...mockMovieList, ...mockMovieList, ...mockMovieList]}/>
            </BrowserRouter>
        </Provider>
    )
}

// recoding the useful part of scrollby
interface ScrollOptions {
    left?: number
    top?: number
    behavior?: "auto" | "instant" | "smooth";
}
  
interface ScrollContainer extends HTMLElement{
    scrollBy(options?: ScrollOptions): void;
    scrollBy(x: number, y: number): void;
    scrollTo(options?: ScrollOptions): void;
    scrollTo(x: number, y: number): void;
}

function mockedScrollBy (this: ScrollContainer, x: number | ScrollOptions = 0, y: number = 0){ 
    this.scrollLeft = typeof x === "object" ? this.scrollLeft + (x.left || 0) : this.scrollLeft + x || 0
    this.scrollTop = typeof x === "object" ? this.scrollTop + (x.top || 0) : this.scrollTop + x || 0
    this.dispatchEvent(new Event('scroll'))
}
window.HTMLElement.prototype.scrollBy = vi.fn(mockedScrollBy)

function mockedScrollTo (this: ScrollContainer, x: number | ScrollOptions = 0, y: number = 0){ 
    this.scrollLeft = typeof x === "object" ? x.left || 0 : x || 0
    this.scrollTop = typeof x === "object" ? x.top || 0 : y || 0
    this.dispatchEvent(new Event('scroll'))
}
window.HTMLElement.prototype.scrollTo = vi.fn(mockedScrollTo)

describe('Vertical Slideshow Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('All the cards are displayed', async () => {
        await waitFor(() => expect(screen.getByText('Generic Title')).toBeInTheDocument())
        expect(screen.getAllByAltText(mockMovieList[0].Title+' miniature').length).toBe(2 * 4)
        expect(screen.getAllByAltText(mockMovieList[1].Title+' miniature').length).toBe(2 * 4)
        expect(screen.getAllByAltText(mockMovieList[2].Title+' miniature').length).toBe(2 * 4)
        expect(screen.getAllByAltText(mockMovieList[3].Title+' miniature').length).toBe(2 * 4)
        expect(screen.getAllByAltText(mockMovieList[4].Title+' miniature').length).toBe(2 * 4)
        expect(screen.getAllByAltText(mockMovieList[5].Title+' miniature').length).toBe(2 * 4)
        expect(screen.getAllByText(mockMovieList[0].Title.split(':')[0]).length).toBe(2 * 4)
        expect(screen.getAllByText(mockMovieList[1].Title.split(':')[0]).length).toBe(2 * 4)
        expect(screen.getAllByText(mockMovieList[2].Title.split(':')[0]).length).toBe(2 * 4)
        expect(screen.getAllByText(mockMovieList[3].Title.split(':')[0]).length).toBe(2 * 4)
        expect(screen.getAllByText(mockMovieList[4].Title.split(':')[0]).length).toBe(2 * 4)
        expect(screen.getAllByText(mockMovieList[5].Title.split(':')[0]).length).toBe(2 * 4)
    })

})

const mockMovieList: IMovie[] = [
  {
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
  },
  {
    Title: "The Super Mario Bros. Movie",
    Year: "2023",
    Rated: "PG",
    Released: "05 Apr 2023",
    Runtime: "92 min",
    Genre: "Animation, Adventure, Comedy",
    Director: "Aaron Horvath, Michael Jelenic, Pierre Leduc",
    Writer: "Matthew Fogel",
    Actors: "Chris Pratt, Anya Taylor-Joy, Charlie Day",
    Plot: "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
    Language: "English",
    Country: "United States, Japan",
    Awards: "N/A",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.1/10" },
      { Source: "Rotten Tomatoes", Value: "59%" },
      { Source: "Metacritic", Value: "46/100" },
    ],
    Metascore: "46",
    imdbRating: "7.1",
    imdbVotes: "197,202",
    imdbID: "tt6718170",
    Type: "movie",
    DVD: "16 May 2023",
    BoxOffice: "$574,934,330",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Dungeons & Dragons: Honor Among Thieves",
    Year: "2023",
    Rated: "PG-13",
    Released: "31 Mar 2023",
    Runtime: "134 min",
    Genre: "Action, Adventure, Comedy",
    Director: "John Francis Daley, Jonathan Goldstein",
    Writer: "Jonathan Goldstein, John Francis Daley, Michael Gilio",
    Actors: "Chris Pine, Michelle Rodriguez, Regé-Jean Page",
    Plot: "A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
    Language: "English",
    Country:
      "United States, Canada, United Kingdom, Iceland, Ireland, Australia",
    Awards: "3 nominations",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.3/10" },
      { Source: "Metacritic", Value: "72/100" },
    ],
    Metascore: "72",
    imdbRating: "7.3",
    imdbVotes: "188,760",
    imdbID: "tt2906216",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$93,277,026",
    Production: "Paramount Pictures",
    Website: "N/A",
    Response: "True",
  },
  {
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
  },
  {
    Title: "Fast X",
    Year: "2023",
    Rated: "PG-13",
    Released: "19 May 2023",
    Runtime: "141 min",
    Genre: "Action, Adventure, Crime",
    Director: "Louis Leterrier",
    Writer: "Dan Mazeau, Justin Lin, Zach Dean",
    Actors: "Vin Diesel, Michelle Rodriguez, Jason Statham",
    Plot: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
    Language: "English",
    Country: "United States, China, Japan",
    Awards: "2 nominations",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "5.8/10" },
      { Source: "Rotten Tomatoes", Value: "56%" },
      { Source: "Metacritic", Value: "56/100" },
    ],
    Metascore: "56",
    imdbRating: "5.8",
    imdbVotes: "97,529",
    imdbID: "tt5433140",
    Type: "movie",
    DVD: "09 Jun 2023",
    BoxOffice: "$145,960,660",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Mandalorian",
    Year: "2019–2023",
    Rated: "TV-14",
    Released: "12 Nov 2019",
    Runtime: "40 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "N/A",
    Writer: "Jon Favreau",
    Actors: "Pedro Pascal, Chris Bartlett, Katee Sackhoff",
    Plot: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    Language: "English",
    Country: "United States",
    Awards: "Won 14 Primetime Emmys. 58 wins & 135 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "8.7/10" }],
    Metascore: "N/A",
    imdbRating: "8.7",
    imdbVotes: "561,106",
    imdbID: "tt8111088",
    Type: "series",
    totalSeasons: "3",
    Response: "True",
  },
];