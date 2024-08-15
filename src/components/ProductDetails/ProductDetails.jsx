// src/pages/ProductDetails/ProductDetails.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error('Error fetching product details:', error)
      );
  }, [productId]);

  if (!product) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <Link className="btn mb-4" to={'/'}>
        Go Back
      </Link>
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.title} image ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        ))}
      </div>

      <p className="text-gray-800 mb-4">{product.description}</p>
      <p className="text-gray-800 text-xl font-semibold">${product.price}</p>
      <p className="text-gray-600 mt-4">Category: {product.category.name}</p>
    </div>
  );
}

export default ProductDetails;
