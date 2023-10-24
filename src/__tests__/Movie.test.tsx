import { BrowserRouter } from "react-router-dom"
import Movie from "../pages/Movie"
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import store from "../redux/store"
import { Provider } from "react-redux"
import { vi } from "vitest"

// scrollintoview not implemented into js-dom so mocked
window.HTMLElement.prototype.scrollIntoView = vi.fn(() => null)

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Movie/>
            </BrowserRouter>
        </Provider>
    )
}

window.HTMLMediaElement.prototype.load = () => {
    (this! as HTMLMediaElement).dispatchEvent(new Event('loadeddata'))
}
window.HTMLMediaElement.prototype.play = vi.fn()
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
    get: () => 1
    // vi.fn().mockReturnValue(1)
})
Object.defineProperty(window.HTMLMediaElement.prototype, 'readyState', {
    get: () => 4
})

describe('Movie Page', async () => { 

    // mocking the intersection observer obj
    beforeAll(() => {
        const IntersectionObserverMock = vi.fn(() => ({ 
            disconnect: vi.fn(), 
            observe: vi.fn(), 
            takeRecords: vi.fn(), 
            unobserve: vi.fn(), 
        }))
        vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    })

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('The Secondary Menu is displayed', async () => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        expect(screen.getByText('Cast & Crew')).toBeInTheDocument()
        expect(screen.getByText('Photos')).toBeInTheDocument()
        expect(screen.getByText('User Reviews')).toBeInTheDocument()
    })

    test('The secondary menu is displaying the expected sections', async () => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        const episodesMenuItem = screen.getByText('Episodes')
        const castnCrewMenuItem = screen.getByText('Cast & Crew')
        const photosMenuItem = screen.getByText('Photos')
        const userReviewsMenuItem = screen.getByText('User Reviews')
        // default section
        expect(episodesMenuItem.classList.contains('active')).toBeTruthy()
        expect(castnCrewMenuItem).toBeInTheDocument()
        expect(castnCrewMenuItem.classList.contains('active')).toBeFalsy()
        expect(photosMenuItem).toBeInTheDocument()
        expect(photosMenuItem.classList.contains('active')).toBeFalsy()
        expect(userReviewsMenuItem).toBeInTheDocument()
        expect(userReviewsMenuItem.classList.contains('active')).toBeFalsy()
        expect(screen.getByText('Season 1')).toBeInTheDocument()
        // cast section
        act(() => castnCrewMenuItem.click())
        await waitFor(() => expect(screen.getByText('Creator')).toBeInTheDocument())
        expect(episodesMenuItem.classList.contains('active')).toBeFalsy()
        expect(castnCrewMenuItem).toBeInTheDocument()
        expect(castnCrewMenuItem.classList.contains('active')).toBeTruthy()
        expect(photosMenuItem).toBeInTheDocument()
        expect(photosMenuItem.classList.contains('active')).toBeFalsy()
        expect(userReviewsMenuItem).toBeInTheDocument()
        expect(userReviewsMenuItem.classList.contains('active')).toBeFalsy()
        // photos section
        act(() => photosMenuItem.click())
        await waitFor(() => expect(screen.getByText('Karl Urban in The Boys (2019)')).toBeInTheDocument())
        expect(episodesMenuItem.classList.contains('active')).toBeFalsy()
        expect(castnCrewMenuItem).toBeInTheDocument()
        expect(castnCrewMenuItem.classList.contains('active')).toBeFalsy()
        expect(photosMenuItem).toBeInTheDocument()
        expect(photosMenuItem.classList.contains('active')).toBeTruthy()
        expect(userReviewsMenuItem).toBeInTheDocument()
        expect(userReviewsMenuItem.classList.contains('active')).toBeFalsy()
        // reviews section
        act(() => userReviewsMenuItem.click())
        await waitFor(() => expect(screen.getAllByText("It's exactly the opposite of your usual superhero show!").length).toBe(2))
        expect(episodesMenuItem.classList.contains('active')).toBeFalsy()
        expect(castnCrewMenuItem).toBeInTheDocument()
        expect(castnCrewMenuItem.classList.contains('active')).toBeFalsy()
        expect(photosMenuItem).toBeInTheDocument()
        expect(photosMenuItem.classList.contains('active')).toBeFalsy()
        expect(userReviewsMenuItem).toBeInTheDocument()
        expect(userReviewsMenuItem.classList.contains('active')).toBeTruthy()
        // back to default
        act(() => episodesMenuItem.click())
        expect(episodesMenuItem.classList.contains('active')).toBeTruthy()
    })

    test('Two Episodes should be displayed by default', async () => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        expect(screen.getAllByTestId('episode-row').length).toBe(2)
    })

    test('When an Episode Row is hovered, a set of Buttons should appears', async () => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        const episodeRows = screen.getAllByTestId('episode-row')
        expect(episodeRows.length).toBe(2)
        const buttonsContainer = screen.getAllByTestId('episode-buttons-container')
        expect(buttonsContainer.length).toBe(2)
        expect(buttonsContainer[0]).toHaveStyle('transform: translateY(6rem)')
        fireEvent.mouseEnter(episodeRows[0])
        await waitFor(() => expect(buttonsContainer[0]).toHaveStyle('transform: translateY(0)'))
        fireEvent.mouseLeave(episodeRows[0])
        await waitFor(() => expect(buttonsContainer[0]).toHaveStyle('transform: translateY(6rem)'))
    })

    test('The video should be loaded and playing after 4 secs', async() => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        const video = screen.getByTestId('video') as HTMLVideoElement
        video.play = vi.fn(video.play)
        await waitFor(() => {expect(video.play).toHaveBeenCalled()}, { timeout: 5000 })
    }, 6000)

    test('The unmute video button should work', async() => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        const video = screen.getByTestId('video') as HTMLVideoElement
        video.play = vi.fn(video.play)
        await waitFor(() => {expect(video.play).toHaveBeenCalled()}, { timeout: 5000 })
        expect(video.muted).toBeTruthy()
        const buttons = screen.getAllByRole('button')
        const muteButton = buttons.find(button => button.classList.contains('switchAudioButton'))
        act(() => muteButton?.click())
        await waitFor(() => expect(video.muted).toBeFalsy())
    })

    test('The Seasons buttons', async() => {
        await waitFor(() => expect(screen.getByText('Episodes')).toBeInTheDocument())
        const seasonsButtons = screen.getAllByRole('button').filter(button => button.classList.contains('seasonTag'))
        expect(seasonsButtons[0].classList.contains('active')).toBeTruthy()
        act(() => seasonsButtons[1]?.click())
        await waitFor(() => expect(seasonsButtons[1].classList.contains('active')).toBeTruthy())
        act(() => seasonsButtons[2]?.click())
        await waitFor(() => expect(seasonsButtons[2].classList.contains('active')).toBeTruthy())
        act(() => seasonsButtons[0]?.click())
        await waitFor(() => expect(seasonsButtons[0].classList.contains('active')).toBeTruthy())
    })

})