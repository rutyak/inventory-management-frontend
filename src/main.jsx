import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/home/Home.jsx";
import Product from "./pages/product/Product.jsx";
import Invoice from "./pages/invoice/Invoice.jsx";
import Statistics from "./pages/statistics/Statistics.jsx";
import Settings from "./pages/setting/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
