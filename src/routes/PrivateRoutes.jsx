import { Navigate, useLocation } from "react-router-dom";
import { useGadgetContext } from "../context/Context";

const PrivateRoutes = (props = {}) => {
  const { children } = props || {};
  const { user, loading } = useGadgetContext();
  const location = useLocation();

  //console.log(location);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" />;
};
export default PrivateRoutes;
