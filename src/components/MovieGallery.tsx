/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import '../style/MovieGallery.css'
import { theBoysScrap } from '../assets/theboysDatas'

function MovieGallery(){

    const [modalVisibility, setModalVisibility] = useState<boolean>(false)
    const [openedPictureIndex, setOpenPictureIndex] = useState<number|undefined>(undefined)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const modalVisibilityRef = useRef(modalVisibility)

    function openGalleryModalWithPic(picIndex : number){
        setModalVisibility(true)
        setOpenPictureIndex(picIndex)
        modalVisibilityRef.current = true
    }

    function prevPic(){
        if(openedPictureIndex != null && openedPictureIndex>0) setOpenPictureIndex(openedPictureIndex-1)
    }

    function nextPic(){
        if(openedPictureIndex != null && openedPictureIndex < theBoysScrap.movie.photos.length-1) setOpenPictureIndex(openedPictureIndex+1)
    }

    /*function generateMiniaturesArrayIndex(index : number){
        [-2, -1, 0, 1, 2]
    }*/

    useEffect(()=> {
        if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()
    })

    /*useEffect(() => {
        document.querySelector('.galleryContainer')?.scrollIntoView({ behavior: "smooth"})
    }, [])*/

    useEffect(()=> {
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape" && modalVisibility) {e.preventDefault(); setModalVisibility(false)}
            if(e.code == "ArrowRight" && modalVisibility) {e.preventDefault(); nextPic()}
            if(e.code == "ArrowLeft" && modalVisibility) {e.preventDefault(); prevPic()}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }
    })

    return (
        <>
            <section className='galleryContainer'>
                {
                    theBoysScrap.movie.photos.map((photo, index) => <article onClick={() => openGalleryModalWithPic(index)}><img src={photo.fullPics[3].url}/><div>{photo.alt.slice(0, 40)}</div></article>)
                }
            </section>
            {modalVisibility && 
            <dialog ref={dialogRef} className='galleryModal' onClick={(e) => { if (e.target === dialogRef.current) setModalVisibility(false)}}>
                <section className='galleryHeader'>
                    <div className='miniaturesSlide'>
                        {openedPictureIndex!=null && 
                            // generate an array of miniatures / if the index of any miniature is out of range => ignore
                            Array.of(openedPictureIndex-2, openedPictureIndex-1, openedPictureIndex, openedPictureIndex+1, openedPictureIndex+2,).map(index => ((index>-1 && index < theBoysScrap.movie.photos.length) && <img className={index == openedPictureIndex ? 'activeMiniature' : ''} src={theBoysScrap.movie.photos[index as number].miniatureUrl} onClick={() => setOpenPictureIndex(index)}/>))
                        }
                    </div>
                    <div style={{position:'absolute', right:'0', top:'0'}}>
                        <div className='closeButton' onClick={() => {setModalVisibility(false);}}><img style={{width:'16px', height:'16px', opacity:'0.9'}} src="../icons/close.png"/></div>
                    </div>
                </section>
                <section className='galleryBody'>
                    <img className='fullsizePicture' src={openedPictureIndex != null ? theBoysScrap.movie.photos[openedPictureIndex].fullPics[4].url : ''}/>
                    <div role="button" className='galleryNavButton right' onClick={()=> nextPic()}>
                        <div className='greyRoundButton'>
                            <img src="../icons/arrowgallery2.png" className='rightArrow'/>
                        </div>
                    </div>
                    <div role="button" className='galleryNavButton left' onClick={()=> prevPic()}>
                        <div className='greyRoundButton'>
                            <img src="../icons/arrowgallery2.png" className='leftArrow'/>
                        </div>
                    </div>
                    <div className='pagination'>{openedPictureIndex!=null && (openedPictureIndex+1)} / {theBoysScrap.movie.photos.length}</div>
                </section>
                <section className='galleryFooter'>
                    <p><span>Title :&nbsp;&nbsp;</span> {theBoysScrap.movie.title}</p>
                    <ul className='genresContainer'><li>Action</li><li>Comedy</li><li>Crime</li><li>Sci-Fi</li></ul>
                    <ul style={{display:'flex', flexDirection : 'row', columnGap:'0'}}><li><span>Featuring :&nbsp;&nbsp;&nbsp;</span></li>{theBoysScrap.movie.photos[openedPictureIndex as number].actors.map(actors => <li>{actors},&nbsp;</li>)}</ul>
                    <div className='likesnShareContainer'>
                        <div role="button" className='shareButton button'>
                            <img style={{width:'12px', height:'12px', opacity:'0.9'}} src="../icons/close.png"/>
                        </div>
                        <div role="button" className='shareButton button'>
                            <img style={{width:'12px', height:'12px', opacity:'0.9'}} src="../icons/close.png"/>
                        </div>
                        <div role="button" className='shareButton button'>
                            <img style={{width:'12px', height:'12px', opacity:'0.9'}} src="../icons/close.png"/>
                        </div>
                    </div>
                </section>
            </dialog>}
        </>
    )
}

export default MovieGallery

/*

    <div role="button" className='galleryNavButton' onClick={() => prevPic()}>PREV</div>
    <img className='fullsizePicture' src={openedPictureIndex != null ? theBoysScrap.movie.photos[openedPictureIndex].fullPics[4].url : ''}/>
    <div role="button" className='galleryNavButton' onClick={() => nextPic()}>NEXT</div>

*/