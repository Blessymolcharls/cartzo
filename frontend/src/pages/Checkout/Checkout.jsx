import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { orderService } from '../../services/orderService';
import { paymentService } from '../../services/paymentService';
import { useNotification } from '../../context/NotificationContext';
import { STORAGE_KEYS } from '../../utils/constants';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import OrderReview from '../../components/Checkout/OrderReview';
import PaymentWidget from '../../components/Checkout/PaymentWidget';
import PaymentSummary from '../../components/Checkout/PaymentSummary';
import ErrorMessage from '../../components/Common/ErrorMessage';

const Checkout = () => {
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const savedCheckoutAddress = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKOUT_ADDRESS));
  const savedAddresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_ADDRESSES)) || [];
  const [shippingData, setShippingData] = useState(savedCheckoutAddress || null);
  const [addresses, setAddresses] = useState(savedAddresses);
  const [step, setStep] = useState(savedCheckoutAddress ? 'review' : 'address');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = getTotalPrice();

  const handleAddressSubmit = (data, saveAddress = false) => {
    setShippingData(data);
    localStorage.setItem(STORAGE_KEYS.CHECKOUT_ADDRESS, JSON.stringify(data));
    setStep('review');

    if (saveAddress) {
      const existing = addresses.find((address) =>
        address.street === data.street &&
        address.city === data.city &&
        address.state === data.state &&
        address.zipCode === data.zipCode &&
        address.phone === data.phone
      );
      if (!existing) {
        const nextAddresses = [data, ...addresses].slice(0, 5);
        setAddresses(nextAddresses);
        localStorage.setItem(STORAGE_KEYS.SAVED_ADDRESSES, JSON.stringify(nextAddresses));
        showNotification('Address saved for next time.', 'success');
      }
    }
  };

  const handleProceedToPayment = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!shippingData) {
        throw new Error('Shipping information is required.');
      }

      const paymentOrder = await paymentService.createOrder(total);
      const paymentResult = await paymentService.openRazorpay(paymentOrder.data);

      const orderPayload = {
        shippingAddress: shippingData,
        items: cartItems,
        totalAmount: total,
        currency: 'INR',
        paymentInfo: paymentResult,
        status: 'paid',
      };

      const savedOrder = await orderService.create(orderPayload);
      clearCart();
      navigate('/checkout/success', {
        state: { orderId: savedOrder.data._id || savedOrder.data.id },
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to complete payment.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
        <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-600">Your cart is empty. Add items to checkout.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {step === 'address' && (
            <CheckoutForm
              onSubmit={handleAddressSubmit}
              initialData={shippingData}
              savedAddresses={addresses}
              onManageAddresses={setAddresses}
            />
          )}
          {step !== 'address' && (
            <OrderReview
              shippingData={shippingData}
              cartItems={cartItems}
              onEditAddress={() => setStep('address')}
            />
          )}
        </div>
        <div className="space-y-6">
          <PaymentSummary items={cartItems} />
          {error && <ErrorMessage message={error} />}
          <PaymentWidget
            onProceed={handleProceedToPayment}
            label={step === 'review' ? `Pay ₹${total}` : 'Pay now'}
            loading={loading}
            disabled={step === 'address' || loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
