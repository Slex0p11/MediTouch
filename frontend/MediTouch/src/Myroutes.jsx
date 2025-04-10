import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Components
import Layout from "./components/UserComponents/Layout";
import About from "./components/UserComponents/About";
import Terms from "./components/UserComponents/Terms";
import PrivacyPolicy from "./components/UserComponents/PrivacyPolicy";

// User Pages
import Homepages from "./pages/UserPages/Homepages";
import Login from "./pages/UserPages/Login";
import Register from "./pages/UserPages/Register";
import Product from "./pages/UserPages/Product";
import Esewa from "./pages/UserPages/Esewa";
import PaymentSuccess from "./pages/UserPages/PaymentSuccess";
import Pharmacy from "./pages/UserPages/Pharmacy";
import ProfileScreen from "./pages/UserPages/ProfileScreen";
import Appointment from "./pages/UserPages/Appointment";
import BookAppointment from "./pages/UserPages/BookAppointment";

// Doctor Pages
import RegisterDoc from "./pages/DoctorPages/RegisterDoc";
import ApprovedDoctorsList from "./pages/DoctorPages/ApprovedDoctorsList";
import DoctorLogin from "./pages/DoctorPages/DoctorLogin";

// Admin Components & Pages
import AdminLogin from "./pages/AdminPages/AdminLogin";
import AdminLayout from "./components/AdminComponent/AdminLayout";
import Dashboard from "./pages/AdminPages/Dashboard";
import Medicinelist from "./pages/AdminPages/medicinelist";
import AddMedicine from "./pages/AdminPages/AddMedicine";
import EditMedicine from "./pages/AdminPages/EditMedicine";
import Categorylist from "./pages/AdminPages/Categorylist";
import AddCategory from "./pages/AdminPages/AddCategory";
import EditCategory from "./pages/AdminPages/EditCategory";
import MedicineOrdered from "./pages/AdminPages/MedicineOrdered";
import AdminDoctorsPanel from "./pages/AdminPages/AdminDoctorsPanel";
import DoctorDashboard from "./pages/DoctorPages/DoctorDashboard";

const Myroutes = () => {
  return (
    <Router>
      <Routes>
        {/* ----------------- Public Routes ----------------- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepages />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
        </Route>

        {/* ----------------- User Authentication & Actions ----------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/order" element={<Esewa />} />
         
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        {/* ----------------- Doctor Routes ----------------- */}
        <Route path="/registerdoctor" element={<RegisterDoc />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        

        {/* ----------------- Admin Authentication ----------------- */}
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* ----------------- Admin Dashboard Routes ----------------- */}
        <Route path="/medicineadmin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="medicinelist" element={<Medicinelist />} />
          <Route path="addmedicine" element={<AddMedicine />} />
          <Route path="editmedicine/:id" element={<EditMedicine />} />
          <Route path="categorylist" element={<Categorylist />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="editcategory/:id" element={<EditCategory />} />
          <Route path="medicineorders" element={<MedicineOrdered />} />
          <Route path="viewdoctor" element={<AdminDoctorsPanel />} />
          <Route path="approveddoctors" element={<ApprovedDoctorsList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Myroutes;
