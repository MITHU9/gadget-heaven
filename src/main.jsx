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
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

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
        path: "/home/:category",
        element: <Home />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
        loader: () => fetch("/data.json").then((res) => res.json()),
      },
      {
        path: "/feedback",
        element: <Contact />,
      },

      {
        path: "/product-details/:id",
        element: <ProductDetails />,
        loader: () => fetch("/data.json").then((res) => res.json()),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
