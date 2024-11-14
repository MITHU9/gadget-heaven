import { Link, useNavigate } from "react-router-dom";
import Hero from "../Hero";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useGadgetContext } from "../../context/Context";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const Register = () => {
  const {
    signInWithGoogle,
    createUserWithEmail,
    setLoading,
    loading,
    signInWithGithub,
    updateUser,
  } = useGadgetContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          //console.log(res.user);
          navigate("/login");
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithGithub()
      .then((res) => {
        if (res.user) {
          //console.log(res.user);
          navigate("/");
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters or long");
      return;
    }

    createUserWithEmail(email, password, name)
      .then((res) => {
        if (res.user) {
          updateUser({ displayName: name, photoURL: photo })
            .then(() => {
              console.log("User Updated");
            })
            .catch((err) => {
              console.log(err);
            });
          navigate("/");
        } else {
          setError("Registration Failed");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

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
        <title>Register || Gadget Heaven</title>
      </Helmet>
      <Hero
        title="Register now!"
        description="Register now to get access to our amazing products"
      />
      <div className="mt-10 flex items-center justify-center ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div
            className="flex items-center justify-center mt-6
           gap-3"
          >
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-primary text-white hover:text-primary"
            >
              <FaGoogle />
              Google
            </button>
            <button
              onClick={handleGithubSignIn}
              className="btn btn-primary hover:bg-primary"
            >
              <FaGithub />
              Github
            </button>
          </div>
          <div className="divider text-gray-400">Or Email And Password</div>
          <form onSubmit={handleFormSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="PhotoURL"
                className="input input-bordered"
              />
            </div>
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
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {showPassword ? (
                <IoMdEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[53px]"
                />
              ) : (
                <IoMdEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[53px]"
                />
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white hover:text-primary">
                Register
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
              Already have an account?{" "}
              <Link to="/login" className="link link-hover">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
