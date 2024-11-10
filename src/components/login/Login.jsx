import { Link, useNavigate } from "react-router-dom";
import Hero from "../Hero";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useGadgetContext } from "../../context/Context";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(null);

  const { signInWithEmail, setLoading } = useGadgetContext();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;

    if (checkbox) {
      signInWithEmail(email, password)
        .then((res) => {
          if (res.user) {
            navigate("/");
            setLoading(false);
            setError(null);
          } else {
            setError("User not found");
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("Please accept terms and conditions");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login || Gadget Heaven</title>
      </Helmet>
      <Hero
        title="Login Now!"
        description="Login now to get access to our amazing products"
      />
      <div className="mt-10 flex items-center justify-center ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div
            className="flex items-center justify-center mt-6
           gap-3"
          >
            <button className="btn bg-primary text-white hover:text-primary">
              <FaGoogle />
              Google
            </button>
            <button className="btn btn-primary hover:bg-primary">
              <FaGithub />
              Github
            </button>
          </div>
          <div className="divider text-gray-400">Or Email And Password</div>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">
                    Accept terms and conditions
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control mt-2">
              <button className="btn bg-primary text-white hover:text-primary">
                Login
              </button>
            </div>
            {error && (
              <div className="text-red-600">
                <label>{error}</label>
              </div>
            )}
          </form>
          <div className="py-2 ml-8">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="link link-hover">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
