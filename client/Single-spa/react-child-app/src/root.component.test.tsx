import { render, screen } from '@testing-library/react';
import Root from './root.component';

// Mock Home component
jest.mock('./pages/Home', () => () => <div>Cart Page</div>);

describe('Root component routing', () => {
  it('renders the Home component at /cart route', () => {
    // Simulate being at /react/cart by mocking window.location
    window.history.pushState({}, '', '/react/cart');

    render(<Root />);

    expect(screen.getByText(/Cart Page/i)).toBeInTheDocument();
  });
});
