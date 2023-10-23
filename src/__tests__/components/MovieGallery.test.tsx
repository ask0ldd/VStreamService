/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import MovieGallery from "../../components/MovieGallery"
import { expect, vi, describe, test, beforeAll, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

const MockedRouter = () => { 
    return(
        <BrowserRouter>
            <MovieGallery/>
        </BrowserRouter>
    )
}

/*interface ScrollOptions {
    left?: number
    top?: number
    behavior?: "auto" | "instant" | "smooth";
}

interface ScrollContainer extends HTMLElement{
    scrollBy(options?: ScrollOptions): void;
    scrollBy(x: number, y: number): void;
    scrollTo(options?: ScrollOptions): void;
    scrollTo(x: number, y: number): void;
}

function mockedScrollTo (this: ScrollContainer, x: number | ScrollOptions = 0, y: number = 0){ 
    this.scrollLeft = typeof x === "object" ? x.left || 0 : x || 0
    this.scrollTop = typeof x === "object" ? x.top || 0 : y || 0
    this.dispatchEvent(new Event('scroll'))
}
window.scrollTo = vi.fn(mockedScrollTo)*/

describe('Movie Gallery Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn()
        HTMLDialogElement.prototype.showModal = vi.fn()
        HTMLDialogElement.prototype.close = vi.fn()
      })

    test('The gallery should be displayed and contain 12 pictures', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        expect(screen.getByTestId('gallery').querySelectorAll('article').length).toBe(12)
    })

    test('Clicking on a picture should display a Modal with the mocked datas / elements', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        expect(screen.queryByTestId('galleryModal')).not.toBeInTheDocument()
        act(() => galleryPicture.click())
        await waitFor(() => expect(screen.getByTestId('galleryModal')).toBeInTheDocument())
        // expecting 2 navigation buttons
        const navButtons = screen.getByTestId('galleryModal').querySelectorAll('.galleryNavButton')
        expect(navButtons.length).toBe(2)
        // expecting 3 miniatures by default
        const miniatures = screen.getByTestId('galleryModal').querySelector('.miniaturesSlide')?.children
        expect(miniatures?.length).toBe(3)
        // expecting 1 main picture
        expect(screen.getByAltText('Karl Urban in The Boys (2019)')).toBeInTheDocument()
        // expecting 1 close button
        const closeButton = screen.getByAltText('closeButton').parentElement
        expect(closeButton).toBeInTheDocument()
        // expecting 4 tags
        expect(screen.getByText('Action')).toBeInTheDocument()
        expect(screen.getByText('Comedy')).toBeInTheDocument()
        expect(screen.getByText('Crime')).toBeInTheDocument()
        expect(screen.getByText('Sci-Fi')).toBeInTheDocument()
    })

    test('Clicking on the close button of the modal results in a closed modal', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        act(() => galleryPicture.click())
        await waitFor(() => expect(screen.getByTestId('galleryModal')).toBeInTheDocument())
        const closeButton = screen.getByAltText('closeButton').parentElement
        act(() => closeButton?.click())
        await waitFor(() => expect(screen.queryByTestId('galleryModal')).not.toBeInTheDocument())
    })

    test('Pictures can be browsed using the nav buttons and the keyboard arrows', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        act(() => galleryPicture.click())
        await waitFor(() => expect(screen.getByTestId('galleryModal')).toBeInTheDocument())
        expect(screen.getByAltText('Karl Urban in The Boys (2019)')).toBeInTheDocument()
        const navButtons = screen.getByTestId('galleryModal').querySelectorAll('.galleryNavButton')
        // browsing using the gallery buttons
        act(() => (navButtons[0] as HTMLElement)?.click())
        await waitFor(() => expect(screen.getByAltText('Susan Heyward in The Boys (2019)')).toBeInTheDocument())
        act(() => (navButtons[1] as HTMLElement)?.click())
        await waitFor(() => expect(screen.getByAltText('Karl Urban in The Boys (2019)')).toBeInTheDocument())
        userEvent.keyboard('{ArrowRight}')
        await waitFor(() => expect(screen.getByAltText('Susan Heyward in The Boys (2019)')).toBeInTheDocument())
        userEvent.keyboard('{ArrowLeft}')
        await waitFor(() => expect(screen.getByAltText('Karl Urban in The Boys (2019)')).toBeInTheDocument())
    })

    test('Escape is closing the modal', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        act(() => galleryPicture.click())
        await waitFor(() => expect(screen.getByTestId('galleryModal')).toBeInTheDocument())
        userEvent.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByTestId('galleryModal')).not.toBeInTheDocument())
    })

    test('Clicking on the modal backdrop is closing the modal', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        act(() => galleryPicture.click())
        await waitFor(() => expect(screen.getByTestId('galleryModal')).toBeInTheDocument())
        act(() => screen.getByTestId('galleryModal').click())
        await waitFor(() => expect(screen.queryByTestId('galleryModal')).not.toBeInTheDocument())
    })

    /*test('ScrollLock', async() => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        act(() => fireEvent.scroll(window, { target: { scrollY: 300 } }))
        await waitFor(() => expect(window.screenTop).toBe(300))
        const galleryPicture = screen.getByTestId('gallery').querySelectorAll('article')[0]
        act(() => galleryPicture.click())
        act(() => fireEvent.scroll(window, { target: { scrollY: 600 } }))
        await waitFor(() => expect(window.screenTop).toBe(300))
    })*/

})