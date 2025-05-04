import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Link to={`/product/${product.id}`}>
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      
      <div className="w-full h-52 flex items-center justify-center bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain p-4"
        />
      </div>
      
      <div className="p-4 text-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">
          ${product.price}
        </p>
      </div>
    </div>
  </Link>
);

export default ProductCard;
