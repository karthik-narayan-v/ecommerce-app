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
    return (
      <div className="p-6 text-center text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
          <p className="text-gray-600 dark:text-gray-300">
            Price: ${item.price} × {item.quantity} ={' '}
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </p>
          <button
            onClick={() => handleRemove(item.id)}
            className="mt-3 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Total: ${total.toFixed(2)}
        </h3>
        <button
          onClick={handleClearCart}
          className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
