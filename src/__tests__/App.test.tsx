/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import store from "../redux/store"
import { Provider } from "react-redux"
import { vi } from "vitest"
import App from "../pages/App"

// scrollintoview not implemented into js-dom so mocked
window.HTMLElement.prototype.scrollIntoView = vi.fn(() => null)

const MockedRouter = () => { 
    return(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
}

describe('App Page', async () => { 

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

    test('The Banner Slideshow is displayed', async () => {
        await waitFor(() => expect(screen.getByAltText('the dark knight batman')).toBeInTheDocument())
        expect(screen.getByAltText('the dark knight bane')).toBeInTheDocument()
        expect(screen.getByAltText('the dark knight catwoman')).toBeInTheDocument()
    })

})