import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (starship) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.url === starship.url);
      if (item) {
        return prevCart.map((item) =>
          item.url === starship.url
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
      const item = prevCart.find((item) => item.url === name);
      if (item.quantity === 1) {
        return prevCart.filter((item) => item.url !== name);
      } else {
        return prevCart.map((item) =>
          item.url === name ? { ...item, quantity: item.quantity - 1 } : item
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