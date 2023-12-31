import { IEpisode } from "../types/types"
import '../style/EpisodeRow.css'
import { MouseEvent } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
function EpisodeRow({episode} : {episode : IEpisode}){

    function showButtons(e : MouseEvent<HTMLElement>, visible : boolean){
        if(visible) return e.currentTarget.querySelector('.episodesButtonsContainer')?.classList.add("translateButtonsContainerToPlace")
        e.currentTarget.querySelector('.episodesButtonsContainer')?.classList.remove("translateButtonsContainerToPlace")
    }

    return(
        <article data-testid="episode-row" id={"episodeCard"+episode.episode} onMouseOver={(e : MouseEvent<HTMLElement>) => showButtons(e, true)} onMouseLeave={(e : MouseEvent<HTMLElement>) => showButtons(e, false)}>
            <figure>
                <img src={"../"+episode.picture}/>
            </figure>
            <div className="episodeInfosContainer">
                <h3>{`S${episode.season}.E${episode.episode} ∙ ${episode.title}`}</h3>
                <ul>
                    <li>
                        {episode.imdbRating}
                        <svg style={{marginTop:'-1.25px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                    </li>
                    <li>{episode.releaseYear}</li>
                    <li>{episode.rating}</li>
                    <li>{episode.runningTime} min</li>
                </ul>
                <p>
                    {episode.plot}
                </p>
                <div data-testid="episode-buttons-container" className="episodesButtonsContainer">
                    <img role="button" src="../buttons/likebutton.png"/>
                    <img role="button" src="../buttons/dislikebutton.png"/>
                    <img role="button" src="../buttons/addbutton.png"/>
                    <img role="button" src="../buttons/morebutton.png"/>
                    <img role="button" src="../buttons/play.png"/>
                </div>
            </div>
        </article>
    )
}

export default EpisodeRow