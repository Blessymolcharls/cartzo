import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../context/NotificationContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { showNotification } = useNotification();
  const productId = item.id || item._id;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src={item.image || '/logo192.png'} alt={item.name} className="h-24 w-24 rounded-3xl object-cover" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
            <button type="button" onClick={() => updateQuantity(productId, Math.max(item.quantity - 1, 1))} className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-200">
              -
            </button>
            <span className="font-semibold text-gray-900">{item.quantity}</span>
            <button type="button" onClick={() => updateQuantity(productId, item.quantity + 1)} className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-200">
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              removeFromCart(productId);
              showNotification(`Removed ${item.name} from cart.`, 'info');
            }}
            className="text-sm font-medium text-error-600 hover:text-error-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
