import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart } = useCartStore();
  const { createOrder, loading } = useOrderStore();

  const [formData, setFormData] = useState({
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    paymentMethod: 'credit_card',
    sameAsShipping: true,
  });

  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (!cart || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  const handleSameAsShipping = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsShipping: isChecked,
      billingAddress: isChecked ? prev.shippingAddress : prev.billingAddress,
    }));
  };

  const validateAddresses = () => {
    const { street, city, state, zipCode, country } = formData.shippingAddress;
    if (!street || !city || !state || !zipCode || !country) {
      setError('Please fill in all shipping address fields');
      return false;
    }

    if (!formData.sameAsShipping) {
      const billing = formData.billingAddress;
      if (!billing.street || !billing.city || !billing.state || !billing.zipCode || !billing.country) {
        setError('Please fill in all billing address fields');
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    setError('');

    if (!validateAddresses()) {
      return;
    }

    try {
      const orderData = {
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.sameAsShipping ? formData.shippingAddress : formData.billingAddress,
        paymentMethod: formData.paymentMethod,
      };

      await createOrder(orderData);
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    }
  };

  if (!cart) {
    return <div className="checkout-page"><p>Loading...</p></div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="checkout-content">
          <div className="checkout-form">
            {/* Step 1: Shipping Address */}
            <div className="checkout-step">
              <div className="step-header" onClick={() => setStep(1)}>
                <div className="step-number">1</div>
                <h2>Shipping Address</h2>
              </div>

              {step === 1 && (
                <div className="step-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.shippingAddress.street}
                        onChange={(e) => handleAddressChange(e, 'shippingAddress')}
                        placeholder="123 Main Street"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.shippingAddress.city}
                        onChange={(e) => handleAddressChange(e, 'shippingAddress')}
                        placeholder="New York"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.shippingAddress.state}
                        onChange={(e) => handleAddressChange(e, 'shippingAddress')}
                        placeholder="NY"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.shippingAddress.zipCode}
                        onChange={(e) => handleAddressChange(e, 'shippingAddress')}
                        placeholder="10001"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.shippingAddress.country}
                        onChange={(e) => handleAddressChange(e, 'shippingAddress')}
                        placeholder="United States"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="next-step-btn"
                  >
                    Continue to Billing
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Billing Address */}
            <div className="checkout-step">
              <div className="step-header" onClick={() => setStep(2)}>
                <div className="step-number">2</div>
                <h2>Billing Address</h2>
              </div>

              {step === 2 && (
                <div className="step-content">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleSameAsShipping}
                    />
                    <label htmlFor="sameAsShipping">Same as shipping address</label>
                  </div>

                  {!formData.sameAsShipping && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Street Address</label>
                          <input
                            type="text"
                            name="street"
                            value={formData.billingAddress.street}
                            onChange={(e) => handleAddressChange(e, 'billingAddress')}
                            placeholder="123 Main Street"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.billingAddress.city}
                            onChange={(e) => handleAddressChange(e, 'billingAddress')}
                            placeholder="New York"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.billingAddress.state}
                            onChange={(e) => handleAddressChange(e, 'billingAddress')}
                            placeholder="NY"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.billingAddress.zipCode}
                            onChange={(e) => handleAddressChange(e, 'billingAddress')}
                            placeholder="10001"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.billingAddress.country}
                            onChange={(e) => handleAddressChange(e, 'billingAddress')}
                            placeholder="United States"
                            className="form-input"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="step-buttons">
                    <button onClick={() => setStep(1)} className="back-btn">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="next-step-btn">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div className="checkout-step">
              <div className="step-header" onClick={() => setStep(3)}>
                <div className="step-number">3</div>
                <h2>Payment Method</h2>
              </div>

              {step === 3 && (
                <div className="step-content">
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handlePaymentMethodChange}
                      />
                      <span>💳 Credit Card</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="debit_card"
                        checked={formData.paymentMethod === 'debit_card'}
                        onChange={handlePaymentMethodChange}
                      />
                      <span>🏧 Debit Card</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handlePaymentMethodChange}
                      />
                      <span>🅿️ PayPal</span>
                    </label>
                  </div>

                  <div className="step-buttons">
                    <button onClick={() => setStep(2)} className="back-btn">
                      Back
                    </button>
                    <button onClick={() => setStep(4)} className="next-step-btn">
                      Review Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Order Review */}
            <div className="checkout-step">
              <div className="step-header" onClick={() => setStep(4)}>
                <div className="step-number">4</div>
                <h2>Review Order</h2>
              </div>

              {step === 4 && (
                <div className="step-content">
                  <div className="review-section">
                    <h3>Shipping Address</h3>
                    <p>
                      {formData.shippingAddress.street}, {formData.shippingAddress.city},{' '}
                      {formData.shippingAddress.state} {formData.shippingAddress.zipCode},{' '}
                      {formData.shippingAddress.country}
                    </p>
                  </div>

                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <p>
                      {formData.paymentMethod === 'credit_card' && '💳 Credit Card'}
                      {formData.paymentMethod === 'debit_card' && '🏧 Debit Card'}
                      {formData.paymentMethod === 'paypal' && '🅿️ PayPal'}
                    </p>
                  </div>

                  <div className="step-buttons">
                    <button onClick={() => setStep(3)} className="back-btn">
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="place-order-btn"
                      disabled={loading}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary-sidebar">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.items.map((item) => (
                <div key={item.product._id} className="summary-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <p className="item-name">{item.product.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
