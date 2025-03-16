import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/UserComponents/Header";
import Footer from "../../components/UserComponents/Footer";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/medicine/${id}`)
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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setPrescriptionUploaded(true);
      localStorage.setItem("prescription", e.target.files[0].name); // Save the file name in localStorage
      setErrorMsg(""); // Clear error when file is uploaded
    }
  };

  const handleBuyNow = () => {
    if (!prescriptionUploaded) {
      setErrorMsg("Please upload a prescription before proceeding.");
      return;
    }

    navigate("/order", {
      state: {
        product,
        quantity,
        totalPrice: product.price * quantity,
      },
    });
  };

  if (loading) return <p className="text-center mt-5">Loading product...</p>;
  if (error) return <p className="text-center text-red-600 mt-5">{error}</p>;

  return (
    <>
      <Header />
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md p-6 rounded">
            <div className="lg:col-span-3 w-full text-center">
              <div className="px-4 py-10 rounded shadow-md relative">
                <img
                  src={product.image}
                  alt={product.medicine_name}
                  className="w-4/5 aspect-[251/171] rounded object-cover mx-auto"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800">{product.medicine_name}</h3>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              <div className="flex items-center gap-4 mt-6">
                <p className="text-gray-800 text-2xl font-bold">Total Price: Rs. {product.price * quantity}</p>
              </div>

              {/* Prescription Upload */}
              <div className="mt-4">
                <label className="block font-medium text-gray-700">Upload Prescription (PDF Only)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="mt-2 block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}
                {prescriptionUploaded && (
                  <p className="text-green-600 text-sm mt-2">Prescription uploaded successfully.</p>
                )}
              </div>

              <div className="flex gap-4 mt-6 max-w-md">
                <button
                  type="button"
                  className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                  onClick={handleBuyNow}
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
