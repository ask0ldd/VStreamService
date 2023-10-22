/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom"
import { render, screen, waitFor } from '@testing-library/react'
import { expect, describe, test, beforeEach } from 'vitest'
// import userEvent from '@testing-library/user-event'
import UsersReviewsList from "../../components/usersReviewsList"

const MockedRouter = () => { 
    return(
        <BrowserRouter>
            <UsersReviewsList/>
        </BrowserRouter>
    )
}

describe('UsersReviewsList Component', async () => { 

    beforeEach(() => {
        render(<MockedRouter/>) 
    })

    test('Display the Mocked Datas', async () => {
        await waitFor(() => expect(screen.getAllByText("It's exactly the opposite of your usual superhero show!").length).toBe(2))
    })
})