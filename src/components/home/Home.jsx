import Categories from "../Categories";
import Hero from "../Hero";
import HeroImageCard from "../HeroImageCard";
import Products from "../Products";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGadgetContext } from "../../context/Context";

const Home = () => {
  const location = useLocation();
  const { loading } = useGadgetContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {location.pathname === "/"
            ? "Gadget"
            : location.pathname.split("/home/")[1]}{" "}
          || Gadget Heaven
        </title>
      </Helmet>

      <div className="relative">
        <Hero
          title="Upgrade Your Tech Accessorize with Gadget Heaven Accessories"
          description="Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!"
        >
          <NavLink
            to="/dashboard"
            className="btn bg-white text-primary rounded-full px-8"
          >
            Shop Now
          </NavLink>
        </Hero>
        <HeroImageCard />
      </div>
      <div className="mt-28 md:mt-72 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Explore Cutting-Edge Gadgets
        </h2>
        <div className="py-8 grid grid-cols-1 md:grid-cols-6 gap-3 lg:px-24 place-items-center">
          <Categories />
          <Products />
        </div>
      </div>
    </div>
  );
};
export default Home;
