const getStoredCartData = () => {
  const storedCartData = localStorage.getItem("cartData");
  if (storedCartData) {
    return JSON.parse(storedCartData);
  }
  return [];
};

const addToCartLocalStorage = (id) => {
  const getData = getStoredCartData();
  if (getData.includes(id)) {
    getData.push(id);
  } else {
    getData.push(id);
  }
  localStorage.setItem("cartData", JSON.stringify(getData));
};

const removeFromCartLocalStorage = (id) => {
  const getData = getStoredCartData();
  const updatedData = getData.filter((item) => item !== id);
  localStorage.setItem("cartData", JSON.stringify(updatedData));
};

const getWishListData = () => {
  const storedWishListData = localStorage.getItem("wishListData");
  if (storedWishListData) {
    return JSON.parse(storedWishListData);
  }
  return [];
};

const addToWishListLocalStorage = (id) => {
  let getData = getWishListData();
  if (getData.includes(id)) {
    getData = getData.filter((item) => item !== id);
  } else {
    getData.push(id);
  }
  localStorage.setItem("wishListData", JSON.stringify(getData));
};

const removeFromWishListLocalStorage = (id) => {
  const getData = getWishListData();
  const updatedData = getData.filter((item) => item !== id);
  localStorage.setItem("wishListData", JSON.stringify(updatedData));
};

export {
  addToCartLocalStorage,
  addToWishListLocalStorage,
  getStoredCartData,
  getWishListData,
  removeFromCartLocalStorage,
  removeFromWishListLocalStorage,
};
