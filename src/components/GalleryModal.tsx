import { MutableRefObject, useEffect, useRef } from 'react'
import '../style/GalleryModal.css'
import { theBoysScrap } from '../assets/theboysDatas'

function GalleryModal({setModalVisibility, modalVisibilityRef, openPictureIndex, setOpenPictureIndex} : IProps){

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(()=> {
        if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()
    })

    useEffect(()=> {
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape") {e.preventDefault(); setModalVisibility(false)}
            if(e.code == "ArrowRight") {e.preventDefault(); nextPic()}
            if(e.code == "ArrowLeft") {e.preventDefault(); prevPic()}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }
    })

    function prevPic(){
        if(openPictureIndex != null && openPictureIndex>0) setOpenPictureIndex(openPictureIndex-1)
    }

    function nextPic(){
        if(openPictureIndex != null && openPictureIndex < theBoysScrap.movie.photos.length-1) setOpenPictureIndex(openPictureIndex+1)
    }

    // lock background scrolling when the modal is open
    /* c8 ignore start */
    function scrollLock(state : boolean) : void {
        if(!state){
            window.onscroll = () => null
            return
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        window.onscroll = () => {
            window.scrollTo(scrollLeft, scrollTop)
        }
    }
    /* c8 ignore stop */

    useEffect(() => {
        scrollLock(true)
    }, [])

    function closeModal(){
        modalVisibilityRef.current = false
        scrollLock(false)
        setModalVisibility(false)
    }

    return(
        <dialog data-testid="galleryModal" ref={dialogRef} className='galleryModal' onClick={(e) => { if (e.target === dialogRef.current) closeModal()}}>
                <section className='galleryHeader'>
                    <div className='miniaturesSlide'>
                        {openPictureIndex!=null && 
                            // generate an array of miniatures / if the index of any miniature is out of range => ignore
                            Array.of(openPictureIndex-2, openPictureIndex-1, openPictureIndex, openPictureIndex+1, openPictureIndex+2,).map(index => ((index>-1 && index < theBoysScrap.movie.photos.length) && <img className={index == openPictureIndex ? 'activeMiniature' : ''} src={theBoysScrap.movie.photos[index as number].miniatureUrl} onClick={() => setOpenPictureIndex(index)}/>))
                        }
                    </div>
                    <div style={{position:'absolute', right:'0', top:'0'}}>
                        <div role="button" className='closeButton' onClick={() => closeModal()}><img alt="closeButton" style={{width:'16px', height:'16px', opacity:'0.9'}} src="../icons/close.png"/></div>
                    </div>
                </section>
                <section className='galleryBody'>
                    <img className='fullsizePicture' alt={openPictureIndex != null ? theBoysScrap.movie.photos[openPictureIndex].alt : ''} src={openPictureIndex != null ? theBoysScrap.movie.photos[openPictureIndex].fullPics[4].url : ''}/>
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
                    <div className='pagination'>{openPictureIndex!=null && (openPictureIndex+1)} / {theBoysScrap.movie.photos.length}</div>
                </section>
                <section className='galleryFooter'>
                    <p><span>Title :&nbsp;&nbsp;</span> {theBoysScrap.movie.title}</p>
                    <ul className='genresContainer'><li>Action</li><li>Comedy</li><li>Crime</li><li>Sci-Fi</li></ul>
                    <ul style={{display:'flex', flexDirection : 'row', columnGap:'0'}}><li><span>Featuring :&nbsp;&nbsp;&nbsp;</span></li>{theBoysScrap.movie.photos[openPictureIndex as number].actors.map(actors => <li>{actors},&nbsp;</li>)}</ul>
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
            </dialog>
    )
}

export default GalleryModal

interface IProps{
    setModalVisibility : (bool : boolean) => void
    openPictureIndex : number | undefined
    setOpenPictureIndex : (index : number) => void
    modalVisibilityRef : MutableRefObject<boolean>
}