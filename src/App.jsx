import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreditScoreCheck from "./pages/CreditScoreCheck.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import LoanApplication from "./pages/LoanApplication.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FooterSection from "./components/FooterSection.jsx";
import UserDocuments from "./components/UserDocuments";
import AboutUs from "./pages/AboutUs.jsx";
import Services from "./pages/Services.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Footer Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Password Recovery Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Credit Score Check */}
        <Route path="/credit-score" element={<CreditScoreCheck />} />
        
        {/* Protected Routes */}
        <Route
          path="/apply-loan"
          element={
            <ProtectedRoute roleRequired="USER">
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roleRequired="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <UserDocuments
                userId={JSON.parse(localStorage.getItem("user") || "{}").id}
              />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <FooterSection />
      <ToastContainer />
    </>
  );
}

export default App;
