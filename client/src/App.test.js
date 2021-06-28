import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza el titulo del landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create recipes/i);
  expect(linkElement).toBeInTheDocument();
});

test('renderiza el boton de home en landing page', () => {
    render(<App/>);
    const button = screen.getByRole('button', {name: /home/i});
    expect(button).toBeInTheDocument();
})