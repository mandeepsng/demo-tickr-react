// api.js
import axios from "axios";

// const API_BASE_URL = 'https://helpdesk.idevelopment.site/api';
// console.log(import.meta.env.VITE_REACT_APP_API_URL)

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
// const debugMode = process.env.REACT_APP_DEBUG === 'true';
const token = localStorage.getItem("token");

console.log("token", token);

const api = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true,  // Include credentials (cookies) in the request
});

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const authService = {
  login: (credentials) => api.post("/login", credentials),
  logout: () => api.post("/logout"),
  register: (userData) => api.post("/register", userData),
  contact: (contactData) => api.post("/contact", contactData),
  ticket: (ticketData) => api.post("/ticket", ticketData),
  comment: (commentData) => api.post("/comment", commentData),
  getAuthenticatedUserData: () => api.get("/user"),
  getTickets: () => api.get("/ticket"),
  getTicketById: (ticketId) => api.get(`/ticket/${ticketId}`),
  stripeCheckout: (stripePriceId) =>
    api.get(`/subscription-checkout/${stripePriceId}`),
  checkout: (stripePriceId) => api.get(`/checkout/${stripePriceId}`),
  forgotPass: (forgotPassData) => api.post(`/forgot-password`, forgotPassData),
  resetPass: (resetPassData) => api.post(`/reset-password`, resetPassData),
  emergency: (emergencyData) => api.post(`/emergency`, emergencyData),
  notification: (notificationData) =>
    api.get(`/notifications`, notificationData),
  readNotification: (readNotificationData) =>
    api.post(`/readnotification`, readNotificationData),
  emergencyPrice: () => api.get(`/emergency`),
  ticketPlans: () => api.get(`/plan_ticket`),
  serverPlans: () => api.get(`/plan_server`),
  verifiedEmail: () => api.get(`/email-verify`),
  resendverifyLink: (emailData) => api.post(`/email/verification-notification`, emailData),

  validateToken: async () => {
    try {
      const response = await api.get("/user");

      console.log("response =", response);
      return response.status === 200;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  },
};

export const helper = {
  formatTimestamp: (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  },

  calculateDaysAgo: (timestamp) => {
    const currentTime = new Date().getTime();
    const timestampDate = new Date(timestamp);

    // Calculate the difference in milliseconds
    const timeDifference = currentTime - timestampDate.getTime();

    // Convert milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysAgo;
  },
};
