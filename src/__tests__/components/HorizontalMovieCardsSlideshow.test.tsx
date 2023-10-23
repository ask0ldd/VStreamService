/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import HorizontalMovieCardsSlideshow from "../../components/HorizontalMovieCardsSlideshow"
import store from "../../redux/store"
import { IMovie } from "../../types/types"
import { vi } from "vitest"

const cardWidthPlusGap = 320 + 32
const nMoviesJumpedWhenScrolling = 3

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <HorizontalMovieCardsSlideshow slideshowTitle="Generic Title" moviesList={[...mockMovieList, ...mockMovieList]}/>
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

describe('Horizontal Slideshow Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('All the cards are displayed', async () => {
        await waitFor(() => expect(screen.getByText('Generic Title')).toBeInTheDocument())
        expect(screen.getAllByAltText(mockMovieList[0].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[1].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[2].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[3].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[4].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[5].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[6].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[7].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[8].Title+' miniature').length).toBe(2)
        expect(screen.getAllByAltText(mockMovieList[9].Title+' miniature').length).toBe(2)
    })

    test('The slideshow scrolling buttons are working', async () => {
        await waitFor(() => expect(screen.getByText('Generic Title')).toBeInTheDocument())
        const scrollRightButton = screen.getByAltText('next movies')
        const scrollLeftButton = screen.getByAltText('previous movies')
        const movieContainer = screen.getByTestId('movieContainer')
        expect(movieContainer.scrollLeft).toBe(0)
        act(() => scrollRightButton.click())
        // test if the pagination & the scrollLeft value gets updated back & forth
        await waitFor(() => expect(movieContainer.scrollLeft).toBe(cardWidthPlusGap * nMoviesJumpedWhenScrolling))
        const paginationButtons = screen.getAllByRole('button').filter(button => button.classList.contains('dot'))
        expect(paginationButtons.length).toBe(7)
        await waitFor(() => expect(paginationButtons[1].classList.contains('active')).toBeTruthy())
        expect(paginationButtons[0].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[2].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[3].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[4].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[5].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[6].classList.contains('active')).toBeFalsy()
        act(() => scrollLeftButton.click())
        await waitFor(() => expect(movieContainer.scrollLeft).toBe(0))
        await waitFor(() => expect(paginationButtons[0].classList.contains('active')).toBeTruthy())
        expect(paginationButtons[1].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[2].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[3].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[4].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[5].classList.contains('active')).toBeFalsy()
        expect(paginationButtons[6].classList.contains('active')).toBeFalsy()
    })

    test('Browsing through the pagination dots', async() => {
        await waitFor(() => expect(screen.getByText('Generic Title')).toBeInTheDocument())
        const movieContainer = screen.getByTestId('movieContainer')
        expect(movieContainer.scrollLeft).toBe(0)
        const paginationButtons = screen.getAllByRole('button').filter(button => button.classList.contains('dot'))
        expect(paginationButtons.length).toBe(7)
        expect(paginationButtons[0].classList.contains('active')).toBeTruthy()
        act(() => paginationButtons[1].click())
        await waitFor(() => expect(paginationButtons[1].classList.contains('active')).toBeTruthy())
        expect(movieContainer.scrollLeft).toBe(cardWidthPlusGap * nMoviesJumpedWhenScrolling)
    })

})

