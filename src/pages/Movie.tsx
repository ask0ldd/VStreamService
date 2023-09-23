import Footer from "../components/Footer"
import Header from "../components/Header"
import './Movie.css'

function Movie(){



    return(
        <>
            <Header/>
            <main className="moviePage">
                <section className="moviePContainer">
                    <h2>THE BOYS</h2>
                    <span className="plot">
                        The Boys is set in a universe where super-powered individuals are recognized as heroes by the general public and work for a powerful 
                        corporation known as Vought International, which markets and monetizes them. Outside of their heroic personas, most are arrogant, 
                        selfish, and corrupt.
                    </span>
                    <ul className="tagsList">
                        <li>7.5</li>
                        <li>2019</li>
                        <li>PG-13</li>
                        <li>HDR</li>
                        <li>UHD</li>
                    </ul>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Movie

// <img className="mainMoviePic" src="/theboys.jpg"/>