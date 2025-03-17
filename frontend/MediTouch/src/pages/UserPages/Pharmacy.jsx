import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pharmacy = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch medicines
    axios
      .get("http://127.0.0.1:8000/api/allmedicine")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Error fetching medicines:", error));

    // Fetch categories and sort them by category_name
    axios
      .get("http://127.0.0.1:8000/api/category/")
      .then((res) => {
        // Sort categories by category_name and add "All" as the first option
        const sortedCategories = [
          { id: 0, category_name: "All" },
          ...res.data.sort((a, b) => a.category_name.localeCompare(b.category_name)),
        ];
        setCategories(sortedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddToCart = (id) => {
    navigate(`/product/${id}`);
  };

  // Filter medicines based on search query and selected category
  const filteredData = data.filter(
    (item) =>
      item.medicine_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || item.category_name === selectedCategory)  // Fixed to use category_name from medicine data
  );

  return (
    <div className="font-[sans-serif] bg-gray-100 min-h-screen flex flex-col">
      <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full flex-grow">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">All Medicines</h2>

        {/* Search and Category Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg shadow-sm"
          />

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm bg-white"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {filteredData.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No medicines found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {filteredData.map((item) => (
              <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative" key={item.id}>
                {/* Product Image */}
                <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                  <img src={item.image} alt={item.medicine_name} className="h-full w-full object-contain" />
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-lg font-extrabold text-gray-800">{item.medicine_name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  <h4 className="text-lg text-gray-800 font-bold mt-4">Rs. {item.price}</h4>

                  {/* View Detail Button */}
                  <button
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-300 transition duration-300"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
