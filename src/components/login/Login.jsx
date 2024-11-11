import { Link, useNavigate } from "react-router-dom";
import Hero from "../Hero";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useGadgetContext } from "../../context/Context";
import { useRef, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const {
    signInWithGoogle,
    signInWithEmail,
    setLoading,
    loading,
    forgotPassword,
    signInWithGithub,
  } = useGadgetContext();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          //console.log(res.user);
          navigate("/");
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;

    if (checkbox) {
      signInWithEmail(email, password)
        .then((res) => {
          if (res.user) {
            if (res.user.emailVerified) {
              navigate("/");
              setLoading(false);
              setError(null);
            } else {
              setError("Please verify your email address");
              setLoading(false);
            }
          } else {
            setError("User not found");
            setLoading(false);
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

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

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
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
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

              <label className="label">
                <a
                  onClick={() =>
                    forgotPassword(emailRef.current.value)
                      .then(() => {
                        alert("Check your email to reset password");
                      })
                      .catch((err) => {
                        setError(err.message);
                      })
                  }
                  href="#"
                  className="label-text-alt link link-hover"
                >
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
