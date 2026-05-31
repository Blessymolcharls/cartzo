import React, { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { triggerFlyToCart } from '../utils/animations';

const getProductId = (product) => product.id || product._id;

export const CartContext = createContext();

// Internal success modal component
const CartSuccessModal = ({ product, visible }) => {
  if (!visible || !product) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none">
      {/* Blurred Backdrop overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" />
      
      {/* Modal Content */}
      <div className="relative pointer-events-auto bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 animate-[modalScaleIn_0.3s_ease-out_forwards] max-w-[300px] w-[90%] text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10">
          <img src={product.image || '/logo192.png'} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg leading-tight mb-1">Added to Cart</h3>
          <p className="text-[var(--text-muted)] text-sm line-clamp-2">{product.name}</p>
        </div>
      </div>
      
      {/* Add inline keyframes for the modal animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes modalScaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
    return saved ? JSON.parse(saved) : [];
  });

  const [justAddedProduct, setJustAddedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTimeout, setModalTimeout] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, event) => {
    const productId = getProductId(product);
    
    // 1. Update Cart State
    setCartItems((prev) => {
      const existing = prev.find((item) => getProductId(item) === productId);
      if (existing) {
        return prev.map((item) =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, id: productId, quantity: 1 }];
    });

    // 2. Trigger Fly animation
    if (event) {
      triggerFlyToCart(event, product.image);
    }

    // 3. Show Success Modal
    setJustAddedProduct(product);
    setModalVisible(true);
    
    // Clear previous timeout if spamming add to cart
    if (modalTimeout) {
      clearTimeout(modalTimeout);
    }
    
    // Auto-hide after 2 seconds
    const timeout = setTimeout(() => {
      setModalVisible(false);
      // Wait for fade out to clear product state
      setTimeout(() => setJustAddedProduct(null), 300);
    }, 2000);
    
    setModalTimeout(timeout);
  }, [modalTimeout]);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => getProductId(item) !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCartItems((prev) =>
      quantity === 0
        ? prev.filter((item) => getProductId(item) !== productId)
        : prev.map((item) =>
            getProductId(item) === productId ? { ...item, quantity } : item
          )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartSuccessModal product={justAddedProduct} visible={modalVisible} />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
