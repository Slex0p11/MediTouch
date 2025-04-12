import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import axios from "axios";
import Header from "../../components/UserComponents/Header";
import Footer from "../../components/UserComponents/Footer";

const AppointmentForm = () => {
  const location = useLocation();
  const { doctor } = location.state || {};
  
  const doctorPrice = doctor?.price || 0;
  const doctorEmail = doctor?.email || "";

  const [currentUser, setCurrentUser] = useState(null);
  const [weeks, setWeeks] = useState(1);
  const [totalPrice, setTotalPrice] = useState(doctorPrice);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(doctorEmail);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(userData);
    if (userData && userData.email) {
      setEmail(userData.email);
    }
  }, []);

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

  const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const newTotal = weeks * doctorPrice;
    setTotalPrice(newTotal);

    setFormData((prev) => ({
      ...prev,
      amount: newTotal.toString(),
      total_amount: newTotal.toString(),
    }));
  }, [weeks, doctorPrice]);

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.total_amount]);

  const increaseWeeks = () => setWeeks((prev) => prev + 1);
  const decreaseWeeks = () => setWeeks((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAppointmentSubmission = async (event) => {
    event.preventDefault();
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        alert("Please login first");
        return;
      }
  
      const appointmentData = {
        email: email,
        weeks: weeks,
        price: totalPrice,
        address: address,
        phone: phone,
        image: "",
        status: "Completed",
        user: user.id
      };
  
      const response = await axios.post(
        "http://localhost:8000/appo/", 
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.status === 201) {
        event.target.submit();
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(`Appointment creation failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
  <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Book Your Appointment</h1>
            <p className="mt-2 text-gray-600">Complete the form below to schedule your consultation</p>
          </div>

          {doctor && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h2>
                  <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-gray-700 mr-4">Price per week: Rs. {doctorPrice}</span>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button 
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                        onClick={decreaseWeeks}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-white text-gray-800">
                        {weeks} week{weeks !== 1 ? 's' : ''}
                      </span>
                      <button 
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                        onClick={increaseWeeks}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-bold text-gray-800">
                      Total Price: Rs. <span className="text-blue-600">{totalPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form 
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" 
            method="POST" 
            onSubmit={handleAppointmentSubmission}
            className="space-y-6"
          >
            {/* Hidden eSewa fields */}
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <textarea
                id="address"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceed to E-Sewa Payment
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

export default AppointmentForm;