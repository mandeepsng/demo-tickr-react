import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/api";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ServiceState } from "../../context/serviceContext";

const ResetPassForm = () => {
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmedpassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({});
  const { setPageTitle } = ServiceState();

  useEffect(() => {
    setPageTitle("Reset Password");
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const variable = useLocation().search;
  let crumbWord = window.location.pathname;
  console.log(variable);
  const pathSegement = variable.split("?");
  console.log(pathSegement);
  const getEmail = pathSegement[2].split("email=")[1];
  const getToken = pathSegement[1].split("token=")[1];

  console.log(getEmail);
  console.log(getToken);
  // console.log(crumbWclgord);
  const handleReset = async (e) => {
    e.preventDefault();
    // console.log(email);

    const validationErrors = validateForm();
    setError(validationErrors);

    console.log(validationErrors.email);
    // return;
    if (Object.keys(validationErrors).length === 0) {
      const forgotPassPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.resetPass({
            password: password,
            password_confirmation: confirmedpassword,
            token: getToken,
            email: getEmail,
          });

          console.log("response", response);
          resolve(`Password changes Successfully`);
          // setModal({ successPopup: true, succMsg : setSuccMsg(reportSuccessMsg), })
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 422) {
            // Handle validation errors
            const err = error.response.data.message;
            let errorObject = {};
            errorObject["email"] = err;
            setError(errorObject);
            reject(errorObject); // Reject with the validation error for toast.error
          } else {
            // Handle other errors
            console.error("An error occurred during contacting:", error);
            reject(error); // Reject with the general error for toast.error
          }
        }
      });
      toast.promise(forgotPassPromise, {
        pending: {
          render() {
            return "Please wait ...";
          },
          icon: true,
        },
        success: {
          render({ data }) {
            return `${data}`;
          },
          // You can customize the success icon or add other options
          icon: "🟢",
        },
        error: {
          render({ data }) {
            // When the promise rejects, data will contain the error
            // console.log(data.email)
            return `${data.email}`;
          },
        },
      });

      // Use the promise after creating it
      forgotPassPromise
        .then((successMessage) => {
          console.log(successMessage);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      // setError(validationErrors)
      console.log("Contact failed. Please fix the errors.");
      // console.log(error, 'error.username')
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (!confirmedpassword.trim()) {
      errors.confirmedpassword = "Confirmed Password is required";
    } else {
      if (confirmedpassword !== password) {
        errors.confirmedpassword = "Confirmed Password is not match";
      }
    }

    return errors;
  };
  return (
    <div className="login-screen auth-bg">
      <div className="container mx-auto">
        <div className="flex min-h-screen items-center  p-4 lg:justify-center">
          <div className="max flex flex-col items-center justify-center overflow-hidden rounded-md gap-10  md:flex-1 md:flex-row gap-15">
            <div className="p-4 py-6 w-full sm:w-2/3 lg:w-1/3 md:flex text-white items-start md:flex-col md:items-left md:justify-center gap-10">
            <div className="go-home">
              <div class="card-single-desc cursor-pointer"><Link to="/" className="flex gap-1 hover:underline"><img src="/assets/home-logo.svg" className="invert" alt=""/><h3 class="m-0 font-bold text-xl md:text-2xl">Home</h3></Link></div>
              </div>
              <div className="my-3 text-center text-4xl font-bold tracking-wider">
                <a href="#">
                  <img
                    src="/assets/rvs-logo.png"
                    alt=""
                    srcset=""
                    className="w-1/3 lg:w-full"
                  />
                </a>
              </div>
              <div className="login-head-desc">
                <h1 className="text-3xl lg:text-4xll font-medium flex mb-5">
                  Ticketing System
                </h1>
                <p className="mt-6  font-normal text-lg md:mt-0">
                  With the power of Ticket system, you can now focus only on
                  functionaries for your digital products, while leaving the UI
                  design on us!
                </p>
              </div>
            </div>
            <div className="bg-white w-full sm:w-2/3 lg:w-1/3 rounded-lg lg:py-10 lg:px-10 p-5 border border-grey-600 text-dark-text shadow-lg">
              <h3 className="my-4 lg:mb-10 mb-4 text-2xl lg:text-3xl font-semibold  text-center">
                Reset Password
              </h3>
              <form onSubmit={handleReset} className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex w-full items-center relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="rounded border w-full border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute left-auto right-2"
                    >
                      {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {error.password && (
                    <span style={{ color: "red" }}>{error.password}</span>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmed_password"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Confirmed Password
                    </label>
                  </div>
                  <div className="flex w-full items-center relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmedpassword"
                      className="rounded border w-full border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      name="confirmedpassword"
                      value={confirmedpassword}
                      onChange={(e) => setConfirmedpassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute left-auto right-2"
                    >
                      {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  {error.confirmedpassword && (
                    <span style={{ color: "red" }}>
                      {error.confirmedpassword}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-rvs-bg px-4 py-2 text-lg font-semibold text-white shadow transition-colors duration-300  focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Reset
                  </button>
                </div>
                <div className="pt-5 flex  font-semibold  items-center justify-center text-center gap-2 pb-2 flex-wrap">
                  <span>Already have an account?</span>
                  <p className="underline text-rvs-bg ">
                    {" "}
                    <Link to="/register">Login Account</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassForm;
