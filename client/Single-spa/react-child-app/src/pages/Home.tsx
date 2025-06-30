
// export default function Home() {
//   return (
//     <div style={{ backgroundColor: "red" }}>
//         HOME
//     </div>
//   );
// }


// write a functional  compoent to show the cart items like in amazon

// import React from 'react';
import { CartItem } from '../types/cart';
import { Link } from 'react-router-dom';
import CartItemComponent from '../components/CartItemComponent';

export default function Home() {
  // please hardcode the cart items
  const cartItems: CartItem[] = [
    { id: '1', name: 'Item 1', price: 29.99, quantity: 1 },
    { id: '2', name: 'Item 2', price: 49.99, quantity: 2 },
    { id: '3', name: 'Item 3', price: 19.99, quantity: 1 },
  ];
  

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item: CartItem) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}
      <Link to="/checkout">
        <button style={{ marginTop: '20px' }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}

// This component displays the shopping cart items and includes a button to proceed to checkout.
// It uses Redux to access the cart items from the global state and maps over them to render