import { useLocation, useParams } from "react-router-dom";

const Hero = ({ children, title, description }) => {
  const location = useLocation();
  const { id } = useParams();

  //console.log(location.pathname);

  return (
    <div
      className={`"hero bg-primary flex items-center justify-center ${
        location.pathname == "/" ||
        location.pathname == "/Laptops" ||
        location.pathname == "/SmartPhone" ||
        location.pathname == "/SmartWatch" ||
        location.pathname == "/Accessories" ||
        location.pathname == "/MacBook" ||
        location.pathname == `/product-details/${id}`
          ? "rounded-lg rounded-tl-none rounded-tr-none pb-72 "
          : "-ml-8 -mr-4"
      } "`}
    >
      <div className="hero-content text-center ">
        <div className="max-w-[60vw]">
          <h1 className="text-5xl font-bold text-white/90">{title}</h1>
          <p className="py-6 font-semibold text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
          {children ? children : ""}
        </div>
      </div>
    </div>
  );
};
export default Hero;
