import { NavLink, useLocation } from "react-router-dom";
import { useGadgetContext } from "../context/Context";
import { useEffect } from "react";

const Categories = () => {
  const { category, getProductsByCategory } = useGadgetContext();
  const location = useLocation();
  const categoryItem = location.pathname.split("/home/")[1];

  useEffect(() => {
    getProductsByCategory(categoryItem || "all");
  }, [categoryItem, category]);

  return (
    <div className="bg-white p-8 text-center rounded-lg  md:col-span-2 lg:col-span-1 w-full md:place-self-start">
      <ul className="flex flex-col gap-3 font-semibold text-gray-600">
        <li>
          <NavLink
            onClick={() => getProductsByCategory("all")}
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-primary text-white font-semibold px-3 py-2 rounded-full"
                : "hover:bg-gray-400 hover:text-black px-3 py-2 rounded-full"
            }
          >
            All Products
          </NavLink>
        </li>
        {category?.map((item, idx) => {
          return (
            <li
              onClick={() => getProductsByCategory(item)}
              key={idx}
              className="mt-2"
            >
              <NavLink
                to={`/home/${item}`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-semibold px-3 py-2 rounded-full"
                    : "hover:bg-gray-400 hover:text-black px-3 py-2 rounded-full"
                }
              >
                {item}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
