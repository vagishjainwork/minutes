import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (starship) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.name === starship.name);
      if (item) {
        return prevCart.map((item) =>
          item.name === starship.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...starship, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.name === name);
      if (item.quantity === 1) {
        return prevCart.filter((item) => item.name !== name);
      } else {
        return prevCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
