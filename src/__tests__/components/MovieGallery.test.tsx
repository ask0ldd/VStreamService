/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { render, screen, waitFor } from '@testing-library/react'
import MovieGallery from "../../components/MovieGallery"

const MockedRouter = () => { 
    return(
        <BrowserRouter>
            <MovieGallery/>
        </BrowserRouter>
    )
}

describe('Given : The movie gallery is rendered', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('All the table headers should be in the doc', async () => {
        await waitFor(() => expect(screen.getByTestId('gallery')).toBeInTheDocument())
        expect(screen.getByTestId('gallery').querySelectorAll('article').length).toBe(12)
    })

})