const mockMovieList: IMovie[] = [
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
    Title: "Vampire Academy",
    Year: "2022",
    Rated: "TV-MA",
    Released: "15 Sep 2022",
    Runtime: "N/A",
    Genre: "Drama, Fantasy",
    Director: "N/A",
    Writer: "Marguerite MacIntyre, Julie Plec",
    Actors: "Sisi Stringer, Daniela Nieves, Kieron Moore",
    Plot: "In a world of privilege and glamour, two young women's friendship transcends their strikingly different classes as they prepare to complete their education and enter royal vampire society.",
    Language: "English",
    Country: "United States",
    Awards: "1 win",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDE1NzhmYTUtYWQwNy00NzNmLWJmNjktNzRlNDBiMDM4MjhkXkEyXkFqcGdeQXVyMTMxNjUyMDkx._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "6.4/10" }],
    Metascore: "N/A",
    imdbRating: "6.4",
    imdbVotes: "8,647",
    imdbID: "tt14689620",
    Type: "series",
    totalSeasons: "1",
    Response: "True",
  },
  {
    Title: "The Tomorrow War",
    Year: "2021",
    Rated: "PG-13",
    Released: "02 Jul 2021",
    Runtime: "138 min",
    Genre: "Action, Adventure, Drama",
    Director: "Chris McKay",
    Writer: "Zach Dean",
    Actors: "Chris Pratt, Yvonne Strahovski, J.K. Simmons",
    Plot: "A family man is drafted to fight in a future war where the fate of humanity relies on his ability to confront the past.",
    Language: "English",
    Country: "United States",
    Awards: "8 nominations",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNTI2YTI0MWEtNGQ4OS00ODIzLWE1MWEtZGJiN2E3ZmM1OWI1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "6.6/10" },
      { Source: "Rotten Tomatoes", Value: "52%" },
      { Source: "Metacritic", Value: "45/100" },
    ],
    Metascore: "45",
    imdbRating: "6.6",
    imdbVotes: "219,533",
    imdbID: "tt9777666",
    Type: "movie",
    DVD: "02 Jul 2021",
    BoxOffice: "N/A",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Hand of God",
    Year: "2014–2017",
    Rated: "TV-MA",
    Released: "28 Aug 2014",
    Runtime: "60 min",
    Genre: "Crime, Drama",
    Director: "N/A",
    Writer: "Ben Watkins",
    Actors: "Garret Dillahunt, Emayatzy Corinealdi, Julian Acosta",
    Plot: "A morally-corrupt judge suffers a breakdown and believes God is compelling him onto a path of vigilante justice.",
    Language: "English",
    Country: "United States",
    Awards: "1 nomination",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTRhNWFjOGEtNWNlYy00MjlkLTk1MjctN2MxMjE3NGVjZDg0XkEyXkFqcGdeQXVyNjkwNzEwMzU@._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "7.5/10" }],
    Metascore: "N/A",
    imdbRating: "7.5",
    imdbVotes: "11,854",
    imdbID: "tt3973768",
    Type: "series",
    totalSeasons: "2",
    Response: "True",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    Rated: "PG-13",
    Released: "07 Nov 2014",
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    Plot: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    Language: "English",
    Country: "United States, United Kingdom, Canada",
    Awards: "Won 1 Oscar. 44 wins & 148 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.7/10" },
      { Source: "Rotten Tomatoes", Value: "73%" },
      { Source: "Metacritic", Value: "74/100" },
    ],
    Metascore: "74",
    imdbRating: "8.7",
    imdbVotes: "1,995,560",
    imdbID: "tt0816692",
    Type: "movie",
    DVD: "24 May 2016",
    BoxOffice: "$188,020,017",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Shin Kamen Rider",
    Year: "2023",
    Rated: "Not Rated",
    Released: "17 Mar 2023",
    Runtime: "121 min",
    Genre: "Action, Adventure, Drama",
    Director: "Hideaki Anno",
    Writer: "Hideaki Anno, Shotaro Ishinomori",
    Actors: "Sôsuke Ikematsu, Minami Hamabe, Tasuku Emoto",
    Plot: "Hongo Takeshi awakens to discover he has been transformed into a grasshopper-hybrid cyborg. Becoming the Masked Rider, he must fight the mysterious evil organization SHOCKER to protect all of mankind.",
    Language: "Japanese",
    Country: "Japan",
    Awards: "N/A",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZGVlNWNkMjktN2M4NC00NTNhLTlkYmMtNzMzNzY1ZGUzY2IzXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "6.1/10" }],
    Metascore: "N/A",
    imdbRating: "6.1",
    imdbVotes: "2,146",
    imdbID: "tt14379088",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "N/A",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Revenant",
    Year: "2015",
    Rated: "R",
    Released: "08 Jan 2016",
    Runtime: "156 min",
    Genre: "Action, Adventure, Drama",
    Director: "Alejandro G. Iñárritu",
    Writer: "Mark L. Smith, Alejandro G. Iñárritu, Michael Punke",
    Actors: "Leonardo DiCaprio, Tom Hardy, Will Poulter",
    Plot: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
    Language: "English, Pawnee, French",
    Country: "Hong Kong, Taiwan, United States",
    Awards: "Won 3 Oscars. 90 wins & 188 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.0/10" },
      { Source: "Rotten Tomatoes", Value: "78%" },
      { Source: "Metacritic", Value: "76/100" },
    ],
    Metascore: "76",
    imdbRating: "8.0",
    imdbVotes: "845,222",
    imdbID: "tt1663202",
    Type: "movie",
    DVD: "22 Mar 2016",
    BoxOffice: "$183,637,894",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Hacksaw Ridge",
    Year: "2016",
    Rated: "R",
    Released: "04 Nov 2016",
    Runtime: "139 min",
    Genre: "Biography, Drama, History",
    Director: "Mel Gibson",
    Writer: "Robert Schenkkan, Andrew Knight",
    Actors: "Andrew Garfield, Sam Worthington, Luke Bracey",
    Plot: "World War II American Army Medic Desmond T. Doss, serving during the Battle of Okinawa, refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.",
    Language: "English, Japanese",
    Country: "Australia, United States, United Kingdom, China",
    Awards: "Won 2 Oscars. 56 wins & 115 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.1/10" },
      { Source: "Rotten Tomatoes", Value: "84%" },
      { Source: "Metacritic", Value: "71/100" },
    ],
    Metascore: "71",
    imdbRating: "8.1",
    imdbVotes: "570,524",
    imdbID: "tt2119532",
    Type: "movie",
    DVD: "07 Feb 2017",
    BoxOffice: "$67,209,615",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Night of the Hunter",
    Year: "1955",
    Rated: "Not Rated",
    Released: "27 Jul 1955",
    Runtime: "92 min",
    Genre: "Crime, Drama, Film-Noir",
    Director: "Charles Laughton",
    Writer: "Davis Grubb, James Agee, Charles Laughton",
    Actors: "Robert Mitchum, Shelley Winters, Lillian Gish",
    Plot: "A self-proclaimed preacher marries a gullible widow whose young children are reluctant to tell him where their real dad hid the $10,000 he'd stolen in a robbery.",
    Language: "English",
    Country: "United States",
    Awards: "2 wins",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDhjNzhmMTMtZTRkOC00NTdjLTg3N2ItZmQ1ZDU0NGY5OTk5XkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.0/10" },
      { Source: "Rotten Tomatoes", Value: "93%" },
      { Source: "Metacritic", Value: "97/100" },
    ],
    Metascore: "97",
    imdbRating: "8.0",
    imdbVotes: "94,205",
    imdbID: "tt0048424",
    Type: "movie",
    DVD: "16 Jan 2011",
    BoxOffice: "N/A",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Sher Shivraj",
    Year: "2022",
    Rated: "N/A",
    Released: "22 Apr 2022",
    Runtime: "143 min",
    Genre: "Action, Drama, History",
    Director: "Digpal Lanjekar",
    Writer: "Digpal Lanjekar",
    Actors: "Chinmay Mandlekar, Mrinal Kulkarni, Mukesh Rishi",
    Plot: "One of the greatest and bravest incident from the life of The Great Maratha King Chhatrapati Shivaji Maharaj where he defeated Afzalkhan with his brilliant tactics and courage.",
    Language: "Marathi",
    Country: "India",
    Awards: "1 nomination",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYmVmZGViYTQtNzEwMS00ODU1LWJjZjItMzc3YWY4ZDk1NTY3XkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_SX300.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "8.2/10" }],
    Metascore: "N/A",
    imdbRating: "8.2",
    imdbVotes: "2,753",
    imdbID: "tt17274522",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "N/A",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
];