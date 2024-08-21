import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Header from "./components/common/Header.jsx";
import ServiceContext from "./context/serviceContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { DarkThemeToggle } from "flowbite-react";
import * as Sentry from "@sentry/react";


// Sentry.init({
//   dsn: "https://d1f87035925ebc7924e4205d29b63192@o4506479061303296.ingest.sentry.io/4506479064580096",
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//     }),
//     new Sentry.Replay({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:  <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
//   // {
//   //   path: "header",
//   //   element: <Header />,
//   // },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceContext>
        <App />
        <ToastContainer />
      </ServiceContext>
    </BrowserRouter>
  </React.StrictMode>
);
