import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import './OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, getOrderById } = useOrderStore();

  useEffect(() => {
    getOrderById(id);
  }, [id]);

  if (loading) {
    return <div className="order-details-page"><p>Loading order details...</p></div>;
  }

  if (!order) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <p>Order not found</p>
          <button onClick={() => navigate('/orders')} className="back-btn">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusSteps = () => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    return statuses.map((status) => ({
      status,
      completed: statuses.indexOf(status) <= statuses.indexOf(order.orderStatus),
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '📋';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '✅';
      default:
        return '📦';
    }
  };

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        <button onClick={() => navigate('/orders')} className="back-link">
          ← Back to Orders
        </button>

        <div className="order-header">
          <div>
            <h1>Order #{order.orderNumber}</h1>
            <p className="order-date">
              Ordered on{' '}
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="order-status-large">
            <span className="status-badge-large">{order.orderStatus.toUpperCase()}</span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="order-timeline">
          <h3>Order Status</h3>
          <div className="timeline">
            {getStatusSteps().map((step, index) => (
              <div
                key={step.status}
                className={`timeline-step ${step.completed ? 'completed' : ''}`}
              >
                <div className="timeline-marker">
                  <span className="timeline-icon">{getStatusIcon(step.status)}</span>
                </div>
                <div className="timeline-content">
                  <h4>{step.status.charAt(0).toUpperCase() + step.status.slice(1)}</h4>
                  <p>
                    {step.completed
                      ? `Order ${step.status}`
                      : `Waiting for order to be ${step.status}`}
                  </p>
                </div>
                {index < getStatusSteps().length - 1 && (
                  <div className={`timeline-line ${step.completed ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="order-details-content">
          {/* Order Items */}
          <div className="order-section">
            <h3>Order Items</h3>
            <div className="items-table">
              <div className="table-header">
                <div className="col-product">Product</div>
                <div className="col-price">Price</div>
                <div className="col-qty">Quantity</div>
                <div className="col-subtotal">Subtotal</div>
              </div>
              {order.items.map((item) => (
                <div key={item._id} className="table-row">
                  <div className="col-product">
                    <img src={item.product.image} alt={item.product.name} />
                    <div>
                      <p className="product-name">{item.product.name}</p>
                      <p className="product-category">{item.product.category}</p>
                    </div>
                  </div>
                  <div className="col-price">${item.price.toFixed(2)}</div>
                  <div className="col-qty">{item.quantity}</div>
                  <div className="col-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-section">
            <h3>Order Summary</h3>
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="order-section">
            <h3>Shipping Address</h3>
            <div className="address-box">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="order-section">
            <h3>Payment Information</h3>
            <div className="payment-box">
              <div className="payment-row">
                <span>Payment Method:</span>
                <span>{order.paymentMethod.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div className="payment-row">
                <span>Payment Status:</span>
                <span
                  className={`payment-status ${order.paymentStatus}`}
                >
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
              {order.transactionId && (
                <div className="payment-row">
                  <span>Transaction ID:</span>
                  <span className="transaction-id">{order.transactionId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
