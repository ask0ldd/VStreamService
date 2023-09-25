import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import './Movie.css'

function Movie(){

    const [activeSeason, setActiveSeason] = useState<number>(1)

    function videoStart(){
        const video = document.querySelector('video') as HTMLVideoElement
        // sets video source src only when hovering the card => video lazy loading
        const source = video.querySelector('source')
        if(source && source.getAttribute('src') == null) {
            source.setAttribute('src', source.getAttribute('data-src') as string)
            video.load()
        }
        if(video.currentTime === 0) video.play()
    }

    // delayed video start
    useEffect(() => {
        setTimeout(() => {
            videoStart()
        } , 3000)
    },[])

    return(
        <>
            <Header/>
            <main className="moviePage">
                <section className="moviePContainer">
                    <div className="bigPlayContainer">
                        <img role="button" src="../buttons/bigPlayButton.png" className="bigPlayButton"/>
                    </div>
                    <div className="movieInfosGroup">
                        <h2>THE BOYS</h2>
                        <ul className="genresContainer">
                            <li>Action</li>
                            <li>-</li>
                            <li>Comedy</li>
                            <li>-</li>
                            <li>Crime</li>
                            <li>-</li>
                            <li>Sci-Fi</li>
                        </ul>
                        <span className="plot">
                            The Boys is set in a universe where super-powered individuals are recognized 
                            as heroes by the general public and work for a powerful corporation known as 
                            Vought International, which markets and monetizes them. Outside of their heroic 
                            personas, most are arrogant, selfish, and corrupt. The series primarily focuses 
                            on two groups: the Seven, Vought's premier superhero team, and the Boys, 
                            vigilantes looking to bring down Vought and its fake superheroes.
                        </span>
                        <ul className="tagsList">
                            <li>
                                7.5
                                <svg style={{marginTop:'-1.25px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                </svg>
                            </li>
                            <li>2019</li>
                            <li>PG-13</li>
                            <li>HDR</li>
                            <li>UHD</li>
                        </ul>
                    </div>
                    <video muted loop autoPlay>
                        <source data-src="../videos/theboyss3.mp4" type="video/mp4"/>
                    </video>
                </section>
                <section className="episodesList">

                    <ul className="seasonsContainer">
                        <li onClick={() => setActiveSeason(1)} className={activeSeason === 1 ? "seasonTag active" : "seasonTag inactive"}>Season 1</li>
                        <li onClick={() => setActiveSeason(2)} className={activeSeason === 2 ? "seasonTag active" : "seasonTag inactive"}>Season 2</li>
                        <li onClick={() => setActiveSeason(3)} className={activeSeason === 3 ? "seasonTag active" : "seasonTag inactive"}>Season 3</li>
                    </ul>

                    <article>
                        <figure>
                            <img src="../theboys-1x1.png"/>
                            <div className="timePositionContainer">
                                <div className="timePositionBlueBar"></div>
                            </div>
                        </figure>
                        <div className="episodeInfosContainer">
                            <h3>S1.E1 ∙ The Name of the Game</h3>
                            <ul>
                                <li>
                                    8.9
                                    <svg style={{marginTop:'-1.25px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>
                                </li>
                                <li>2019</li>
                                <li>PG-13</li>
                                <li>45 min</li>
                            </ul>
                            <p>
                                You and a guest are invited to the premiere of DAWN OF THE SEVEN this Tuesday at 7PM in Vought Tower’s 
                                Lamplighter Memorial Theater! Screening will be followed by a Q&A with director Adam Bourke and an after-party 
                                with Supe DJ Malchemical on the turntables! Join us for the greatest true origin story ever told about America’s 
                                number one Superhero team and see how the legend began!
                            </p>
                            <div className="episodesButtonsContainer">
                                <img src="/buttons/likebutton.png"/>
                                <img src="/buttons/dislikebutton.png"/>
                                <img src="/buttons/addbutton.png"/>
                                <img src="/buttons/morebutton.png"/>
                                <img src="/buttons/play.png"/>
                            </div>
                        </div>
                    </article>

                    <article>
                        <figure>
                            <img style={{filter:'saturate(0.9) contrast(0.9) brightness(1.1)'}} src="../theboys-1x2.png"/>
                            <div className="timePositionContainer">
                                <div className="timePositionBlueBar"></div>
                            </div>
                        </figure>
                        <div className="episodeInfosContainer">
                            <h3>S1.E2 ∙ Cherry</h3>
                            <ul>
                                <li>
                                    8.9
                                    <svg style={{marginTop:'-1.25px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>
                                </li>
                                <li>2019</li>
                                <li>PG-13</li>
                                <li>45 min</li>
                            </ul>
                            <p>
                                You and a guest are invited to the premiere of DAWN OF THE SEVEN this Tuesday at 7PM in Vought Tower’s 
                                Lamplighter Memorial Theater! Screening will be followed by a Q&A with director Adam Bourke and an after-party 
                                with Supe DJ Malchemical on the turntables! Join us for the greatest true origin story ever told about America’s 
                                number one Superhero team and see how the legend began!
                            </p>
                            <div className="episodesButtonsContainer">
                                <img src="/buttons/likebutton.png"/>
                                <img src="/buttons/dislikebutton.png"/>
                                <img src="/buttons/addbutton.png"/>
                                <img src="/buttons/morebutton.png"/>
                                <img src="/buttons/play.png"/>
                            </div>
                        </div>
                    </article>

                    <article>
                        <figure>
                            <img style={{filter:'saturate(0.8) contrast(0.82) brightness(1.2)'}} src="../theboys-1x3.png"/>
                            <div className="timePositionContainer">
                                <div className="timePositionBlueBar"></div>
                            </div>
                        </figure>
                        <div className="episodeInfosContainer">
                            <h3>S1.E3 ∙ Get Some</h3>
                            <ul>
                                <li>
                                    8.9
                                    <svg style={{marginTop:'-1.25px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>
                                </li>
                                <li>2019</li>
                                <li>PG-13</li>
                                <li>45 min</li>
                            </ul>
                            <p>
                                You and a guest are invited to the premiere of DAWN OF THE SEVEN this Tuesday at 7PM in Vought Tower’s 
                                Lamplighter Memorial Theater! Screening will be followed by a Q&A with director Adam Bourke and an after-party 
                                with Supe DJ Malchemical on the turntables! Join us for the greatest true origin story ever told about America’s 
                                number one Superhero team and see how the legend began!
                            </p>
                            <div className="episodesButtonsContainer">
                                <img src="/buttons/likebutton.png"/>
                                <img src="/buttons/dislikebutton.png"/>
                                <img src="/buttons/addbutton.png"/>
                                <img src="/buttons/morebutton.png"/>
                                <img src="/buttons/play.png"/>
                            </div>
                        </div>
                    </article>

                    <article>
                        <figure>
                            <img src="../theboys-1x1.png"/>
                        </figure>
                        <div className="episodeInfosContainer">
                            <h3>S1.E4 ∙ The Female of the Species</h3>
                            <ul>
                                <li>
                                    8.9
                                    <svg style={{marginTop:'-1.25px'}} xmlns="http://www.w3.org/2000/svg" fill="#1A98FF" height="1em" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>
                                </li>
                                <li>2019</li>
                                <li>PG-13</li>
                                <li>45 min</li>
                            </ul>
                            <p>
                                You and a guest are invited to the premiere of DAWN OF THE SEVEN this Tuesday at 7PM in Vought Tower’s 
                                Lamplighter Memorial Theater! Screening will be followed by a Q&A with director Adam Bourke and an after-party 
                                with Supe DJ Malchemical on the turntables! Join us for the greatest true origin story ever told about America’s 
                                number one Superhero team and see how the legend began!
                            </p>
                            <div className="episodesButtonsContainer">
                                <img src="/buttons/likebutton.png"/>
                                <img src="/buttons/dislikebutton.png"/>
                                <img src="/buttons/addbutton.png"/>
                                <img src="/buttons/morebutton.png"/>
                                <img src="/buttons/play.png"/>
                            </div>
                        </div>
                    </article>

                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Movie

// <img className="mainMoviePic" src="/theboys.jpg"/>