import App from '../App';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {act} from 'react';

beforeEach(() => {
    fetch.resetMocks();
});

test('fetches and renders todo items from backend', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        {id: 1, taskdescription: 'Item 1'},
        {id: 2, taskdescription: 'Item 2'}
    ]));

    await act(async () => {
        render(<App />);
    });

    const item1 = await screen.findByText(/Item 1/i);
    const item2 = await screen.findByText(/Item 2/i);

    expect(item1).toBeInTheDocument();
    expect(item2).toBeVisible();
});


test('edits a todo item and sends PUT to backend', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        {id: 1, taskdescription: 'Item 1'},
        {id: 2, taskdescription: 'Item 2'}
    ]));

    await act(async () => {
        render(<App />);
    });

    const editButtons = screen.getAllByText("EDIT");
    fireEvent.click(editButtons[0]);

    const input = screen.getByTestId('edit-input-1');
    fireEvent.change(input, {target: {value: 'Item 1 updated'}});

    fetch.mockResponseOnce("Task updated successfully.");

    const saveButton = screen.getAllByText("SAVE")[0];
    fireEvent.click(saveButton);

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/tasks/1'),
            expect.objectContaining({
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({taskdescription: 'Item 1 updated'})
            })
        );
    });
});

test('fails to edit a todo item when server returns error', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        {id: 1, taskdescription: 'Item 1'},
        {id: 2, taskdescription: 'Item 2'}
    ]));

    await act(async () => {
        render(<App />);
    });

    const editButtons = screen.getAllByText("EDIT");
    fireEvent.click(editButtons[0]);

    const input = screen.getByTestId('edit-input-1');
    fireEvent.change(input, {target: {value: 'Updated with error'}});

    fetch.mockRejectOnce(new Error('Server error'));

    const saveButton = screen.getAllByText("SAVE")[0];
    fireEvent.click(saveButton);

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/tasks/1'),
            expect.objectContaining({
                method: 'PUT',
                body: JSON.stringify({taskdescription: 'Updated with error'})
            })
        );
    });

});

