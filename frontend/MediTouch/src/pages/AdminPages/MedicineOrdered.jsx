import React, { useState, useEffect } from "react";

const MedicineOrdered = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Medicine Orders</h1>
      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && orders.length === 0 && <p className="text-gray-600">No orders found.</p>}
      {!loading && !error && orders.length > 0 && (
        <div className="overflow rounded-lg shadow-lg">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Medicine Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.transaction_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <img src={order.image} alt={order.medicine_name} className="w-20 h-20 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3 text-gray-700">{order.medicine_name}</td>
                  <td className="px-4 py-3 text-gray-700">Rs. {order.price}</td>
                  <td className="px-4 py-3 text-gray-700">{order.quantity}</td>
                  <td className="px-4 py-3 text-gray-700">Rs. {(order.price * order.quantity).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-700">{order.address}</td>
                  <td className="px-4 py-3 text-gray-700">{order.phone}</td>
                  <td className={`px-4 py-3 font-semibold ${order.status === "Pending" ? "text-green-600" : "text-green-600"}`}>
                    {order.status === "Pending" ? "✅Completed" : order.status}
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
