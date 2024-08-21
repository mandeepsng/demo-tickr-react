import { useEffect, useRef, useState } from "react";
import reactLogo from "/assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Route,
  Routes,
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./page/Home";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ErrorPage from "./error-page";
import Header from "./components/common/Header";
import ServiceCatalog from "./page/ServiceCatalog";
import SingleService from "./page/SingleService";
import ReportIssue from "./components/support/ReportIssue";
import FooterComp from "./components/common/FooterComp";
import UserNotficationModal from "./components/common/modal/UserNotificationModal";
import UserProfile from "./page/UserProfile";
import UserTickets from "./components/support/UserTickets";
import UserSingleTicket from "./components/support/UserSingleTicket";
import UserProfileModal from "./components/common/modal/UserProfileModal";
import Contact from "./page/Contact";
import { authService } from "./services/api";
import AnnouncementModal from "./components/common/modal/AnnouncementModal";
import CustomHours from "./components/service-catalog/CustomHours";
import SuccessModal from "./components/common/modal/SuccessModal";
import Loading from "./components/Loading";
import ForgotForm from "./components/auth/ForgotForm";
import ResetPassForm from "./components/auth/ResetPassForm";
import EmailVerify from "./components/auth/EmailVerify";
import EmergencyPage from "./page/EmergencyPage";
import CheckoutSuccessPage from "./page/CheckoutSuccessPage";
import PaymentFaildedPage from "./page/PaymentFaildedPage";
import ReviseQuotation from "./components/common/modal/ReviseQuotation";
import { ServiceState } from "./context/serviceContext";
import ServerPlan from "./page/ServerPlan";

async function checkTokenValidity() {
  try {
    const response = await authService.getAuthenticatedUserData();
    return response && response.status === 200;
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}

function PrivateRoute({ element }) {
  console.log("element:", element);
  const isAuthenticated = localStorage.getItem("token");
  const [isValidToken, setIsValidToken] = useState(null); // Change default state to null

  useEffect(() => {
    async function checkToken() {
      try {
        const isValid = await checkTokenValidity();

        if (isValid) {
          setIsValidToken(true);
          console.log("Token is valid");
        } else {
          setIsValidToken(false);
          console.log("Token is not valid");
        }
      } catch (error) {
        setIsValidToken(false);
        console.error("Error during token validation:", error);
      }
    }

    checkToken();
  }, []);

  // Add a loading state check
  if (isValidToken === null) {
    return <Loading />;
  }

  // Redirect to login if token is not valid
  return isValidToken ? element : <Navigate to="/login" />;
}

function App() {
  const location = useLocation();

  const { pageTitle } = ServiceState();

  useEffect(() => {
    // Update the title when the component mounts
    document.title =
      `${pageTitle} - Ticketing System` || "Homepage -Ticketing System";

    // Optionally, you can return a cleanup function to revert the title
    return () => {
      document.title = pageTitle || "Homepage -Ticketing System";
    };
  }, [pageTitle]);

  // Check if the pathname includes "/login"
  const isLoginPage = location.pathname.includes("/login");
  const isRegsiterPage = location.pathname.includes("/register");
  const isForgotPage = location.pathname.includes("/forgot-password");
  const isResetPage = location.pathname.includes("/reset-password");

  return (
    <>
      {!isLoginPage && !isRegsiterPage && !isForgotPage && !isResetPage ? (
        <Header />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotForm />} />
        <Route path="/reset-password" element={<ResetPassForm />} />
        <Route path="/verify" element={<EmailVerify />} />
        {/* Use PrivateRoute for protected routes */}

        <Route
          path="/ad-hoc-hours"
          element={<PrivateRoute element={<ServiceCatalog />} />}
        />
        <Route
          path="/report-issue"
          element={<PrivateRoute element={<ReportIssue />} />}
        />
        <Route
          path="/tickets"
          element={<PrivateRoute element={<UserTickets />} />}
        />
        <Route
          path="/emergency"
          element={<PrivateRoute element={<EmergencyPage />} />}
        />
        <Route
          path="/tickets/:ticket"
          element={<PrivateRoute element={<UserSingleTicket />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<UserProfile />} />}
        />
        <Route
          path="/ad-hoc-hours/custom-hours"
          element={<PrivateRoute element={<CustomHours />} />}
        />
        <Route
          path="/server-plans"
          element={<PrivateRoute element={<ServerPlan />} />}
        />
        <Route path="/contact-us" element={<Contact />} />

        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/paymentfailed" element={<PaymentFaildedPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {!isLoginPage && !isRegsiterPage && !isForgotPage && !isResetPage ? (
        <FooterComp />
      ) : null}
      <UserNotficationModal />
      <UserProfileModal />
      <AnnouncementModal />
      <SuccessModal />
      <ReviseQuotation />
    </>
  );
}

export default App;
