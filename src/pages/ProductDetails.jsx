import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { product, loading, getProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    getProductById(id);
  }, [id]);

  useEffect(() => {
    if (user && product) {
      checkWishlist();
    }
  }, [product, user]);

  const checkWishlist = async () => {
    try {
      const result = await isInWishlist(id);
      setInWishlist(result);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product._id, quantity);
      alert('Product added to cart!');
      setQuantity(1);
    } catch (error) {
      alert('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
      setInWishlist(!inWishlist);
    } catch (error) {
      alert('Failed to update wishlist');
    }
  };

  if (loading) {
    return <div className="product-details-page"><p>Loading product details...</p></div>;
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="product-details-container">
          <p>Product not found</p>
          <button onClick={() => navigate('/products')} className="back-btn">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const displayPrice = product.discountPrice || product.price;
  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <button onClick={() => navigate('/products')} className="back-link">
          ← Back to Products
        </button>

        <div className="product-details-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
              {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}
            </div>
            <div className="thumbnail-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>

            <div className="rating">
              <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
              <span className="rating-text">
                {product.rating} ({product.numReviews} reviews)
              </span>
            </div>

            <div className="price-section">
              <span className="current-price">${displayPrice.toFixed(2)}</span>
              {product.discountPrice && (
                <span className="original-price">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="description">{product.description}</p>

            <div className="stock-info">
              {product.stock > 0 ? (
                <span className="in-stock">✅ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">❌ Out of Stock</span>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  disabled={product.stock === 0}
                />
              </div>

              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
              >
                {isAdding ? '⏳ Adding...' : '🛒 Add to Cart'}
              </button>

              <button
                className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={handleWishlist}
              >
                {inWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>

            <div className="product-details-tabs">
              <div className="detail-item">
                <span className="label">SKU:</span>
                <span className="value">{product.sku || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Category:</span>
                <span className="value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="label">Availability:</span>
                <span className="value">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}

          {user && (
            <div className="add-review">
              <h3>Leave a Review</h3>
              <div className="review-form">
                <div className="form-group">
                  <label htmlFor="rating">Rating:</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="form-input"
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    id="comment"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows="4"
                    className="form-input"
                  ></textarea>
                </div>

                <button className="submit-review-btn">Submit Review</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
