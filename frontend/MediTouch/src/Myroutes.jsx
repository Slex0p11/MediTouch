import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/UserComponents/Layout";
import Homepages from "./pages/UserPages/Homepages";
import AdminLayout from "./components/AdminComponent/AdminLayout";
import Dashboard from "./pages/AdminPages/Dashboard";
import Medicinelist from "./pages/AdminPages/medicinelist";
import AddMedicine from "./pages/AdminPages/AddMedicine";
import Categorylist from "./pages/AdminPages/Categorylist";
import AddCategory from "./pages/AdminPages/AddCategory";
import EditCategory from "./pages/AdminPages/EditCategory";
import EditMedicine from "./pages/AdminPages/EditMedicine";
import Login from "./pages/UserPages/Login";
import Register from "./pages/UserPages/Register";
import Product from "./pages/UserPages/Product";
import Esewa from "./pages/UserPages/Esewa";
import PaymentSuccess from "./pages/UserPages/PaymentSuccess";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import Pharmacy from "./pages/UserPages/Pharmacy";
import MedicineOrdered from "./pages/AdminPages/MedicineOrdered";

const Myroutes = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepages />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order" element={<Esewa />} />

          {/* Admin Authentication Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          {/* Admin Routes */}
          <Route path="/medicineadmin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="medicinelist" element={<Medicinelist />} />
            <Route path="addmedicine" element={<AddMedicine />} />
            <Route path="editmedicine/:id" element={<EditMedicine />} />
            <Route path="categorylist" element={<Categorylist />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="editcategory/:id" element={<EditCategory />} />
            <Route path="medicineorders" element={<MedicineOrdered />} /> 
             
          </Route>

          {/* Payment Success Route */}
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </>
  );
};

export default Myroutes;
