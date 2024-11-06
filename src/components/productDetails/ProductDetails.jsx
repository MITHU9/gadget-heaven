import { useLoaderData, useParams } from "react-router-dom";
import Hero from "../Hero";
import ProductDetailsCard from "../ProductDetailsCard";

const ProductDetails = () => {
  const loadData = useLoaderData();
  const { id } = useParams();

  const details = loadData.find((item) => item.product_id === id);

  return (
    <div className="relative mb-[750px] md:mb-0">
      <Hero
        title="Product Details"
        description="Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!"
      />
      <ProductDetailsCard details={details} />
    </div>
  );
};
export default ProductDetails;
