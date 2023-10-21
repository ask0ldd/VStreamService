/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { render, screen, waitFor, act } from '@testing-library/react'
import { expect, vi, describe, test, beforeAll, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import CastList from "../../components/CastList"

const MockedRouter = () => { 
    return(
        <BrowserRouter>
            <CastList/>
        </BrowserRouter>
    )
}

describe('CastList Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('Display the Mocked Datas', async () => {
        await waitFor(() => expect(screen.getByText('Creator')).toBeInTheDocument())
        expect(screen.getByText('Eric Kripke')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('Notable Works')).toBeInTheDocument()
        expect(screen.getByText('Cast & Crew')).toBeInTheDocument()
    })
})

