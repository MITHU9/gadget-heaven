import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useGadgetContext } from "../context/Context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";

const ProductDetailsCard = (props = {}) => {
  const { details } = props || {};

  const {
    addGadgetToCart,
    addToWishlist,
    wishList,
    cart,
    products,
    quantity,
    user,
  } = useGadgetContext();

  const items = quantity(cart);

  const cartItem = products?.filter((item) => cart.includes(item.product_id));

  let totalCost = cartItem?.reduce((acc, item) => {
    const itemQuantity = items[item.product_id];
    return acc + item.price * itemQuantity;
  }, 0);

  const handleAddToCart = (id, price) => {
    if (user) {
      if (parseInt(totalCost) < 5000 && price < 5000 - parseInt(totalCost)) {
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
        toast.error("You can`t add to cart more than $5000", {
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
    } else {
      toast.error("Please Login to add items to cart", {
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
    if (user) {
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
    } else {
      toast.error("Please Login to add items to Wishlist", {
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
    <div className="absolute top-48  md:top-1/2 lg:left-20 lg:w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-evenly md:gap-8 md:w-3/4 mx-auto bg-white p-4 rounded-xl">
        <div>
          <img
            className="w-full md:h-[400px] object-contain rounded-xl"
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
            <ReactStars
              value={details.rating}
              count={5}
              isHalf={true}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
            <span className="pt-1 font-semibold">{details.rating}</span>
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
                    : "bg-white text-black hover:bg-gray-200"
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
