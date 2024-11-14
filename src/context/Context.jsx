import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCartLocalStorage,
  addToWishListLocalStorage,
  getStoredCartData,
} from "../utility/AddToLocalStorage";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../components/lib/firebase";

export const GadgetContext = createContext({
  product: [],
  addGadgetToCart: () => {},
  addToWishlist: () => {},
  removeGadget: () => {},
  getProductsByCategory: () => {},
  getProductById: () => {},
});

const ContextProvider = ({ children = {} }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [upDate, setUpDate] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Authenticating the user
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const createUserWithEmail = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password, name);
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const getProductsByCategory = (category) => {
    setFilteredProducts(
      products.filter((product) => product.category.name === category)
    );
  };

  const getProductById = (id) => {
    return products.find((product) => product.product_id === id);
  };

  const addGadgetToCart = (id) => {
    addToCartLocalStorage(id);
    setUpDate(!upDate);
  };

  const addToWishlist = (id) => {
    addToWishListLocalStorage(id);
    setUpDate(!upDate);
  };

  const quantity = (arr) => {
    let count = arr?.reduce((acc, item) => {
      if (!acc[item]) {
        acc[item] = 1;
      } else {
        acc[item] += 1;
      }
      return acc;
    }, {});

    return count;
  };

  //get Current User

  useEffect(() => {
    const currentUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      currentUser();
    };
  }, []);

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

  //console.log(user);

  return (
    <GadgetContext.Provider
      value={{
        products,
        setProducts,
        category,
        setCategory,
        getProductsByCategory,
        getProductById,
        filteredProducts,
        addGadgetToCart,
        addToWishlist,
        upDate,
        wishList,
        setWishList,
        cart,
        quantity,
        signInWithGoogle,
        user,
        createUserWithEmail,
        signInWithEmail,
        signOutUser,
        setLoading,
        loading,
        forgotPassword,
        signInWithGithub,
        updateUser,
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
