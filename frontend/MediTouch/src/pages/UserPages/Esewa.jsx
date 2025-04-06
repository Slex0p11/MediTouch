import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./Esewa.css";

const Esewa = () => {
  const location = useLocation();
  const { product, quantity: initialQuantity, totalPrice: initialTotalPrice } = location.state || {};

  const [currentUser, setCurrentUser] = useState(null);
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice || 0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    // Load user data when component mounts
    const userData = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(userData);
  }, []);

  const pricePerUnit = product?.price || 0;

  const [formData, setFormData] = useState({
    amount: totalPrice.toString(),
    tax_amount: "0",
    total_amount: totalPrice.toString(),
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // Function to generate signature
  const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const newTotal = quantity * pricePerUnit;
    setTotalPrice(newTotal);

    setFormData((prev) => ({
      ...prev,
      amount: newTotal.toString(),
      total_amount: newTotal.toString(),
    }));
  }, [quantity, pricePerUnit]);

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.total_amount]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle file change
  const handleFileChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleOrderSubmission = async (event) => {
    event.preventDefault();
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        alert("Please login first");
        return;
      }
  
      const formData = new FormData();
      formData.append("medicine_name", product.medicine_name);
      formData.append("quantity", quantity);
      formData.append("price", totalPrice);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("image", product.image);
      formData.append("status", "Pending");
      formData.append("prescription", prescription);
      formData.append("username", user.username); // Add username from localStorage
  
      const response = await axios.post(
        "http://localhost:8000/api/orders/", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      if (response.status === 201) {
        event.target.submit(); // Proceed to payment
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(`Order failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {product && (
        <div className="border p-4 rounded shadow-md mb-4">
          {product.image && <img src={product.image} alt={product.medicine_name} className="w-32 h-32 object-cover mb-4" />}
          <h2 className="text-xl font-semibold">{product.medicine_name}</h2>
          <p>Price per unit: Rs. {pricePerUnit}</p>
          <div className="flex items-center mt-2">
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={decreaseQuantity}>-</button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={increaseQuantity}>+</button>
          </div>
          <p className="mt-2 font-bold">Total Price: Rs. {totalPrice}</p>
        </div>
      )}

      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" onSubmit={handleOrderSubmission} encType="multipart/form-data">
        <input type="hidden" name="amount" value={formData.amount} required />
        <input type="hidden" name="tax_amount" value={formData.tax_amount} required />
        <input type="hidden" name="total_amount" value={formData.total_amount} required />
        <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} required />
        <input type="hidden" name="product_code" value={formData.product_code} required />
        <input type="hidden" name="product_service_charge" value={formData.product_service_charge} required />
        <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} required />
        <input type="hidden" name="success_url" value={formData.success_url} required />
        <input type="hidden" name="failure_url" value={formData.failure_url} required />
        <input type="hidden" name="signed_field_names" value={formData.signed_field_names} required />
        <input type="hidden" name="signature" value={formData.signature} required />

        <div className="mb-4">
          <label className="block">Address</label>
          <input type="text" className="border rounded p-2 w-full" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block">Phone Number</label>
          <input type="text" className="border rounded p-2 w-full" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block">Upload Prescription</label>
          <input type="file" className="border rounded p-2 w-full" onChange={handleFileChange} accept=".jpg,.png,.pdf" required />
        </div>

        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">
          Pay via E-Sewa
        </button>
      </form>
    </div>
  );
};

export default Esewa;
