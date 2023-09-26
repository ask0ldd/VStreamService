/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import './Movie.css'
import { IEpisode } from "../types/types"
import EpisodeRow from "../components/EpisodeRow"

function Movie(){

    const [activeSeason, setActiveSeason] = useState<number>(1)
    const [episodesShown, setEpisodesShown] = useState<number>(2)

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

    // sets Intersection Observer displaying more episodes when at the bottom of the page
    useEffect(() => {
        const episodeCard = document.getElementById("episodeCard"+episodesShown)

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('ohohohho')
                    setEpisodesShown(4)
                    observer.disconnect()
                }
            })
        }, options)

        if(episodeCard != null) observer.observe(episodeCard)

        // cleanup
        /*return () => {

        }*/
    }, [])

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
                        <li className="seasonTag inactive" style={{marginLeft:'auto'}}>24 Episodes</li>
                    </ul>

                    {episodesShown > 0 && <EpisodeRow episode={episodes[0]}/>}
                    {episodesShown > 1 && <EpisodeRow episode={episodes[1]}/>}
                    {episodesShown > 2 && <EpisodeRow episode={episodes[2]}/>}
                    {episodesShown > 3 && <EpisodeRow episode={episodes[3]}/>}

                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Movie

// <img className="mainMoviePic" src="/theboys.jpg"/>

const episodes : IEpisode[] = [
    {
        season : 1,
        episode : 1,
        title : 'The Name of the Game',
        picture : 'theboys-1x1.png',
        imdbRating : 8.7,
        releaseYear : 2019,
        plot : `The Boys is set in a universe where super-powered individuals are recognized 
        as heroes by the general public and work for a powerful corporation known as 
        Vought International, which markets and monetizes them. Outside of their heroic 
        personas, most are arrogant, selfish, and corrupt. The series primarily focuses 
        on two groups: the Seven, Vought's premier superhero team, and the Boys, 
        vigilantes looking to bring down Vought and its fake superheroes.`,
        rating : 'PG-13',
        runningTime : 45,
     },
     {
        season : 1,
        episode : 2,
        title : 'Cherry',
        picture : 'theboys-1x2.png',
        imdbRating : 8.7,
        releaseYear : 2019,
        plot : `The Boys is set in a universe where super-powered individuals are recognized 
        as heroes by the general public and work for a powerful corporation known as 
        Vought International, which markets and monetizes them. Outside of their heroic 
        personas, most are arrogant, selfish, and corrupt. The series primarily focuses 
        on two groups: the Seven, Vought's premier superhero team, and the Boys, 
        vigilantes looking to bring down Vought and its fake superheroes.`,
        rating : 'PG-13',
        runningTime : 45,
     },
     {
        season : 1,
        episode : 3,
        title : 'Get Some',
        picture : 'theboys-1x3.png',
        imdbRating : 8.7,
        releaseYear : 2019,
        plot : `The Boys is set in a universe where super-powered individuals are recognized 
        as heroes by the general public and work for a powerful corporation known as 
        Vought International, which markets and monetizes them. Outside of their heroic 
        personas, most are arrogant, selfish, and corrupt. The series primarily focuses 
        on two groups: the Seven, Vought's premier superhero team, and the Boys, 
        vigilantes looking to bring down Vought and its fake superheroes.`,
        rating : 'PG-13',
        runningTime : 45,
     },
     {
        season : 1,
        episode : 3,
        title : 'Female of the Species',
        picture : 'theboys-1x1.png',
        imdbRating : 8.7,
        releaseYear : 2019,
        plot : `The Boys is set in a universe where super-powered individuals are recognized 
        as heroes by the general public and work for a powerful corporation known as 
        Vought International, which markets and monetizes them. Outside of their heroic 
        personas, most are arrogant, selfish, and corrupt. The series primarily focuses 
        on two groups: the Seven, Vought's premier superhero team, and the Boys, 
        vigilantes looking to bring down Vought and its fake superheroes.`,
        rating : 'PG-13',
        runningTime : 45,
     },
]