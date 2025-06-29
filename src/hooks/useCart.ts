import { useState, useEffect } from 'react';
import { Product, CartItem, Cart } from '../types';

const CART_KEY = 'storebay_cart';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper function to recalculate cart totals
  const recalculateCart = (items: CartItem[]): Cart => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    console.log('Recalculating cart:', {
      itemsLength: items.length,
      total: total.toFixed(2),
      itemCount
    });
    
    return { items, total, itemCount };
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_KEY);
        console.log('Loading cart from localStorage:', savedCart);
        
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate the cart structure
          if (parsedCart && Array.isArray(parsedCart.items)) {
            // Recalculate totals to ensure consistency
            const recalculatedCart = recalculateCart(parsedCart.items);
            setCart(recalculatedCart);
            console.log('Cart loaded successfully:', recalculatedCart);
          } else {
            // Reset cart if structure is invalid
            console.log('Invalid cart structure, resetting');
            setCart({ items: [], total: 0, itemCount: 0 });
          }
        } else {
          console.log('No saved cart found');
          setCart({ items: [], total: 0, itemCount: 0 });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Reset cart if there's an error
        setCart({ items: [], total: 0, itemCount: 0 });
      } finally {
        setIsLoaded(true);
        console.log('Cart loading completed');
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever cart changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    console.log('Adding to cart:', { productId: product.id, title: product.title, quantity });
    
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('Updated existing item quantity');
      } else {
        newItems = [...prevCart.items, { product, quantity }];
        console.log('Added new item to cart');
      }

      const newCart = recalculateCart(newItems);
      console.log('Cart after adding:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    console.log('Removing from cart:', { productId });
    
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const newCart = recalculateCart(newItems);
      console.log('Cart after removing:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    console.log('Updating quantity:', { productId, quantity });
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      const newCart = recalculateCart(newItems);
      console.log('Cart after quantity update:', newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCart({ items: [], total: 0, itemCount: 0 });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoaded
  };
};