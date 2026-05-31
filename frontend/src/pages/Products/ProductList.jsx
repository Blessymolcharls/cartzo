import React, { useEffect, useState, useMemo } from 'react';
import { NavLink, useOutletContext, useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/Product/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL State
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('keyword') || '';
  const currentSort = searchParams.get('sortBy') || '';
  
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Living',
    'Books',
    'Accessories'
  ];

  const sortOptions = [
    { label: 'Newest', value: 'createdAt:desc' },
    { label: 'Price: Low to High', value: 'price:asc' },
    { label: 'Price: High to Low', value: 'price:desc' },
    { label: 'Highest Rated', value: 'rating:desc' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          keyword: currentSearch,
          category: currentCategory,
          sortBy: currentSort,
        };
        const response = await productService.getAll(params);
        // support both paginated object and direct array
        setProducts(response.data.products || response.data || []);
      } catch (err) {
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentSearch, currentSort]);

  const handleCategoryClick = (cat) => {
    if (currentCategory === cat) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const q = formData.get('search');
    if (q) {
      searchParams.set('keyword', q);
    } else {
      searchParams.delete('keyword');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    if (val) {
      searchParams.set('sortBy', val);
    } else {
      searchParams.delete('sortBy');
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const displayName = useMemo(() => {
    if (!user) return 'Guest';
    return user.name || user.fullName || user.username || 'Account';
  }, [user]);

  return (
    <div className="products-page">
      <div className="products-layout">

        <div className="products-main">
          <div className="products-header flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold font-['Montserrat']">Inventory</h1>
              <p className="text-[var(--text-muted)] mt-1">
                {currentCategory ? `Browsing ${currentCategory}` : 'Curated selection of premium items.'}
                {currentSearch && ` | Searching for "${currentSearch}"`}
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">{products.length} products found</span>
              <select 
                value={currentSort}
                onChange={handleSortChange}
                className="bg-[var(--bg-darker)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--primary)] w-full md:w-auto"
              >
                <option value="">Sort By</option>
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="products-alert">
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="btn-primary w-fit">Retry</button>
            </div>
          )}

          <div className="products-grid">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-[var(--glass-bg)] border border-[var(--border-subtle)] rounded-2xl h-[400px]"></div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => <ProductCard key={product._id || product.id} product={product} />)
            ) : (
              <div className="col-span-full products-empty flex flex-col items-center justify-center py-20">
                <div className="text-5xl mb-4 opacity-50">🔍</div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-[var(--text-muted)] max-w-md mb-6">
                  We couldn't find anything matching your filters. Try adjusting your search term or category.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
