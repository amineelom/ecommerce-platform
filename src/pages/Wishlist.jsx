import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { wishlist, loading, getWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (user) {
      getWishlist();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-state">
            <h2>Please log in to view your wishlist</h2>
            <Link to="/login" className="login-link">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="wishlist-page"><p>Loading wishlist...</p></div>;
  }

  if (!wishlist || wishlist.items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-state">
            <h2>Your wishlist is empty</h2>
            <p>Start adding products to your wishlist</p>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert('Failed to add product to cart');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      alert('Failed to remove product from wishlist');
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        <p className="wishlist-count">{wishlist.items.length} item(s) in your wishlist</p>

        <div className="wishlist-grid">
          {wishlist.items.map((item) => (
            <div key={item.product._id} className="wishlist-item">
              <div className="item-image">
                <img src={item.product.image} alt={item.product.name} />
              </div>

              <div className="item-info">
                <h3>{item.product.name}</h3>
                <p className="item-category">{item.product.category}</p>
                <p className="item-description">
                  {item.product.description.substring(0, 100)}...
                </p>

                <div className="item-rating">
                  <span className="stars">{'⭐'.repeat(Math.round(item.product.rating))}</span>
                  <span className="rating-value">({item.product.numReviews})</span>
                </div>

                <div className="item-price">
                  <span className="current-price">
                    ${(item.product.discountPrice || item.product.price).toFixed(2)}
                  </span>
                  {item.product.discountPrice && (
                    <span className="original-price">${item.product.price.toFixed(2)}</span>
                  )}
                </div>

                <div className="item-stock">
                  {item.product.stock > 0 ? (
                    <span className="in-stock">✅ In Stock</span>
                  ) : (
                    <span className="out-of-stock">❌ Out of Stock</span>
                  )}
                </div>

                <div className="item-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item.product._id)}
                    disabled={item.product.stock === 0}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${item.product._id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.product._id)}
                  >
                    Remove
                  </button>
                </div>

                <p className="added-date">
                  Added on{' '}
                  {new Date(item.addedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
