import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/UserComponents/Header";
import Footer from "../../components/UserComponents/Footer";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/medicine/${id}`) // Fetch product details
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading product...</p>;
  if (error) return <p className="text-center text-red-600 mt-5">{error}</p>;

  return (
    <>
      <Header />  
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded shadow-md relative">
                <img
                  src={product.image}
                  alt={product.medicine_name}
                  className="w-4/5 aspect-[251/171] rounded object-cover mx-auto"
                />
                <button type="button" className="absolute top-4 right-4">
                  <svg
                    xmlns=""
                    width="20px"
                    fill="#ccc"
                    className="mr-1 hover:fill-[#333]"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800">
                {product.medicine_name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              <div className="flex flex-wrap gap-4 mt-6">
                <p className="text-gray-800 text-2xl font-bold">
                  Price: Rs. {product.price}
                </p>
              </div>
              <div className="flex gap-4 mt-12 max-w-md">
                <button
                  type="button"
                  className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Product information
            </h3>
            <ul className="mt-4 space-y-6 text-gray-800">
              {product.description}
            </ul>
          </div>
        </div>
      </div>
      <Footer />  
    </>
  );
};
export default Product;
