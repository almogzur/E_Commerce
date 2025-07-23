import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

// Default context values
const defaultContextValues: CartContextType = {
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
  getTotal: () => 0,
};

// Cart context
const CartContext = createContext<CartContextType>(defaultContextValues);

// Cart provider
export const CartProvider: React.FC <{ children: React.ReactNode }>= ({ children }) => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial load (for guest users)
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes (for guest users)
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.productId === item.productId);
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeItemFromCart = (productId: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
