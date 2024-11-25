import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ContextProvider from "./context/Context";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const location = useLocation();

  return (
    <ContextProvider>
      <HelmetProvider>
        <div className="bg-gray-100 pt-6">
          <div
            className={`${
              location.pathname == "/" ||
              location.pathname == "/home/Laptops" ||
              location.pathname == "/home/SmartPhone" ||
              location.pathname == "/home/SmartWatch" ||
              location.pathname == "/home/Accessories" ||
              location.pathname == "/home/MacBook"
                ? "w-full md:max-w-[90vw] mx-auto"
                : "w-[100vw]"
            } px-2 md:px-5`}
          >
            <Navbar />
            <main className="mt-[76px]">
              <Outlet />
            </main>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    </ContextProvider>
  );
}

export default App;
