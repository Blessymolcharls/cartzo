import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/Product/ProductCard';

const particles = [
  { top: '12%', left: '18%', width: '3px', height: '3px', animationDelay: '0s', animationDuration: '12s' },
  { top: '25%', left: '72%', width: '4px', height: '4px', animationDelay: '1s', animationDuration: '14s' },
  { top: '38%', left: '35%', width: '2px', height: '2px', animationDelay: '2s', animationDuration: '10s' },
  { top: '52%', left: '80%', width: '3px', height: '3px', animationDelay: '3s', animationDuration: '16s' },
  { top: '65%', left: '22%', width: '4px', height: '4px', animationDelay: '4s', animationDuration: '18s' },
  { top: '78%', left: '58%', width: '2px', height: '2px', animationDelay: '2.5s', animationDuration: '13s' },
  { top: '20%', left: '48%', width: '3px', height: '3px', animationDelay: '1.5s', animationDuration: '15s' },
  { top: '70%', left: '88%', width: '4px', height: '4px', animationDelay: '0.5s', animationDuration: '17s' },
  { top: '30%', left: '8%', width: '2px', height: '2px', animationDelay: '3.5s', animationDuration: '11s' },
  { top: '85%', left: '40%', width: '3px', height: '3px', animationDelay: '2.2s', animationDuration: '16s' }
];

function LandingPage() {
  const [featured, setFeatured] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featRes, bestRes, newRes] = await Promise.all([
          productService.getFeatured(),
          productService.getBestsellers(),
          productService.getNewArrivals()
        ]);
        setFeatured(featRes.data || []);
        setBestsellers(bestRes.data || []);
        setNewArrivals(newRes.data || []);
      } catch (error) {
        console.error('Error fetching landing page products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderSection = (title, subtitle, products) => {
    if (products.length === 0 && !loading) return null;

    return (
      <section className="py-20 border-t border-[var(--border-subtle)] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-main)] font-['Montserrat'] tracking-wide">{title}</h2>
              <p className="text-[var(--text-muted)] mt-2">{subtitle}</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors font-medium">
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-[var(--glass-bg)] border border-[var(--border-subtle)] rounded-2xl h-[400px]"></div>
              ))
            ) : (
              products.map(product => <ProductCard key={product._id || product.id} product={product} />)
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] px-6 py-3 text-[var(--text-main)] hover:bg-[var(--glass-bg)] transition-colors w-full">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="landing-bg-orb landing-orb-1" />
        <div className="landing-bg-orb landing-orb-2" />
        <div className="landing-bg-orb landing-orb-3" />
        <div className="landing-bg-orb landing-orb-4" />
        <div className="landing-particles">
          {particles.map((style, index) => (
            <span className="landing-particle" key={`particle-${index}`} style={style} />
          ))}
        </div>
      </div>

      <header className="landing-content">
        <div className="landing-logo-wrapper">
          <div className="landing-logo">CZ</div>
        </div>
        <p className="landing-tagline">Smart Shopping. Better Choices.</p>
        <h1 className="landing-title">Everything You Love, Delivered to Your Door</h1>
        <p className="landing-subtitle">
          Discover trending products, everyday essentials, and exclusive deals all in one seamless shopping
          experience. Fast delivery, secure payments, and quality you can trust.
        </p>
        <div className="landing-glass-card">
          <div className="landing-cta-group">
            <Link className="landing-cta-btn landing-cta-primary" to="/shop">
              Start Shopping
            </Link>
            <Link className="landing-cta-btn landing-cta-secondary" to="/shop">
              Explore Products
            </Link>
          </div>
        </div>
      </header>

      {renderSection("Featured Products", "Curated selection of our finest items.", featured)}
      {renderSection("New Arrivals", "The latest additions to our inventory.", newArrivals)}
      {renderSection("Best Sellers", "Our most popular products, loved by customers.", bestsellers)}
      
      <footer className="w-full py-10 border-t border-[var(--border-subtle)] text-center text-[var(--text-muted)] relative z-10 bg-[var(--bg-darker)]">
        <p>&copy; 2026 Cartzo. Built for modern commerce.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
