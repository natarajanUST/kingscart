import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock the CartItemComponent to simplify the test
jest.mock('../components/CartItemComponent', () => ({ item }: any) => (
  <div data-testid="cart-item">{item.name}</div>
));

describe('Home Component', () => {
  test('renders cart items and checkout button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check for heading
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();

    // Check for all cart items
    const cartItems = screen.getAllByTestId('cart-item');
    expect(cartItems).toHaveLength(3);
    expect(cartItems[0]).toHaveTextContent('Item 1');
    expect(cartItems[1]).toHaveTextContent('Item 2');
    expect(cartItems[2]).toHaveTextContent('Item 3');

    // Check for checkout button
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

//   test('shows empty cart message when no items', () => {
//     // Override the cartItems array to be empty
//     jest.spyOn(React, 'useState').mockReturnValueOnce([[], jest.fn()]);

//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     expect(screen.getByText((content, element) =>
//   content.includes('Your cart is empty')
// )).toBeInTheDocument();
//   });
});
