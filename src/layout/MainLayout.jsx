import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader/Loader';

function MainLayout() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category.name))
        );
        setCategories(uniqueCategories);
        setLoading(false);
      });
  }, [location.pathname]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === '' || product.category.name === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {loading && <Loader />}
      <Navbar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
      />
      <main>
        <Outlet context={{ filteredProducts }} />
      </main>
    </div>
  );
}

export default MainLayout;
