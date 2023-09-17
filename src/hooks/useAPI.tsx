/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { APIRequestsManager } from "../services/APIRequestsManager"
import { IMovie, IRequestDefinition } from "../types/types"

function useAPI(requestDefinition : IRequestDefinition){

    const [fetchedDatas, setFetchedDatas] = useState<IMovie | IMovie[]>()
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
                if(requestDefinition.idList != null) datas = await APIRequestsManager.getMoviesById(requestDefinition.idList, requestDefinition.longPlot)
                setFetchedDatas(datas)
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }
        }

        fetchDatas()

    }, [requestDefinition.id, requestDefinition.title])

    return {isLoading, fetchedDatas, isError}
}

export default useAPI