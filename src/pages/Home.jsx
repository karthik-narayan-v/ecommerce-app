import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/product/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
