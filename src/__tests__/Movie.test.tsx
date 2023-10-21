import { BrowserRouter } from "react-router-dom"
import Movie from "../pages/Movie"
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import store from "../redux/store"
import { Provider } from "react-redux"
import { vi } from "vitest"

/*vi.mock('../pages/Movie', () => ({
    __esModule: true,
    default: vi.fn(),
    videoStart: vi.fn(),
  }))*/

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Movie/>
            </BrowserRouter>
        </Provider>
    )
}

describe('Movie Gallery Component', async () => { 

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
        await waitFor(() => {expect(video.play).toHaveBeenCalled()}, { timeout: 4000 })
    })

})