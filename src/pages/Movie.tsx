import Footer from "../components/Footer"
import Header from "../components/Header"

function Movie(){
    return(
        <>
            <Header/>
            <main className="moviePage">
                <section className="moviePicContainer">
                    <img className="mainMoviePic" src="/theboys.jpg"/>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Movie