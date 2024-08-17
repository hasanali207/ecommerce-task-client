import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaDollarSign, FaStar } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-server-mauve.vercel.app/allProducts", {
          params: {
            page: currentPage,
            limit,
            searchTerm,
            priceRange: priceRangeFilter,
            sort: sortOption,
          },
        });

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, brandFilter, priceRangeFilter, sortOption]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl p-6 lg:p-6 font-medium text-center mb-6 ">
        All Products
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/5 p-4">
          {/* Filter and Sorting */}
          <div className="mt-2 rounded-lg">
            <div className="flex py-2 border justify-center mb-4">
              <h2 className="text-xl sm:text-2xl text-[#22c55e] font-bold">
                Custom Filter
              </h2>
            </div>
            <div className="mb-4">
              <label className="block text-[#22c55e] font-semibold mb-2">
                Sort
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-2"
              >
                <option value="">No Sorting</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#22c55e] font-semibold mb-2">
                Sort By Price
              </label>
              <select
                value={priceRangeFilter}
                onChange={(e) => setPriceRangeFilter(e.target.value)}
                className="w-full p-2"
              >
                <option value="">All Prices</option>
                <option value="low">Below $100</option>
                <option value="medium">$500 - $1000</option>
                <option value="high">Above $1000</option>
              </select>
            </div>
           
          </div>
        </div>

        {/* Products Display */}
        <div className="container mx-auto lg:w-4/5 p-4 sm:p-6">
          <div className="container mx-auto mb-4 sm:mb-6 flex justify-end">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 sm:p-3 border-b-2 border-colorBlue  focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    className="w-full h-40 sm:h-56 object-fit"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                  <h2 className="absolute bottom-0 left-0 p-4 text-xl sm:text-2xl font-semibold text-white">
                    {product.name}
                  </h2>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between text-gray-800 mb-3">
                    <div className="flex items-center">
                      <FaDollarSign className="text-gray-600 mr-2" />
                      <p className="font-semibold text-lg">${product.price}</p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-gray-600 mr-2" />
                      <p className="text-gray-800">{product.ratings}</p>
                    </div>

                  </div>
                  <div className="flex items-center justify-between">
                    
                    <button className="px-4 py-2 bg-colorBlue text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 sm:mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 sm:px-4 py-1 sm:py-2 mx-1 text-white bg-colorBlue rounded-lg hover:bg-blue-500 disabled:bg-gray-400"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-2 sm:px-4 py-1 sm:py-2 mx-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-colorBlue text-white"
                    : "bg-gray-300 text-gray-800"
                } hover:bg-blue-500 hover:text-white`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-4 py-1 sm:py-2 mx-1 text-white bg-colorBlue rounded-lg hover:bg-blue-500 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
