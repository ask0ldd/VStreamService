export interface IRequestDefinition {
    id ?: string, 
    title ?: string,
    idList ?: string[],
    longPlot : boolean
}

export interface IMovie {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings:{Source:string,Value:string},
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string,
}

export interface IMoviesMedias {
    [key: string]: {poster : string, horizontalPic : string, video : string, watchedPercentage : number};
  }

  export interface IEpisode {
    season : number,
    episode : number,
    picture : string,
    title : string,
    imdbRating : number,
    releaseYear : number,
    plot : string,
    rating : string,
    runningTime : number,
  }