import Footer from "../components/Footer"
import Header from "../components/Header"
import './Movie.css'

function Movie(){



    return(
        <>
            <Header/>
            <main className="moviePage">
                <section className="moviePContainer">
                    <div className="bigPlayContainer">
                        <img role="button" src="/buttons/bigPlayButton.png" className="bigPlayButton"/>
                    </div>
                    <div className="movieInfosGroup">
                        <h2>THE BOYS</h2>
                        <span className="plot">
                            The Boys is set in a universe where super-powered individuals are recognized 
                            as heroes by the general public and work for a powerful corporation known as 
                            Vought International, which markets and monetizes them. Outside of their heroic 
                            personas, most are arrogant, selfish, and corrupt. The series primarily focuses 
                            on two groups: the Seven, Vought's premier superhero team, and the Boys, 
                            vigilantes looking to bring down Vought and its fake superheroes.
                        </span>
                        <ul className="tagsList">
                            <li>7.5</li>
                            <li>2019</li>
                            <li>PG-13</li>
                            <li>HDR</li>
                            <li>UHD</li>
                        </ul>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Movie

// <img className="mainMoviePic" src="/theboys.jpg"/>