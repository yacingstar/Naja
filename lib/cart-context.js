"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "naja-cart";

function lineKey(productId, colorName) {
  return `${productId}::${colorName}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Guard: localStorage only ever touched inside useEffect (client-only),
  // never during render, so SSR never throws.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage, which can't be read during SSR render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // corrupt/blocked storage — start from an empty cart
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isLoaded]);

  function addItem({ productId, colorName, name, price, imageUrl, hex, quantity = 1 }) {
    const key = lineKey(productId, colorName);
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...current,
        { key, productId, colorName, name, price, imageUrl, hex, quantity },
      ];
    });
    setIsDrawerOpen(true);
  }

  function updateQuantity(key, quantity) {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }

  function removeItem(key) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        count,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
