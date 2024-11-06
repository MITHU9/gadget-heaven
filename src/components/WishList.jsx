import { MdOutlineDelete } from "react-icons/md";
import { useGadgetContext } from "../context/Context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  getWishListData,
  removeFromWishListLocalStorage,
} from "../utility/AddToLocalStorage";
import { useEffect, useState } from "react";

const WishList = ({ data, setValue }) => {
  const { addGadgetToCart, upDate, cart, quantity } = useGadgetContext();
  const [wishList, setWishList] = useState([]);

  const items = quantity(cart);

  const wishItem = data?.filter((item) => wishList.includes(item.product_id));

  const cartItem = data?.filter((item) => cart.includes(item.product_id));

  let totalCost = cartItem?.reduce((acc, item) => {
    const itemQuantity = items[item.product_id];
    return acc + item.price * itemQuantity;
  }, 0);

  const handleAddToCart = (id, price) => {
    if (parseInt(totalCost) < 5000 && price < 5000 - parseInt(totalCost)) {
      addGadgetToCart(id);
      removeFromWishListLocalStorage(id);
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
  };

  const handleRemove = (id) => {
    removeFromWishListLocalStorage(id);

    toast.warn("Item remove from wishList", {
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
    setWishList(getWishListData());
    setValue("wishlist");
  };

  useEffect(() => {
    const getWishData = getWishListData();
    setWishList(getWishData);
  }, [upDate]);

  return (
    <div className="py-6">
      <div className="max-w-6xl mx-auto py-6">
        <h2 className="text-2xl font-bold">WishList</h2>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        {wishItem?.map((item) => (
          <div
            key={item.product_id}
            className="flex items-center justify-between max-w-6xl mx-auto px-8 lg:px-6 py-8 bg-white rounded-lg w-3/4"
          >
            <div className="flex items-center gap-6 ">
              <div className="size-24">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="size-24 rounded-lg object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{item.product_title}</h2>

                <p className="text-gray-400 font-semibold">
                  {item.description}
                </p>
                <h2 className="text-lg py-2 font-bold text-gray-600">
                  Price: ${item.price}
                </h2>
                <button
                  onClick={() => handleAddToCart(item.product_id, item.price)}
                  className="py-2 px-4 rounded-full bg-primary text-white font-semibold hover:bg-white hover:text-primary border border-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.product_id)}
              className="flex items-center gap-6 hover:bg-gray-300 rounded-lg"
            >
              <MdOutlineDelete className="text-3xl text-red-600 cursor-pointer" />
            </button>
          </div>
        ))}
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
export default WishList;
