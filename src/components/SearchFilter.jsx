import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch, onFilter, categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter({
      category: value,
      priceRange,
      sortBy,
    });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = [priceRange[0], value];
    setPriceRange(newRange);
    onFilter({
      category: selectedCategory,
      priceRange: newRange,
      sortBy,
    });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onFilter({
      category: selectedCategory,
      priceRange,
      sortBy: value,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    onSearch('');
    onFilter({
      category: '',
      priceRange: [0, 1000],
      sortBy: 'newest',
    });
  };

  return (
    <div className="search-filter">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={handleReset} className="reset-btn">
          ✕
        </button>
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        ⚙️ Filters {showFilters ? '▲' : '▼'}
      </button>

      {/* Filters */}
      <div className={`filters ${showFilters ? 'show' : ''}`}>
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price Range Filter */}
        <div className="filter-group">
          <label htmlFor="price">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            id="price"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="price-slider"
          />
        </div>

        {/* Sort Filter */}
        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="filter-select"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Reset Button */}
        <button onClick={handleReset} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
