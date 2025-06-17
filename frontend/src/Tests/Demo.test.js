import Demo from "../Demo";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';


test('renders Demo title', () => {
    render(<Demo />);
    const
        linkElement = screen.getByText(/Demo/i);
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toBeVisible()
    expect(linkElement).toHaveClass("headline")
});
