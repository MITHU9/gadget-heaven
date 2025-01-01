import { Link, NavLink } from "react-router-dom";
import { useGadgetContext } from "../context/Context";

const ProductsCards = (props = {}) => {
  const { product } = props || {};

  return (
    <div className="p-3">
      <div className=" p-4 rounded-lg bg-white flex flex-col gap-3">
        <div>
          <img
            className="w-full h-[200px] object-contain rounded-xl"
            src={product.product_image}
            alt=""
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{product.product_title}</h2>
          <p className="text-gray-600 font-semibold py-2">
            Price: ${product.price}
          </p>
          <Link
            to={`/product-details/${product.product_id}`}
            className="py-1 px-3 border border-primary rounded-full text-primary font-semibold hover:bg-primary hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductsCards;
