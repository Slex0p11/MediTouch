import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/UserComponents/Header";
import Footer from "../../components/UserComponents/Footer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Medicine</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="p-2 border">
                    <img src={item.image} alt={item.medicine_name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-2 border">{item.medicine_name}</td>
                  <td className="p-2 border">{item.category}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">Rs. {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
