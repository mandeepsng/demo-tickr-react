import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { authService } from "../services/api";
const Services = createContext();

const ServiceContext = ({ children }) => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState([]);
  const [login, setLogin] = useState(false);
  const [emergencyPrice, setEmergencyPrice] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [pageTitle, setPageTitle] = useState("Homepage");

  const [succMsg, setSuccMsg] = useState([]);
  // const [notification, setNotification] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [notiflength, setNotiflength] = useState(null);
  const [serverPlans, setServerPlans] = useState([]);

  // const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const [modal, setModal] = useState({
    notificationPopup: false,
    userProfilePopup: false,
    placeOrderPopup: false,
    announcementPopup: false,
    successPopup: false,
    reviseQuotation: false,
  });

  // const [notificationPopup, setNotificationPopup] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authService.getAuthenticatedUserData();
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchEmergencyPrice = async () => {
      try {
        const response = await authService.emergencyPrice();
        setEmergencyPrice(response.data[0].emergency_ticket_price);
        console.log(response.data[0].emergency_ticket_price);
      } catch (error) {
        console.error("Error fetching emregency Price data:", error);
      }
    };

    const fetchServiceData = async () => {
      try {
        const response = await authService.ticketPlans();
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching Service data:", error);
      }
    };
    const fetchServerData = async () => {
      try {
        const response = await authService.serverPlans();
        setServerPlans(response.data);
      } catch (error) {
        console.error("Error fetching Server data:", error);
      }
    };

    fetchEmergencyPrice();
    fetchData();
    fetchServiceData();
    fetchServerData();
  }, [API_BASE_URL, token]);

  return (
    <Services.Provider
      value={{
        services,
        login,
        setLogin,
        modal,
        setModal,
        category,
        userDetails,
        succMsg,
        setSuccMsg,
        emergencyPrice,
        searchData,
        setSearchData,
        pageTitle,
        setPageTitle,
        notiflength,
        setNotiflength,
        serverPlans,
      }}
    >
      {children}
    </Services.Provider>
  );
};
export default ServiceContext;

export const ServiceState = () => {
  return useContext(Services);
};
