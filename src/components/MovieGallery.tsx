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

    useEffect(()=> {
        if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()
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
                <div className='galleryHeader'>
                    {openedPictureIndex} / {theBoysScrap.movie.photos.length-1}
                </div>
                <div className='galleryBody'>
                    <div role="button" className='galleryNavButton' onClick={() => prevPic()}>PREV</div>
                    <img className='fullsizePicture' src={openedPictureIndex != null ? theBoysScrap.movie.photos[openedPictureIndex].fullPics[4].url : ''}/>
                    <div role="button" className='galleryNavButton' onClick={() => nextPic()}>NEXT</div>
                </div>
                <div className='galleryFooter'>
                    <p>Title : {theBoysScrap.movie.title}</p>
                    <ul style={{display:'flex', flexDirection : 'row', columnGap:'1rem'}}><li>Featuring :</li>{theBoysScrap.movie.photos[openedPictureIndex as number].actors.map(actors => <li>{actors}, </li>)}</ul>
                </div>
            </dialog>}
        </>
    )
}

export default MovieGallery