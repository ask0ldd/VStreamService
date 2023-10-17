// import { useEffect } from 'react'
import '../style/usersReviewsList.css'

function UsersReviewsList(){

    /*useEffect(() => {
        document.querySelector('.userReviewsList')?.scrollIntoView({ behavior: "smooth"})
    }, [])*/

    return(
        <section className='userReviewsList'>
            <article className='reviewFullRowContainer' style={{marginTop:'3rem',}}>
                <div className="usersReview">
                    <div className='reviewBody'>
                        <h3>It's exactly the opposite of your usual superhero show!</h3>
                        <p className='reviewSubtitle'>6 December 2021.&nbsp;&nbsp;&nbsp;&nbsp; 1,873 out of 2,105 found this helpful.</p>
                        <p>
                        I've had big expectations about this show, because I thought that is going to be exactly that kind of show, in which the good guys (the superheroes) fight the bad guys (the villains) and of course, they win. I couldn't have been more wrong, especially because "The Boys" it's not about a desperate attempt of superheroes to save the world from evil, instead this show takes a much more realistic approach, about what is going to happen if superheroes had really existed.
                        </p>
                    </div>
                    <div className='reviewCol'>
                        <img className='creatorPortrait' src="../cast/quaid.jpg"/>
                        <p className='by'>By</p>
                        <p className='userName'>Tweakams</p>
                    </div>
                </div>
                <div className='reviewSidePanel'>
                    aaa
                </div>
            </article>

            <article className='reviewFullRowContainer' style={{marginTop:'3rem',}}>
                <div className="usersReview">
                    <div className='reviewBody'>
                        <h3>It's exactly the opposite of your usual superhero show!</h3>
                        <p className='reviewSubtitle'>6 December 2021.&nbsp;&nbsp;&nbsp;&nbsp; 1,873 out of 2,105 found this helpful.</p>
                        <p>
                        I've had big expectations about this show, because I thought that is going to be exactly that kind of show, in which the good guys (the superheroes) fight the bad guys (the villains) and of course, they win. I couldn't have been more wrong, especially because "The Boys" it's not about a desperate attempt of superheroes to save the world from evil, instead this show takes a much more realistic approach, about what is going to happen if superheroes had really existed.
                        </p>
                    </div>
                    <div className='reviewCol'>
                        <img className='creatorPortrait' src="../cast/quaid.jpg"/>
                        <p className='by'>By</p>
                        <p className='userName'>Tweakams</p>
                    </div>
                </div>
                <div className='reviewSidePanel'>
                    aaa
                </div>
            </article>
        </section>
    )
}

export default UsersReviewsList