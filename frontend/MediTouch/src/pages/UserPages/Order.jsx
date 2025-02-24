import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/UserComponents/Header";
import Footer from "../../components/UserComponents/Footer";

const Order = () => {
  const location = useLocation();
  const { product, quantity, totalPrice } = location.state || {};

  return (
    <>
      <Header />
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="shadow-md p-6 rounded">
            <h2 className="text-2xl font-bold mb-4">Order Form</h2>

            {/* Product Image Display */}
            <div className="mb-6">
              <img
                src={product?.image}
                alt={product?.medicine_name}
                className="w-40 h-40 object-cover mx-auto mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">Product: {product?.medicine_name}</h3>
              <p className="text-sm text-gray-500">{product?.description}</p>
              <p className="text-gray-800 text-lg mt-2">Quantity: {quantity}</p>
              <p className="text-gray-800 text-lg mt-2">Total Price: Rs. {totalPrice}</p>
            </div>

            <form className="space-y-4">
              {/* Shipping Address */}
              <div>
                <label className="block text-sm font-semibold">Shipping Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-semibold">Contact Number</label>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-black">Payment Method</label>
                <select className="w-full p-2 border rounded text-black" required>
                  <option value="card">E-Sewa</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>

              {/* Other form elements (e.g., contact information) */}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;