import { useLocation, useParams } from "react-router-dom";

const Hero = (props = {}) => {
  const { children, title, description } = props || {};
  const location = useLocation();
  const { id } = useParams();

  //console.log(location.pathname);

  return (
    <div
      className={`"hero bg-primary flex items-center justify-center ${
        location.pathname == "/" ||
        location.pathname == "/home/Laptops" ||
        location.pathname == "/home/SmartPhone" ||
        location.pathname == "/home/SmartWatch" ||
        location.pathname == "/home/Accessories" ||
        location.pathname == "/home/MacBook"
          ? "rounded-lg rounded-tl-none rounded-tr-none md:pb-72 pb-24"
          : `-ml-4 -mr-2 md:-ml-8 md:-mr-4 ${
              location.pathname == `/product-details/${id}`
                ? "md:pb-72 pb-24"
                : ""
            }`
      } "`}
    >
      <div className="hero-content text-center ">
        <div className="md:max-w-[60vw]">
          <h1 className="text-2xl md:text-5xl font-bold text-white/90">
            {title}
          </h1>
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
