// src/pages/Home/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import './Home.css';

const ITEMS_PER_PAGE = 12;

function Home() {
  const { filteredProducts } = useOutletContext();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, ITEMS_PER_PAGE));
  }, [filteredProducts]);

  const loadMoreProducts = useCallback(() => {
    setDisplayedProducts((prev) => {
      const nextIndex = prev.length + ITEMS_PER_PAGE;
      if (nextIndex >= filteredProducts.length) {
        setHasMore(false);
        return filteredProducts;
      }
      return filteredProducts.slice(0, nextIndex);
    });
  }, [filteredProducts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasMore
    ) {
      loadMoreProducts();
    }
  }, [loadMoreProducts, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow-md cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-gray-600 truncate-description">
              {product.description}
            </p>
            <p className="text-gray-800 font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
