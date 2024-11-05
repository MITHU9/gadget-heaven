import { NavLink, useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useGadgetContext } from "../../context/Context";
import { useEffect, useState } from "react";
import {
  getStoredCartData,
  getWishListData,
} from "../../utility/AddToLocalStorage";

const Navbar = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const { upDate, wishList, setWishList } = useGadgetContext();

  useEffect(() => {
    const getCartData = getStoredCartData();
    setCart(getCartData);
  }, [upDate]);

  useEffect(() => {
    const getWishData = getWishListData();
    setWishList(getWishData);
  }, [upDate]);

  //console.log(cart.length);

  return (
    <div
      className={`navbar mt-2 py-6 ${
        location.pathname == "/" ||
        location.pathname == "/Laptops" ||
        location.pathname == "/SmartPhone" ||
        location.pathname == "/SmartWatch" ||
        location.pathname == "/Accessories" ||
        location.pathname == "/MacBook"
          ? "bg-primary  text-white/80"
          : "w-[90vw] mx-auto lg:px-20"
      }  rounded-lg rounded-bl-none rounded-br-none px-10`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-gray-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/statistics">Statistics</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/feedback">Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold ">Gadget Heaven</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" flex items-center gap-5 font-semibold ">
          <li className=" hover:text-black rounded-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 text-primary  p-2 rounded-lg"
                  : "hover:bg-gray-400 hover:text-black p-1.5 rounded-lg"
              }
            >
              Home
            </NavLink>
          </li>
          <li className=" hover:text-black rounded-lg">
            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 text-primary p-2 rounded-lg"
                  : "hover:bg-gray-400 hover:text-black p-1.5 rounded-lg"
              }
            >
              Statistics
            </NavLink>
          </li>
          <li className=" hover:text-black rounded-lg">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 text-primary p-2 rounded-lg"
                  : "hover:bg-gray-400 hover:text-black p-1.5 rounded-lg"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className=" hover:text-black rounded-lg">
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 text-primary p-2 rounded-lg"
                  : "hover:bg-gray-400 hover:text-black p-1.5 rounded-lg"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-6">
        <a className="p-2 bg-white text-black relative cursor-pointer rounded-full">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-4 -right-1 px-2 py-0.5 rounded-full text-red-500 font-bold bg-white">
              {cart.length}
            </span>
          )}
        </a>
        <a className="p-2 cursor-pointer relative text-black bg-white rounded-full">
          <CiHeart />
          {wishList.length > 0 && (
            <span className="absolute -top-4 -right-1 px-2 py-0.5 rounded-full text-red-500 font-bold bg-white">
              {wishList.length}
            </span>
          )}
        </a>
      </div>
    </div>
  );
};
export default Navbar;
