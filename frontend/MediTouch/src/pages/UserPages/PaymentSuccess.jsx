import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const [search] = useSearchParams();
  const dataQuery = search.get("data");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const resData = atob(dataQuery);
    const resObject = JSON.parse(resData);
    console.log(resObject);
    setData(resObject);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000); // 3 seconds delay before redirecting
  }, [search, navigate]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f9f0', // Soft green background
    fontFamily: '"Poppins", sans-serif',
    textAlign: 'center'
  };

  const checkIconStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#28a745', // Green background
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  };

  const priceStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#28a745', // Green color
    marginTop: '20px'
  };

  const statusStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    marginTop: '10px'
  };

  const thankYouMessageStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#666',
    marginTop: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={checkIconStyle}>
        <img src="src/check.png" alt="Payment Success" style={{ width: '100%', height: '100%' }} />
      </div>
      <p style={priceStyle}>Rs. {data.total_amount}</p>
      <p style={statusStyle}>Payment Successful</p>
      <p style={thankYouMessageStyle}>Thank you for your purchase! You will be redirected shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
