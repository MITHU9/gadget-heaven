import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useGadgetContext } from "../context/Context";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ProductDetailsCard = ({ details }) => {
  const { addGadgetToCart, addToWishlist, wishList, cart, products } =
    useGadgetContext();

  const cartItem = products?.filter((item) => cart.includes(item.product_id));

  let totalCost = cartItem?.reduce((acc, item) => acc + item.price, 0);

  //console.log(parseInt(totalCost));

  const handleAddToCart = (id, price) => {
    if (parseInt(totalCost) < 4000 && price < 4000 - parseInt(totalCost)) {
      addGadgetToCart(id);
      toast.success("Item Added to cart Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("You can`t add to cart more than $4000", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleWishlist = (id) => {
    addToWishlist(id);

    if (wishList.includes(id)) {
      toast.warn("Remove item from Wishlist", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.success("Item Added to Wishlist Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="absolute top-1/2 lg:left-20 lg:w-11/12 mx-auto">
      <div className="flex items-center justify-evenly gap-8 w-3/4 mx-auto bg-white p-4 rounded-xl">
        <div>
          <img
            className="w-full h-[400px] object-contain rounded-xl"
            src={details.product_image}
            alt={details.product_title}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{details.product_title}</h2>
          <p className="text-lg py-2 font-semibold text-gray-600">
            Price: <span>${details.price}</span>
          </p>
          <button className="py-1 px-4 border rounded-full border-green-600 text-green-600 font-semibold">
            {details.availability ? "In Stock" : "Out of Stock"}
          </button>
          <p className="text-md py-1 font-semibold text-gray-600">
            {details.description}
          </p>
          <h3 className="text-xl font-bold py-2">Specification</h3>
          <ul className="font-semibold text-gray-600">
            {details.Specification.map((spec, idx) => (
              <li key={idx}>
                {idx + 1}.{spec}
              </li>
            ))}
          </ul>
          <h2 className="flex items-center gap-1 font-bold text-lg">
            Rating
            <FaStar className="text-yellow-500" />
          </h2>
          <div className="flex items-center gap-1">
            {[...Array(parseInt(details.rating))].map((_, idx) => (
              <FaStar key={idx} className="text-yellow-500" />
            ))}
            <FaStar />
            <span>{details.rating}</span>
          </div>
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => handleAddToCart(details.product_id, details.price)}
              className="flex items-center gap-1 py-1.5 px-4 rounded-full bg-primary text-white font-semibold"
            >
              Add to Cart
              <FaShoppingCart />
            </button>
            <button
              onClick={() => handleWishlist(details.product_id)}
              disabled={wishList.includes(details.product_id)}
              className={`
                ${
                  wishList.includes(details.product_id)
                    ? "disabled:opacity-50 bg-gray-600 cursor-not-allowed text-white"
                    : "bg-white text-black"
                }
                 border p-2 rounded-full text-lg`}
            >
              <CiHeart />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};
export default ProductDetailsCard;
