import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e) => {
    // We pass the event so the fly-to-cart animation knows where to start
    addToCart(product, e);
  };

  return (
    <div className="product-card relative group flex flex-col h-full bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary)]/20 hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        {product.discountPercentage > 0 && (
          <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm">
            {product.discountPercentage}% OFF
          </span>
        )}
        {product.newArrival && (
          <span className="bg-blue-500/90 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm">
            NEW
          </span>
        )}
        {product.bestseller && (
          <span className="bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm">
            BESTSELLER
          </span>
        )}
      </div>

      <div className="product-image relative w-full aspect-[4/3] overflow-hidden bg-[#222]">
        <img 
          src={product.image || '/logo192.png'} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white font-bold tracking-widest uppercase border border-white/40 px-4 py-2 rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>
      
      <div className="product-body flex flex-col flex-1 p-5 gap-3">
        <div className="flex justify-between items-start min-w-0 gap-2">
          <h2 className="text-[var(--text-main)] text-lg font-semibold line-clamp-1 flex-1 min-w-0 pr-2">
            {product.name}
          </h2>
          <div className="flex items-center gap-1 text-[var(--primary)] text-sm whitespace-nowrap shrink-0 mt-1">
            <span>★</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-[var(--text-muted)] text-xs">({product.numReviews})</span>
          </div>
        </div>
        
        <p className="text-[var(--text-muted)] text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="product-price text-2xl font-bold text-[var(--text-main)]">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[var(--text-muted)] text-sm line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <div className="product-actions grid grid-cols-2 gap-3 w-full">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`h-11 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                isOutOfStock 
                  ? 'bg-[#333] text-gray-500 cursor-not-allowed' 
                  : 'bg-[var(--primary)] text-black hover:bg-yellow-500 hover:shadow-lg hover:shadow-[var(--primary)]/30 active:scale-95'
              }`}
            >
              Add to Cart
            </button>
            <Link 
              to={`/products/${product._id || product.slug}`} 
              className="h-11 rounded-lg font-semibold bg-transparent border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:border-white/60 hover:bg-white/5 active:scale-95"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
