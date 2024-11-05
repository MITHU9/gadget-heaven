import { useLoaderData } from "react-router-dom";
import Hero from "../Hero";
import { useGadgetContext } from "../../context/Context";
import { useEffect, useState } from "react";
import { getStoredCartData } from "../../utility/AddToLocalStorage";
import Cart from "../Cart";
import WishList from "../WishList";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [value, setValue] = useState("cart");

  const data = useLoaderData();
  const { cart } = useGadgetContext();
  //console.log(data);
  const cartItem = data?.filter((item) => cart.includes(item.product_id));

  //console.log(cartItem);

  return (
    <div>
      <Helmet>
        <title>Dashboard || Gadget Heaven</title>
      </Helmet>

      <Hero
        title="Dashboard"
        description="Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!"
      >
        <div className="flex gap-4 items-center justify-center">
          <button
            value="cart"
            onClick={() => setValue("cart")}
            className={`py-2 px-10 font-semibold border border-white rounded-full ${
              value === "cart" ? "bg-white text-primary" : ""
            } `}
          >
            Cart
          </button>
          <button
            value="wishlist"
            onClick={() => setValue("wishlist")}
            className={`py-2 px-10  font-semibold border border-white rounded-full ${
              value === "wishlist" ? "bg-white text-primary" : ""
            } `}
          >
            WishList
          </button>
        </div>
      </Hero>

      {value === "cart" ? (
        <Cart cartItem={cartItem} />
      ) : (
        <WishList data={data} setValue={setValue} />
      )}
    </div>
  );
};
export default Dashboard;
