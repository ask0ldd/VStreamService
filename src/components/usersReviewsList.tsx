// import { useEffect } from 'react'
import '../style/usersReviewsList.css'

function UsersReviewsList(){

    /*useEffect(() => {
        document.querySelector('.userReviewsList')?.scrollIntoView({ behavior: "smooth"})
    }, [])*/

    return(
        <section className='userReviewsList'>
            <article className="usersReview">
                <div className='reviewBody'>
                    <h3>It's exactly the opposite of your usual superhero show!</h3>
                    <p className='reviewSubtitle'>6 December 2021.&nbsp;&nbsp;&nbsp;&nbsp; 1,873 out of 2,105 found this helpful.</p>
                    <p>
                    I've had big expectations about this show, because I thought that is going to be exactly that kind of show, in which the good guys (the superheroes) fight the bad guys (the villains) and of course, they win. I couldn't have been more wrong, especially because "The Boys" it's not about a desperate attempt of superheroes to save the world from evil, instead this show takes a much more realistic approach, about what is going to happen if superheroes had really existed.
                    </p>
                </div>
                <img className='creatorPortrait' src="../cast/quaid.jpg"/>
            </article>

            <article className="usersReview">
                <h3>It's exactly the opposite of your usual superhero show!</h3>
                <p>
                I've had big expectations about this show, because I thought that is going to be exactly that kind of show, in which the good guys (the superheroes) fight the bad guys (the villains) and of course, they win. I couldn't have been more wrong, especially because "The Boys" it's not about a desperate attempt of superheroes to save the world from evil, instead this show takes a much more realistic approach, about what is going to happen if superheroes had really existed.<br/><br/>
                I'm saying that I had big expectations in the beginning, because I thought that it would be the same usual show with superheroes and villain, that is most likely to find everywhere. In the first couple of episodes I've been a little bit disappointed, or rather shocked, because like I've already said, "The Boys" describes what the MCU never did. Of course, the movies and shows from Marvel are destined to other public's category, but this show is tough. It has all you could not expect from a TV series with superheroes. It has violence, gore, nudity, astonishing CGI effects and a very unpredictable and solid storyline. In the end it seems that this one delivered what I didn't expect it to and I am pleased with that. The show is definitely worth watching.
                </p>

            </article>
        </section>
    )
}

export default UsersReviewsList