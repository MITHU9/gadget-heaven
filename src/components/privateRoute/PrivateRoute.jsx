import { useGadgetContext } from "../../context/Context";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useGadgetContext();

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }
  if (!user) {
    return (
      <h1 className="text-center text-2xl mt-10">Please Login to Continue</h1>
    );
  }

  return <div>{children}</div>;
};
export default PrivateRoute;
