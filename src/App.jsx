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

// Import new resource pages
import InvestorRelations from "./pages/InvestorRelations.jsx";
import Careers from "./pages/Careers.jsx";
import NewsEvents from "./pages/NewsEvents.jsx";
// Add new footer pages
import Accessibility from "./pages/Accessibility.jsx";
import Cookies from "./pages/Cookies.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import PageTransitionWrapper from "./components/PageTransitionWrapper.jsx";

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <main style={{ flex: 1 }}>
        <PageTransitionWrapper>
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
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* Resource Pages */}
            <Route path="/investor-relations" element={<InvestorRelations />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/news-events" element={<NewsEvents />} />
            
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
        </PageTransitionWrapper>
      </main>
      <FooterSection />
      <ToastContainer />
    </div>
  );
}

export default App;
