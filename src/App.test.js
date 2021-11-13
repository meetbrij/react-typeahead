import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App';


test('renders page successfully', () => {
  render(<App />);
  const linkElement = screen.getByText(/Type Ahead Component for searching stock ticker/i);
  expect(linkElement).toBeInTheDocument();
});

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Type Ahead Component for searching stock ticker/i)).toBeInTheDocument();
  });
});

describe("TypeAhead", () => {
  it("allows the user to search for stock", () => {
    render(<App />)

    // fill out the search
    fireEvent.change(screen.getByTestId("text-field-search"), {
      target: {value: 'aa'},
    })

    const list = screen.getByTestId('list-container')
    expect(list).toHaveTextContent(/staar surgical company/i)
  });
});

describe("Theme", () => {
  it("allows the user to change page theme", () => {
    render(<App />)

    fireEvent.click(screen.getByTestId("dark"))

    const menu = screen.getByTestId('menu-section')
    expect(menu).toHaveClass("dark")
  });
});
