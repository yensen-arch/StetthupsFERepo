import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import UserStudyPage from "./pages/UserStudyPage.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import BuySubs from "./pages/BuySubs.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";
import PaymentFailure from "./pages/PaymentFailure.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
// Function to check if the user is logged in
const isLoggedIn = () => {
  const accessToken = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");
  return accessToken && user; // Returns true if both exist
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Protect the dashboard route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        {/* Protect the user-study page */}
        <Route
          path="/user-study/:caseId"
          element={
            <ProtectedRoute>
              <UserStudyPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/buysubs"
          element={
            <ProtectedRoute>
              <BuySubs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        /><Route
        path="/payment-failure"
        element={
          <ProtectedRoute>
            <PaymentFailure />
          </ProtectedRoute>
        }
      />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />

      </Routes>
    </div>
  );
}

export default App;
