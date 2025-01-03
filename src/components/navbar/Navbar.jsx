import { NavLink, useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useGadgetContext } from "../../context/Context";
import { useEffect } from "react";
import { getWishListData } from "../../utility/AddToLocalStorage";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const location = useLocation();
  const {
    upDate,
    wishList,
    setWishList,
    cart,
    products,
    quantity,
    user,
    signOutUser,
    loading,
  } = useGadgetContext();

  const items = quantity(cart);

  const cartItem = products?.filter((item) => cart.includes(item.product_id));

  let totalCost = cartItem?.reduce((acc, item) => {
    const itemQuantity = items[item.product_id];
    return acc + item.price * itemQuantity;
  }, 0);

  const handleCart = () => {
    const cart = document.getElementById("cart");
    cart.classList.toggle("hidden");
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User Signed Out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getWishData = getWishListData();
    setWishList(getWishData);
  }, [upDate]);

  //console.log(user);

  return (
    <nav className="w-full md:w-[90vw] mx-auto lg:px-20">
      <div
        className={`navbar mt-1 py-6 ${
          location.pathname == "/" ||
          location.pathname == "/home/Laptops" ||
          location.pathname == "/home/SmartPhone" ||
          location.pathname == "/home/SmartWatch" ||
          location.pathname == "/home/Accessories" ||
          location.pathname == "/home/MacBook"
            ? "bg-primary  text-white/80"
            : ""
        }  rounded-lg rounded-bl-none rounded-br-none md:px-10 fixed top-0 z-10 left-0 lg:px-20`}
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
              {user && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/feedback">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  {user ? (
                    <span className="flex items-center gap-1">
                      {user.photoURL ? (
                        <img
                          className="size-5 rounded-full"
                          src={user.photoURL}
                          alt="user"
                        />
                      ) : (
                        <CgProfile className="size-5 mt-.5" />
                      )}
                      Logout
                    </span>
                  ) : (
                    "Login"
                  )}
                </NavLink>
              </li>
              {user ? (
                ""
              ) : (
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl md:text-2xl font-bold ">
            Gadget Heaven
          </a>
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
            {user && (
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
            )}
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
        <div className="navbar-end flex gap-3 items-center md:gap-6">
          <div className="flex items-center gap-3 relative">
            <a
              onClick={handleCart}
              className="p-2 bg-white text-black relative cursor-pointer rounded-full"
            >
              <FaShoppingCart />
              {user && cart.length > 0 && (
                <span className="absolute -top-5 -right-2 px-2 py-0.5 rounded-full text-red-500 font-bold bg-white">
                  {cart.length}
                </span>
              )}
            </a>
            <a className="p-2 cursor-pointer relative text-black bg-white rounded-full mr-1">
              <CiHeart />
              {user && wishList.length > 0 && (
                <span className="absolute -top-4 -right-2 px-2 py-0.5 rounded-full text-red-500 font-bold bg-white">
                  {wishList.length}
                </span>
              )}
            </a>

            <div
              id="cart"
              className="absolute hidden translate-all bg-white top-12 right-8 px-6 rounded-lg py-1 z-20 w-[250px]"
            >
              <h2 className="text-xl font-bold text-gray-600">
                {cart.length} Items in Cart
              </h2>
              <hr className="mt-3 border" />
              <div className="py-4">
                <p className="text-primary py-1 text-lg font-semibold">
                  Subtotal: ${totalCost.toFixed(2)}
                </p>
                <NavLink
                  to="/dashboard"
                  className="btn bg-primary text-gray-200 rounded-full px-8 hover:bg-gray-300 hover:text-primary"
                >
                  Dashboard
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <NavLink
              to="/login"
              onClick={user ? handleSignOut : null}
              className={({ isActive }) =>
                isActive
                  ? "btn bg-primary text-gray-200 rounded-full px-8 hover:bg-gray-300 hover:text-primary"
                  : "btn bg-transparent rounded-full px-8 hover:bg-gray-300 hover:text-primary"
              }
            >
              {user ? (
                <span className="flex items-center gap-1">
                  {user?.photoURL ? (
                    <img
                      className="size-6 mt-0.5 rounded-full"
                      src={user?.photoURL}
                      alt="userPhoto"
                    />
                  ) : (
                    <CgProfile className="size-5 mt-.5" />
                  )}
                  Logout
                </span>
              ) : (
                "Login"
              )}
            </NavLink>
            {!user && (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "btn bg-primary md:hidden text-gray-200 rounded-full px-8 hover:bg-gray-300 hover:text-primary"
                    : "btn bg-transparent rounded-full px-8 hover:bg-gray-300 hover:text-primary"
                }
              >
                Register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
