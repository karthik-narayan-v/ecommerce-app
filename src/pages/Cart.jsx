import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
