import { useGadgetContext } from "../context/Context";
import ProductsCards from "./ProductsCards";

const Products = () => {
  const { products, filteredProducts } = useGadgetContext();
  //console.log(products);

  return (
    <div className="w-full md:col-span-4 lg:col-span-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredProducts?.length > 0
          ? filteredProducts?.map((product) => (
              <ProductsCards key={product.product_id} product={product} />
            ))
          : products?.map((product) => (
              <ProductsCards key={product.product_id} product={product} />
            ))}
      </div>
    </div>
  );
};
export default Products;
