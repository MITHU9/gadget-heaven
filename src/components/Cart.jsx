import { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import successImg from "../assets/Group.png";
import { removeFromCartLocalStorage } from "../utility/AddToLocalStorage";
import { useNavigate } from "react-router-dom";
import { useGadgetContext } from "../context/Context";

const Cart = ({ cartItem }) => {
  const { quantity, cart } = useGadgetContext();
  const [render, setRender] = useState(false);
  const route = useNavigate();

  const items = quantity(cart);

  let totalCost = cartItem?.reduce((acc, item) => acc + item.price, 0);

  const handleSort = () => {
    cartItem?.sort((a, b) => b.price - a.price);
    setRender(!render);
  };

  const handlePurchase = () => {
    const dialog = document.getElementById("my_modal_5");
    dialog.showModal();
    totalCost = 0;
    localStorage.removeItem("cartData");
  };

  const handleDelete = (id) => {
    removeFromCartLocalStorage(id);
    window.location.reload();
  };

  //console.log(items);

  return (
    <div>
      <div className="flex items-center justify-between max-w-6xl mx-auto px-8 lg:px-0 py-8">
        <h2 className="text-2xl font-bold">Cart</h2>
        <div
          className="flex items-center gap-6
        "
        >
          <h2 className="text-xl font-bold">
            Total Cost: ${totalCost.toFixed(2)}
          </h2>
          <button
            onClick={handleSort}
            className="flex items-center gap-2 rounded-full border p-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-400 font-semibold text-primary"
          >
            <div className="w-full h-full bg-white flex gap-2 items-center px-4 py-1.5 rounded-full">
              <span>Sort by Price</span>
              <FaSortAmountDown />
            </div>
          </button>
          <button
            disabled={cartItem?.length === 0 || totalCost === 0}
            onClick={handlePurchase}
            className={`
              ${
                cartItem?.length === 0 || totalCost === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
              py-2 px-6 text-white font-semibold rounded-full bg-gradient-to-b from-primary to-[#FF0000]/40 hover:from-primary hover:to-[#FF0000]`}
          >
            Purchase
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        {cartItem?.map((item) => (
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
                <p className="text-gray-600 font-semibold">
                  Quantity:{" "}
                  {Object.entries(items).map(([proc, count]) => (
                    <span>{proc === item.product_id ? count : ""}</span>
                  ))}
                </p>
                <h2 className="text-lg font-bold text-gray-600">
                  Price: ${item.price}
                </h2>
              </div>
            </div>
            <button
              onClick={() => handleDelete(item.product_id)}
              className="flex items-center gap-6 hover:bg-gray-300 rounded-lg"
            >
              <MdOutlineDelete className="text-3xl text-red-600 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center">
          <img src={successImg} alt="successful" className="size-20" />
          <h3 className="font-bold text-3xl py-3">Payment Successfully</h3>
          <hr />
          <p className="py-2 text-gray-600 font-semibold">
            Thanks for purchasing the items.
          </p>
          <p className=" text-gray-600 font-bold">
            Total: ${totalCost.toFixed(2)}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  const dialog = document.getElementById("my_modal_5");
                  dialog.close();
                  route("/");
                  window.location.reload();
                }}
                className="btn w-[300px] rounded-full text-gray-700 font-bold text-xl"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Cart;
