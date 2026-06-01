import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useNotification } from '../../context/NotificationContext';

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchProducts = async () => {
    try {
      const response = await apiService.get('/products?pageSize=200');
      setProducts(response.data.products || response.data || []);
    } catch (error) {
      console.error('Fetch products error:', error);
      showNotification('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await apiService.delete(`/products/${id}`);
      showNotification('Product deleted', 'success');
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Delete product error:', error);
      showNotification(error.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  const stockBadge = (stock) => {
    if (stock === 0) return 'bg-red-500/10 text-red-400 border border-red-500/20';
    if (stock <= 10) return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    return 'bg-green-500/10 text-green-400 border border-green-500/20';
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} products in inventory</p>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-[var(--primary)] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#b8943e] transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center text-gray-500 text-sm py-12">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Stock</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan="5" className="px-5 py-10 text-center text-gray-600">No products found. Add one to get started.</td></tr>
                ) : products.map((product) => (
                  <tr key={product._id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || '/logo192.png'}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-black flex-shrink-0"
                        />
                        <span className="text-white font-medium truncate max-w-[200px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400">{product.category}</td>
                    <td className="px-5 py-3.5 text-white">₹{product.price.toFixed(2)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${stockBadge(product.stock)}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors border border-white/8"
                          title="Edit"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product._id, product.name)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-white/8"
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
