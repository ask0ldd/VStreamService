/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import OmdbKey from '../../env'

function useAPI(requestDefinition : IRequestDefinition){

    const [fetchedDatas, setFetchedDatas] = useState<IMovie>()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    useEffect(() => {
        if (!requestDefinition == null) return

        async function fetchDatas (){

            setError(false)
            setLoading(true)

            try{
                const request = composeRequestURL(requestDefinition)
                console.log(request)
                const response = await fetch(request)
                const datas = await response.json()
                setFetchedDatas(datas)
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }
        }

        fetchDatas()

    }, [requestDefinition])

    return [isLoading, fetchedDatas, isError]
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
    if(requestDefinition.searchBy === 'id') return `http://www.omdbapi.com/?i=${requestDefinition.id}&apikey=${OmdbKey}`
    return `http://www.omdbapi.com/?t=${requestDefinition.title}&apikey=${OmdbKey}`
}

export default useAPI