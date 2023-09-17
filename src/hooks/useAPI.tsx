/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import OmdbKey from '../../env'
import { APIRequestsManager } from "../services/APIRequestsManager"

function useAPI(requestDefinition : IRequestDefinition){

    const [fetchedDatas, setFetchedDatas] = useState<IMovie>()
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isError, setError] = useState<boolean>(false)

    useEffect(() => {
        if (!requestDefinition == null) return

        async function fetchDatas (){

            setError(false)
            setLoading(true)
            let datas

            try{
                if(requestDefinition.title != null) datas =  await APIRequestsManager.getMovieByTitle(requestDefinition.title, requestDefinition.longPlot) 
                if(requestDefinition.id != null) datas = await APIRequestsManager.getMovieById(requestDefinition.id, requestDefinition.longPlot)
                setFetchedDatas(datas)
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }
        }

        fetchDatas()

    }, [JSON.stringify(requestDefinition)])

    return {isLoading, fetchedDatas, isError}
}

interface IRequestDefinition {
    /*searchBy : string, */
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

export default useAPI