import OmdbKey from "../../env"
import { IMovie } from "../types/types"

/* eslint-disable @typescript-eslint/no-unused-vars */
export class APIRequestsManager {
    /* c8 ignore start */
    static async getMovieByTitle(title : string, longPlot : boolean) : Promise<IMovie>{
        const longPlotExtension = longPlot === true ? '&plot=full' : ''
        const requestUrl = `https://www.omdbapi.com/?t=${title}&apikey=${OmdbKey}${longPlotExtension}`
        const response = await fetch(requestUrl)
        const datas = await response.json()
        return datas
    }
    /* c8 ignore stop */

    static async getMovieById(id : string, longPlot : boolean) : Promise<IMovie>{
        const longPlotExtension = longPlot === /* c8 ignore next */ true ? '&plot=full' : ''
        const requestUrl = `https://www.omdbapi.com/?i=${id}&apikey=${OmdbKey}${longPlotExtension}`
        const response = await fetch(requestUrl)
        const datas = await response.json()
        return datas
    }

    static async getMoviesById(idList : string[], longPlot : boolean) : Promise<IMovie[]>{
        const longPlotExtension = longPlot === /* c8 ignore next */ true ? '&plot=full' : ''
        const moviesList : IMovie[] = []
        // use promiseall instead ?
        for(const movieId of idList) {
            const requestUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${OmdbKey}${longPlotExtension}`
            const response = await fetch(requestUrl)
            const datas = await response.json()
            moviesList.push(datas)
        }
        return moviesList
    }

}

/*const composeRequestURL = (requestDefinition : IRequestDefinition) : string => {
    const longPlot = requestDefinition.longPlot === true ? '&plot=full' : ''
    if(requestDefinition.searchBy === 'id') return `http://www.omdbapi.com/?i=${requestDefinition.id}&apikey=${OmdbKey}${longPlot}`
    return `http://www.omdbapi.com/?t=${requestDefinition.title}&apikey=${OmdbKey}${longPlot}`
}*/

