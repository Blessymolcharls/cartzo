import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useNotification } from '../../context/NotificationContext';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    image: '',
    featured: false,
    bestseller: false,
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const { data } = await apiService.get(`/products/${id}`);
          setFormData({
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            stock: data.stock,
            image: data.image,
            featured: data.featured || false,
            bestseller: data.bestseller || false,
          });
        } catch (error) {
          showNotification('Error fetching product', 'error');
          navigate('/admin/products');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, navigate, showNotification, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);
    setUploading(true);

    try {
      const { data } = await apiService.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData(prev => ({ ...prev, image: data }));
      showNotification('Image uploaded successfully', 'success');
    } catch (error) {
      showNotification(error.response?.data?.message || 'Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || formData.price <= 0 || formData.stock < 0) {
      showNotification('Please fill all required fields correctly', 'warning');
      return;
    }

    try {
      if (isEdit) {
        await apiService.put(`/products/${id}`, formData);
        showNotification('Product updated successfully', 'success');
      } else {
        await apiService.post('/products', formData);
        showNotification('Product created successfully', 'success');
      }
      navigate('/admin/products');
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save product', 'error');
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-10">Loading product...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/products')} className="text-gray-400 hover:text-white transition-colors">
          ← Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-gray-400">Complete the form below to {isEdit ? 'update the' : 'create a new'} product.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column - Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[var(--primary)] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[var(--primary)] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    min="0.01"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[var(--primary)] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[var(--primary)] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[var(--primary)] focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Right Column - Media & Settings */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-6 bg-white/5 group hover:border-[var(--primary)]/50 transition-colors">
                  {formData.image ? (
                    <div className="relative w-full aspect-square max-h-60 rounded-xl overflow-hidden bg-black mb-4">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full aspect-square max-h-60 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-gray-500">
                      No image uploaded
                    </div>
                  )}
                  
                  <div className="w-full relative">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Or enter image URL..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white text-sm mb-3 focus:border-[var(--primary)] focus:outline-none"
                    />
                    <label className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl cursor-pointer transition-colors text-sm font-medium">
                      {uploading ? 'Uploading...' : 'Upload File instead'}
                      <input type="file" onChange={uploadFileHandler} className="hidden" accept="image/jpeg, image/png, image/webp" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <h4 className="font-medium text-white mb-2">Visibility & Flags</h4>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="featured" 
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-white/20 text-[var(--primary)] focus:ring-[var(--primary)] bg-black"
                  />
                  <div>
                    <div className="text-gray-200 font-medium">Featured Product</div>
                    <div className="text-xs text-gray-500">Show this product on the home page slider</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="bestseller" 
                    checked={formData.bestseller}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-white/20 text-[var(--primary)] focus:ring-[var(--primary)] bg-black"
                  />
                  <div>
                    <div className="text-gray-200 font-medium">Bestseller Badge</div>
                    <div className="text-xs text-gray-500">Highlight product as a top seller</div>
                  </div>
                </label>
                <div className="pt-2 border-t border-white/10 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.stock === 0}
                      onChange={(e) => handleChange({ target: { name: 'stock', value: e.target.checked ? 0 : 1, type: 'number' }})}
                      className="w-5 h-5 rounded border-red-500/50 text-red-500 focus:ring-red-500 bg-black"
                    />
                    <div>
                      <div className="text-red-400 font-medium">Mark Out of Stock</div>
                      <div className="text-xs text-gray-500">Instantly sets inventory quantity to 0</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
            <button 
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-[var(--primary)] text-black px-8 py-3 rounded-xl font-bold hover:bg-[#b8943e] transition-colors shadow-lg shadow-[var(--primary)]/20"
            >
              {isEdit ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
