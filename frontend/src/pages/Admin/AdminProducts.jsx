import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products?pageSize=100');
      setProducts(response.data.products || response.data);
    } catch (error) {
      showNotification('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        await axios.delete(`/api/products/${id}`, config);
        showNotification('Product deleted successfully', 'success');
        fetchProducts(); // Refresh list
      } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete product', 'error');
      }
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-10">Loading products...</div>;

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage your store inventory.</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="bg-[var(--primary)] text-black px-4 py-2 rounded-xl font-bold hover:bg-[#b8943e] transition-colors shadow-lg shadow-[var(--primary)]/20 flex items-center gap-2"
        >
          <span>+</span> Add Product
        </Link>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No products found. Add one to get started.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <img src={product.image || '/placeholder.png'} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-black" />
                    </td>
                    <td className="p-4 font-medium text-white max-w-xs truncate">{product.name}</td>
                    <td className="p-4 text-gray-300">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.stock > 10 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                        product.stock > 0 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/admin/products/${product._id}/edit`}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
