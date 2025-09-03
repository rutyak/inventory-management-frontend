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
import AddIndividualProduct from "./components/addInvidualProduct/AddIndividualProduct.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store.js";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

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
      {
        path: "add/individual/product",
        element: <AddIndividualProduct />,
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
