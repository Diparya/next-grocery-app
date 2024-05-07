"use client"

import React, { useEffect, useState } from 'react';

const Home = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch data from the API
        const res = await fetch('/api/categories-with-products');
        const data = await res.json();
        setCategoryProducts(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoryProducts(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <div>
      <h1>Category-wise Products</h1>
      {categoryProducts.map(category => (
        <div key={category._id}>
          <h2>{category.c_name}</h2>
          <ul>
            {category.products.map(product => (
              <li key={product._id}>{product.p_name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
