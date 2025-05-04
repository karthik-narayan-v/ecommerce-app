import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/product/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.product);

  const scrollContainerRefs = useRef({});
  const [showButtons, setShowButtons] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const scrollLeft = (category) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (category) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const checkScrollButtonsVisibility = (category) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      const threshold = 5;
      const scrollLeft = Math.floor(container.scrollLeft);
      const scrollRight = Math.floor(
        container.scrollWidth - container.clientWidth - container.scrollLeft
      );

      const canScrollLeft = scrollLeft > threshold;
      const canScrollRight = scrollRight > threshold;

      setShowButtons((prev) => {
        const prevState = prev[category] || {};
        if (
          prevState.left !== canScrollLeft ||
          prevState.right !== canScrollRight
        ) {
          return {
            ...prev,
            [category]: {
              left: canScrollLeft,
              right: canScrollRight,
            },
          };
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    Object.keys(groupedProducts).forEach((category) => {
      checkScrollButtonsVisibility(category);
    });
  }, [groupedProducts]);

  useEffect(() => {
    const currentRefs = { ...scrollContainerRefs.current };
    const listeners = [];
  
    Object.keys(groupedProducts).forEach((category) => {
      const container = currentRefs[category];
      if (container) {
        const handler = () => checkScrollButtonsVisibility(category);
        container.addEventListener("scroll", handler);
        listeners.push({ container, handler });
      }
    });
  
    return () => {
      listeners.forEach(({ container, handler }) => {
        container.removeEventListener("scroll", handler);
      });
    };
  }, [groupedProducts]);
  
  

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        <h2 className="text-xl font-medium">Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        <h2 className="text-xl font-medium">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 capitalize">
            {category}
          </h2>

          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar"
              ref={(el) => (scrollContainerRefs.current[category] = el)}
            >
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {showButtons[category]?.left && (
              <button
                onClick={() => scrollLeft(category)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all ease-in-out duration-300 scale-110"
              >
                &#8592;
              </button>
            )}

            {showButtons[category]?.right && (
              <button
                onClick={() => scrollRight(category)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all ease-in-out duration-300 scale-110"
              >
                &#8594;
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
