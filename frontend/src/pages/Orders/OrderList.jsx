import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';
import Loading from '../../components/Common/Loading';
import { Link } from 'react-router-dom';

const STATUS_STYLES = {
  Pending:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', label: 'Pending' },
  Processing: { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', label: 'Processing' },
  Shipped:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', label: 'Shipped' },
  Delivered:  { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  label: 'Delivered' },
  Cancelled:  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  label: 'Cancelled' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || { color: '#9ca3af', bg: 'rgba(156,163,175,0.12)', label: status || 'Unknown' };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: s.color,
      background: s.bg,
      border: `1px solid ${s.color}33`,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: s.color, display: 'inline-block',
        boxShadow: `0 0 6px ${s.color}`,
      }} />
      {s.label}
    </span>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAll();
        setOrders(response.data);
      } catch (err) {
        setError('Unable to load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text-main)',
          margin: 0,
        }}>Order History</h1>
        <p style={{ color: 'var(--text-soft)', marginTop: '0.4rem', fontSize: '0.95rem' }}>
          {orders.length > 0 ? `You have ${orders.length} order${orders.length !== 1 ? 's' : ''}` : ''}
        </p>
      </div>

      {error ? (
        <div style={{
          padding: '1.5rem',
          borderRadius: '1.25rem',
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.25)',
          color: '#ef4444',
          textAlign: 'center',
        }}>
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          padding: '3rem 2rem',
          borderRadius: '1.5rem',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(12px)',
          textAlign: 'center',
          color: 'var(--text-soft)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>No orders yet</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Start shopping to see your orders here.</p>
          <Link
            to="/shop"
            style={{
              display: 'inline-block',
              marginTop: '1.25rem',
              padding: '0.65rem 1.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, var(--primary), #b8943e)',
              color: '#0a0a0a',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            Browse Shop
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => {
            const orderId = order._id || order.id;
            const shortId = orderId ? orderId.slice(-8).toUpperCase() : 'N/A';
            const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
            }) : '—';
            const total = order.totalPrice ?? order.totalAmount ?? order.total ?? 0;
            const itemCount = order.orderItems?.length ?? 0;

            return (
              <Link
                key={orderId}
                to={`/orders/${orderId}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  borderRadius: '1.25rem',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {/* Left: Order ID + date */}
                    <div>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}>Order</span>
                      <p style={{
                        margin: '2px 0 0',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: 'var(--text-main)',
                        fontFamily: 'monospace',
                      }}>#{shortId}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-soft)' }}>{date}</p>
                    </div>

                    {/* Right: status + total */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </p>
                        <p style={{
                          margin: '4px 0 0',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: 'var(--primary)',
                        }}>₹{Number(total).toFixed(2)}</p>
                      </div>
                      <StatusBadge status={order.orderStatus || order.status} />
                    </div>
                  </div>

                  {/* Items preview */}
                  {order.orderItems && order.orderItems.length > 0 && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--glass-border)',
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}>
                      {order.orderItems.slice(0, 4).map((item, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--glass-border)',
                          fontSize: '0.78rem',
                          color: 'var(--text-soft)',
                        }}>
                          {item.image && (
                            <img src={item.image} alt={item.name}
                              style={{ width: 18, height: 18, borderRadius: '4px', objectFit: 'cover' }} />
                          )}
                          <span>{item.name}</span>
                          <span style={{ color: 'var(--text-muted)' }}>×{item.qty}</span>
                        </div>
                      ))}
                      {order.orderItems.length > 4 && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--glass-border)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}>+{order.orderItems.length - 4} more</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderList;
