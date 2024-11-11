import { Navigate } from "react-router-dom";
import { useGadgetContext } from "../context/Context";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useGadgetContext();

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};
export default PrivateRoutes;
