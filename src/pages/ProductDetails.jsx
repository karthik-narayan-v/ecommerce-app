import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchProducts } from '../redux/product/productSlice';
import { addToCart } from '../redux/cart/cartSlice';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, items: allProducts, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchProducts());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  if (loading || !product) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        <p className="text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain bg-white rounded"
          />
        </div>

        <div className="text-gray-800 dark:text-white">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
          <h4 className="text-2xl font-semibold mb-2">${product.price}</h4>
          <p className="text-yellow-500 font-medium mb-6">
            ⭐ {product.rating?.rate || 0} / 5 ({product.rating?.count || 0} reviews)
          </p>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Similar Products
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {similarProducts.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition hover:shadow-lg hover:scale-105"
              >
                <div className="w-full h-52 flex items-center justify-center bg-white dark:bg-gray-700">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain p-4"
                  />
                </div>
                <div className="p-4 text-gray-800 dark:text-white">
                  <h4 className="text-md font-semibold line-clamp-2 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">${item.price}</p>
                  <p className="text-sm text-yellow-500">
                    ⭐ {item.rating?.rate || 0} / 5
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
