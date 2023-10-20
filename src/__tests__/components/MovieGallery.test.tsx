/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import MovieGallery from "../../components/MovieGallery"

const MockedRouter = () => { 
    return(
        <BrowserRouter>
            <MovieGallery/>
        </BrowserRouter>
    )
}

describe('Movie Gallery Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('The gallery should be displayed and contain 12 pictures', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        expect(screen.getByTestId('gallery').querySelectorAll('article').length).toBe(12)
    })

    test('Clicking on a picture should display a Modal', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        act(() => galleryPicture.click())
        await waitFor(() => expect(screen.getByTestId('galleryModal')).toBeInTheDocument())
    })

})