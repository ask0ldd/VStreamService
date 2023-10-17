/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import '../style/MovieGallery.css'
import { theBoysScrap } from '../assets/theboysDatas'
import GalleryModal from './GalleryModal'

function MovieGallery(){

    const [modalVisibility, setModalVisibility] = useState<boolean>(false)
    const [openPictureIndex, setOpenPictureIndex] = useState<number|undefined>(undefined)
    const modalVisibilityRef = useRef(modalVisibility)

    function openGalleryModalWithPic(picIndex : number){
        setModalVisibility(true)
        setOpenPictureIndex(picIndex)
        modalVisibilityRef.current = true
    }

    return (
        <>
            <section className='galleryContainer'>
                {
                    theBoysScrap.movie.photos.map((photo, index) => <article onClick={() => openGalleryModalWithPic(index)}><img src={photo.fullPics[3].url}/><div>{photo.alt.slice(0, 40)}</div></article>)
                }
            </section>
            {modalVisibility && <GalleryModal setModalVisibility={setModalVisibility} modalVisibilityRef={modalVisibilityRef} openPictureIndex={openPictureIndex} setOpenPictureIndex={setOpenPictureIndex}/>}
        </>
    )
}

export default MovieGallery

/*

    <div role="button" className='galleryNavButton' onClick={() => prevPic()}>PREV</div>
    <img className='fullsizePicture' src={openedPictureIndex != null ? theBoysScrap.movie.photos[openedPictureIndex].fullPics[4].url : ''}/>
    <div role="button" className='galleryNavButton' onClick={() => nextPic()}>NEXT</div>

*/