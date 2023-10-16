// import { useEffect } from 'react'
import '../style/CastList.css'

function CastList(){

    /*useEffect(() => {
        document.querySelector('.castSection')?.scrollIntoView({ behavior: "smooth"})
    }, [])*/

    return (
        <section className="castSection">
            <h2>Creator</h2>
            <article className='creatorArticle'>
                <div className='creatorBioSummaryContainer'>
                    <div className='creatorBio'>
                        <div>
                            <h4>Eric Kripke</h4>
                            Eric Kripke is an American writer and television producer. He came to prominence as the creator of The CW fantasy drama series Supernatural (2005-2020), where he served as show-runner during the first five seasons. Kripke also created the post-apocalyptic drama series Revolution (2012-2014) and co-created the science fiction series Timeless (2016-2018). Since 2019, he has served as show-runner of the superhero series The Boys, which he developed for Amazon Prime Video.
                        </div>
                        <img className='creatorPortrait' src="../cast/quaid.jpg"/>
                    </div>
                    <div className='creatorSummary'>
                        <h4>About</h4>
                        <p>Born <span>1974 (age 48–49)</span></p>
                        <p>Alma mater <span>University of Southern California</span></p>
                        <p>Occupations <span>Writer - Television producer</span></p>
                        <p>Affiliated <span>Anthony Starr, Karl Urban...</span></p>
                    </div>
                </div>
                <div className='notableWorksContainer'>
                    <h4>Notable Works</h4>
                    <div className='notableWorks'>
                        <img className="notableWorkPic" src="../horizontalCardPic/thetomorrowwarsm.jpg"/>
                        <img className="notableWorkPic" src="../horizontalCardPic/vampireacademysm.jpg"/>
                        <img className="notableWorkPic" src="../horizontalCardPic/ringsofpowersm.jpg"/>
                        <img className="notableWorkPic" src="../horizontalCardPic/handofgodsm.jpg"/>
                        <img className="notableWorkPic" src="../horizontalCardPic/theterminallistsm.jpg"/>
                        <img className="notableWorkPic" src="../horizontalCardPic/tunetueraspointsm.jpg"/>
                    </div>
                </div>
            </article>
            <h2>Cast & Crew</h2>
            <div className='castContainer'>
                
                <article className='castArticle'>
                    <picture><img src="../cast/urban.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Karl Urban</h4>
                        <p className='characterName'><span>as</span> Billy Butcher</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/starr.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Anthony Starr</h4>
                        <p className='characterName'><span>as</span> Homelander</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/quaid.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Jack Quaid</h4>
                        <p className='characterName'><span>as</span> Hughie Campbell</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>

                <article className='castArticle'>
                    <picture><img src="../cast/moriarty.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Erin Moriarty</h4>
                        <p className='characterName'><span>as</span> Annie January</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/usher.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Jessie T. Usher</h4>
                        <p className='characterName'><span>as</span> A-Train</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/alonzo.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Laz Alonso</h4>
                        <p className='characterName'><span>as</span> Mother's Milk</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>

                <article className='castArticle'>
                    <picture><img src="../cast/crawford.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Chace Crawford</h4>
                        <p className='characterName'><span>as</span> The Deep</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/capone.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Tomer Capone</h4>
                        <p className='characterName'><span>as</span> Frenchie</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/fukuhara.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Karen Fukuhara</h4>
                        <p className='characterName'><span>as</span> Kimiko Miyashiro</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>

                <article className='castArticle'>
                    <picture><img src="../cast/mitchell.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Nathan Mitchell</h4>
                        <p className='characterName'><span>as</span> Black Noir</p>
                        <p className='appearances'>32 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/minifie.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Colby Minifie</h4>
                        <p className='characterName'><span>as</span> Ashley Barrett</p>
                        <p className='appearances'>29 episodes • 2019–2022</p>
                    </div>
                </article>
                <article className='castArticle'>
                    <picture><img src="../cast/mcelligott.jpg"/></picture>
                    <div className='castMemberInfos'>
                        <h4>Dominique McElligott</h4>
                        <p className='characterName'><span>as</span> Maggie Shaw</p>
                        <p className='appearances'>24 episodes • 2019–2022</p>
                    </div>
                </article>

            </div>
        </section>
    )
}

export default CastList