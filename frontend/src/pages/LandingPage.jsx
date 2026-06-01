import React from 'react';
import { Link } from 'react-router-dom';

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
          </div>
        </div>
      </header>

      <footer className="w-full py-10 border-t border-[var(--border-subtle)] text-center text-[var(--text-muted)] relative z-10 bg-[var(--bg-darker)]">
        <p>&copy; 2026 Cartzo. Built for modern commerce.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
