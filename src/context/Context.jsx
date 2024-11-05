import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCartLocalStorage,
  addToWishListLocalStorage,
  getStoredCartData,
} from "../utility/AddToLocalStorage";

export const GadgetContext = createContext({
  gadgets: [],
  addGadgetToCart: () => {},
  addToWishlist: () => {},
  removeGadget: () => {},
  getProductsByCategory: () => {},
});

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [upDate, setUpDate] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [cart, setCart] = useState([]);

  const getProductsByCategory = (category) => {
    setFilteredProducts(
      products.filter((product) => product.category.name === category)
    );
  };

  const addGadgetToCart = (id) => {
    addToCartLocalStorage(id);
    setUpDate(!upDate);
  };

  const addToWishlist = (id) => {
    addToWishListLocalStorage(id);
    setUpDate(!upDate);
  };

  //console.log(cart);

  //console.log(products);
  //console.log(details);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setCategory(
          data.reduce((acc, item) => {
            if (!acc.includes(item.category.name)) {
              acc.push(item.category.name);
            }
            return acc;
          }, [])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const getCartData = getStoredCartData();
    setCart(getCartData);
  }, [upDate]);

  //console.log(category);

  return (
    <GadgetContext.Provider
      value={{
        products,
        setProducts,
        category,
        setCategory,
        getProductsByCategory,
        filteredProducts,
        addGadgetToCart,
        addToWishlist,
        upDate,
        wishList,
        setWishList,
        cart,
      }}
    >
      {children}
    </GadgetContext.Provider>
  );
};

export const useGadgetContext = () => {
  return useContext(GadgetContext);
};

export default ContextProvider;
