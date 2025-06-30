// write the cartItemComponent

// import React from 'react';
import { CartItem } from '../types/cart';
// import { useDispatch } from 'react-redux';
// import { removeFromCart } from '../redux/cartSlice';
// import { Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemComponentProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  // const dispatch = useDispatch();

  const handleRemove = () => {
    // dispatch(removeFromCart(item.id));
    console.log("remove")
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
      <div style={{ flexGrow: 1 }}>
        <h3>{item.name}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <button color="secondary" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}

// This component displays a single cart item with its name, price, and quantity.
// It also includes a button to remove the item from the cart, which dispatches an action to the Redux store to update the cart state.
// The component uses Material-UI for styling and icons, providing a consistent look and feel with