import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import Loading from '../../components/Common/Loading';

const STATUS_STYLES = {
  Pending:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  Processing: { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  Shipped:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  Delivered:  { color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  Cancelled:  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || { color: '#9ca3af', bg: 'rgba(156,163,175,0.12)' };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '5px 14px',
      borderRadius: '999px',
      fontSize: '0.8rem',
      fontWeight: 700,
      color: s.color,
      background: s.bg,
      border: `1px solid ${s.color}44`,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: s.color, boxShadow: `0 0 8px ${s.color}`,
      }} />
      {status || 'Unknown'}
    </span>
  );
};

const InfoCard = ({ title, children }) => (
  <div style={{
    borderRadius: '1rem',
    border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)',
    padding: '1.25rem',
  }}>
    <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</h3>
    {children}
  </div>
);

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getById(id);
        setOrder(response.data);
      } catch (err) {
        setError('Unable to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <Loading />;

  if (error) return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1.5rem', borderRadius: '1.25rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', textAlign: 'center' }}>
      {error}
    </div>
  );

  if (!order) return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1.5rem', borderRadius: '1.25rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-soft)', textAlign: 'center' }}>
      Order not found.
    </div>
  );

  const orderId = order._id || order.id;
  const shortId = orderId ? orderId.slice(-8).toUpperCase() : 'N/A';
  const total = order.totalPrice ?? order.totalAmount ?? order.total ?? 0;
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }) : '—';
  const items = order.orderItems || [];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Back link */}
      <Link to="/orders" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.88rem',
        color: 'var(--text-soft)',
        textDecoration: 'none',
        marginBottom: '1.5rem',
        transition: 'color 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-soft)'}
      >
        ← Back to Orders
      </Link>

      {/* Header */}
      <div style={{
        borderRadius: '1.5rem',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(14px)',
        padding: '1.5rem 2rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Order</p>
          <h1 style={{ margin: '4px 0 0', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'monospace' }}>#{shortId}</h1>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-soft)' }}>{date}</p>
        </div>
        <StatusBadge status={order.orderStatus || order.status} />
      </div>

      {/* Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <InfoCard title="Shipping Address">
          {order.shippingAddress ? (
            <>
              <p style={{ margin: '0 0 4px', color: 'var(--text-main)', fontWeight: 600 }}>{order.shippingAddress.street}</p>
              <p style={{ margin: '0 0 4px', color: 'var(--text-soft)', fontSize: '0.9rem' }}>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p style={{ margin: '0 0 4px', color: 'var(--text-soft)', fontSize: '0.9rem' }}>{order.shippingAddress.zipCode}</p>
              <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '0.9rem' }}>{order.shippingAddress.country}</p>
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Not available</p>
          )}
        </InfoCard>

        <InfoCard title="Payment">
          <p style={{ margin: '0 0 8px', color: 'var(--text-soft)', fontSize: '0.9rem' }}>
            Status: <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{order.paymentStatus || 'Pending'}</span>
          </p>
          <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
            ₹{Number(total).toFixed(2)}
          </p>
        </InfoCard>
      </div>

      {/* Order Items */}
      <div style={{
        borderRadius: '1.5rem',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(14px)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Items ({items.length})
          </h2>
        </div>

        {items.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No items found.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((item, index) => (
              <div key={item._id || index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderBottom: index < items.length - 1 ? '1px solid var(--glass-border)' : 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Image */}
                <div style={{
                  width: 64, height: 64, flexShrink: 0,
                  borderRadius: '0.6rem',
                  overflow: 'hidden',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.05)',
                }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📦</div>
                  )}
                </div>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Qty: {item.qty} × ₹{Number(item.price).toFixed(2)}
                  </p>
                </div>

                {/* Subtotal */}
                <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', flexShrink: 0 }}>
                  ₹{(item.qty * item.price).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Total row */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span style={{ fontWeight: 600, color: 'var(--text-soft)' }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)' }}>
                ₹{Number(total).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
