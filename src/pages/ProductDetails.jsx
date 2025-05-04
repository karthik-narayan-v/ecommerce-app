import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductById,
} from '../redux/product/productSlice';
import { addToCart } from '../redux/cart/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading || !product) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-details" style={{ padding: '20px' }}>
      <img src={product.image} alt={product.title} style={{ height: '300px' }} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h4>${product.price}</h4>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
