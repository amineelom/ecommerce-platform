import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
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

  const displayPrice = product.discountPrice || product.price;
  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card" onClick={() => window.location.href = `/products/${product._id}`}>
      <div className="product-image-container" style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} className="product-image" style={{ cursor: 'pointer' }} />
        {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description.substring(0, 100)}...</p>

        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
          <span className="rating-value">({product.numReviews} reviews)</span>
        </div>

        <div className="product-price">
          <span className="current-price">${displayPrice.toFixed(2)}</span>
          {product.discountPrice && <span className="original-price">${product.price.toFixed(2)}</span>}
        </div>

        <div className="product-stock">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock ({product.stock})</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-actions">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="quantity-input"
            disabled={product.stock === 0}
          />
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
