import App from '../App';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {act} from "react";
beforeEach(() => {
    fetch.resetMocks();
})
test('renders ToDo items', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        {id: 1, taskdescription: 'Item 1'},
        {id: 2, taskdescription: 'Item 2'}])
    );
    await act(async () => {render(<App />);})
    const item1 = await screen.getByText(/Item 1/i);
    expect(item1).toBeInTheDocument()
    expect(item1).toBeVisible()
})
