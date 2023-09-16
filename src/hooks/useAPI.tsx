import { useEffect, useState } from "react"

function useAPI(requestDefinition : IRequestDefinition){

    const [fetchedData, setFetchedData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    useEffect(() => {
        if (!requestDefinition == null) return
        const request = composeRequestURL(requestDefinition)

        async function fetchDatas (){
            try{

            }catch(error){

            }
        }

        fetchDatas()

    }, [requestDefinition])
}

interface IRequestDefinition {
    searchBy : string, 
    id? : string, 
    title ?: string, 
    longPlot : boolean
}

interface IMovie {
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

const composeRequestURL = (requestDefinition : IRequestDefinition) : string => {
    if(requestDefinition.searchBy === 'id') return `http://www.omdbapi.com/?i=${requestDefinition.id}&apikey=${process.env.OmdbKey}`
    return `http://www.omdbapi.com/?t=${requestDefinition.title}&apikey=${process.env.OmdbKey}`
}
