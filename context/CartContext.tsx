// context/CartContext.tsx
'use client';

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

export interface CartItem {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  itemCount: (id: number) => number;
  isInCart: (id: number) => boolean;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after hydration
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart data:', error);
        setCart([]);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  // Add item to cart
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);
      
      if (existingItem) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Increase quantity
  const increaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  // Decrease quantity
  const decreaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Check if item is in cart
  const isInCart = useCallback((id: number) => {
    return cart.some((item) => item.id === id);
  }, [cart]);

  // Get item quantity
  const itemCount = useCallback((id: number) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.quantity : 0;
  }, [cart]);

  // Calculate total items
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Calculate total price
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cart]
  );

  // Don't render until hydrated
  if (!isHydrated) {
    return null; // Or a loading spinner
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
        itemCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}