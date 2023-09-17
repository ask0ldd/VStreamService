import OmdbKey from "../../env"

/* eslint-disable @typescript-eslint/no-unused-vars */
export class APIRequestsManager {
    static async getMovieByTitle(title : string, longPlot : boolean){
        const longPlotExtension = longPlot === true ? '&plot=full' : ''
        const requestUrl = `http://www.omdbapi.com/?t=${title}&apikey=${OmdbKey}${longPlotExtension}`
        console.log(requestUrl)
        const response = await fetch(requestUrl)
        const datas = await response.json()
        return datas
    }

    static async getMovieById(id : string, longPlot : boolean){
        const longPlotExtension = longPlot === true ? '&plot=full' : ''
        const requestUrl = `http://www.omdbapi.com/?i=${id}&apikey=${OmdbKey}${longPlotExtension}`
        console.log(requestUrl)
        const response = await fetch(requestUrl)
        const datas = await response.json()
        return datas
    }

}

/*const composeRequestURL = (requestDefinition : IRequestDefinition) : string => {
    const longPlot = requestDefinition.longPlot === true ? '&plot=full' : ''
    if(requestDefinition.searchBy === 'id') return `http://www.omdbapi.com/?i=${requestDefinition.id}&apikey=${OmdbKey}${longPlot}`
    return `http://www.omdbapi.com/?t=${requestDefinition.title}&apikey=${OmdbKey}${longPlot}`
}*/

interface IRequestDefinition {
    id? : string, 
    title ?: string, 
    longPlot : boolean
}