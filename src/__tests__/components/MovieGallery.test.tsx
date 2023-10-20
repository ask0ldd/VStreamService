/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
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

    

})