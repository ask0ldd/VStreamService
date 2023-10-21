import { BrowserRouter } from "react-router-dom"
import Movie from "../pages/Movie"
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import store from "../redux/store"
import { Provider } from "react-redux"
import { vi } from "vitest"
import '@testing-library/jest-dom/extend-expect'

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
        const episodeRows = screen.getAllByTestId('episode-row')
        expect(episodeRows.length).toBe(2)
        const buttonsContainer = screen.getAllByTestId('episode-buttons-container')
        expect(buttonsContainer.length).toBe(2)
        expect(buttonsContainer[0]).toHaveStyle('transform: translateY(6rem)')
        fireEvent.mouseEnter(episodeRows[0])
        await waitFor(() => expect(buttonsContainer[0]).toHaveStyle('transform: translateY(0)'))
    })

})

/*

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

function MyComponent() {
  const handleHover = (event) => {
    event.target.style.transform = 'scale(1.2)';
  };

  return (
    <div>
      <button onMouseEnter={handleHover}>Hover me</button>
    </div>
  );
}

test('Should apply transform on hover', () => {
  render(<MyComponent />);
  const button = screen.getByText('Hover me');

  // Check initial state
  expect(button).toHaveStyle('transform: scale(1)');

  // Simulate hover
  button.dispatchEvent(new MouseEvent('mouseenter'));

  // Check hovered state
  const style = window.getComputedStyle(button);
  expect(style.transform).toBe('matrix(1.2, 0, 0, 1.2, 0, 0)');
});

*/