import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MedicineOrdered = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders/");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const deletePaymentOption = async (orderId) => {
    if (
      window.confirm("Are you sure you want to delete this payment option?")
    ) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/orders/${orderId}/delete/`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete payment option");
        }
        setOrders(orders.filter((order) => order.id !== orderId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleViewPrescription = (filePath) => {
    console.log("Prescription file path:", filePath);
  
    if (filePath) {
      // Ensure there's no trailing slash at the end of the file path
      const sanitizedPath = filePath.replace(/\/$/, "");
      
      // Construct the full URL without encoding slashes
      const fullPath = `http://localhost:8000${sanitizedPath}`;
      
      // Open the prescription in a new tab
      window.open(fullPath, "_blank");
    } else {
      alert("No prescription file found.");
    }
  };

  return (
    <div className="mx-auto p-4 max-w-screen-xl ml-60">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Medicine Orders
      </h1>
      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-600">No orders found.</p>
      )}
      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left min-w-[150px]">
                  Medicine Name
                </th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Total Price</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Phone Number</th>
                <th className="px-6 py-3 text-left">Payment Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
                >
                  <td className="px-6 py-4">
                    <img
                      src={order.image}
                      alt={order.medicine_name}
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700 min-w-[150px]">
                    {order.medicine_name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">Rs. {order.price}</td>
                  <td className="px-6 py-4 text-gray-700">{order.quantity}</td>
                  <td className="px-6 py-4 text-gray-700">
                    Rs. {(order.price * order.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.address}</td>
                  <td className="px-6 py-4 text-gray-700">{order.phone}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ✅Completed
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewPrescription(order.prescription)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out mr-4"
                    >
                      View Prescription
                    </button>
                    <button
                      onClick={() => deletePaymentOption(order.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicineOrdered;
