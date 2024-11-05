import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Statistics from "./components/statistics/Statistics.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Home from "./components/home/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProductDetails from "./components/productDetails/ProductDetails.jsx";
import Contact from "./components/contact/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":category",
        element: <Home />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: () => fetch("/data.json").then((res) => res.json()),
      },
      {
        path: "feedback",
        element: <Contact />,
      },

      {
        path: "product-details/:id",
        element: <ProductDetails />,
        loader: () => fetch("/data.json").then((res) => res.json()),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
