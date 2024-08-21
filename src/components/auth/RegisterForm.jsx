import React, { useEffect, useState } from "react";
import { authService } from "../../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ServiceState } from "../../context/serviceContext";

function RegisterForm() {
  const navigate = useNavigate();
  const { setPageTitle } = ServiceState();

  useEffect(() => {
    setPageTitle("Register");
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmedpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [regCheck, setRegCheck] = useState(false);

  const [error, setError] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClick = async (e) => {
    // add register logic here
    e.preventDefault();
    console.log(name, email);
    console.log(regCheck);

    //validate form data
    const validationErrors = validateForm();
    console.log(validationErrors);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const registerUserPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.register({
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmedpassword,
          });

          console.log(response);

          // You can customize the success message based on the response if needed
          resolve(`Account created successfully!`);
          navigate("/login");
        } catch (error) {
          if (error.response && error.response.status === 422) {
            // Handle validation errors
            const err = error.response.data.message;
            let errorObject = {};
            errorObject["email"] = err;
            setError(errorObject);
            reject(errorObject); // Reject with the validation error for toast.error
          } else {
            // Handle other errors
            console.error("An error occurred during registration:", error);
            reject(error); // Reject with the general error for toast.error
          }
        }
      });

      toast.promise(registerUserPromise, {
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
      registerUserPromise
        .then((successMessage) => {
          console.log(successMessage);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      // setError(validationErrors)
      console.log("Login failed. Please fix the errors.");
      // console.log(error, 'error.username')
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (!confirmedpassword.trim()) {
      errors.confirmedpassword = "Confirmed Password is required";
    } else {
      if (confirmedpassword !== password) {
        errors.confirmedpassword = "Confirmed Password is match";
      }
    }
    if (!regCheck) {
      errors.regCheck = "Please accept the terms & conditions";    }
    return errors;
  };

  return (
    <div className="register-screen auth-bg">
      <div className="container mx-auto">
        <div className="flex min-h-screen items-center  p-4 lg:justify-center">
          <div className="max flex lg:flex-row flex-col items-center flex-wrap justify-center overflow-hidden rounded-md lg:gap-2 xl:gap-10  md:flex-1 md:flex-row gap-15">
            <div className="md:p-4 md:py-6 p-2 w-full sm:w-2/3 lg:w-1/3 md:flex text-white items-start md:flex-col md:items-left md:justify-center gap-10">
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
                <h1 className="text-3xl lg:text-4xl font-medium flex mb-2 md:mb-5">
                  Ticketing System
                </h1>
                <p className="mt-4  font-normal text-lg md:mt-0">
                  With the power of Ticket system, you can now focus only on
                  functionaries for your digital products, while leaving the UI
                  design on us!
                </p>
              </div>
              {/* <div className="mt-10 flex flex-col items-center justify-center text-center">
            <span>Don't have an account?</span>
              <p className="underline"> <Link to="/register">Get Started!</Link></p>
          </div> */}
              {/* <p className="mt-6 text-center text-sm text-gray-300">Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a></p> */}
            </div>
            <div className="bg-white w-full sm:w-2/3 lg:w-1/3 rounded-lg lg:py-10 lg:px-10 p-5 border border-grey-600 text-dark-text shadow-lg">
              <h3 className="my-4 lg:mb-10 mb-4 text-2xl lg:text-3xl font-semibold  text-center">
                Register Account
              </h3>
              <form onSubmit={handleClick} className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoFocus
                    className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error.name && (
                    <span style={{ color: "red" }}>{error.name}</span>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoFocus
                    className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email && (
                    <span style={{ color: "red" }}>{error.email}</span>
                  )}
                </div>

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
                      Confirm Password
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

                <div className="items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                    name="remember"
                    checked={regCheck}
                 onChange={(e) => setRegCheck(e.target.checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-semibold text-gray-500 hover:underline"
                  >
                    <Link to="https://www.rvsmedia.co.uk/privacy-policy/">
                        Accept terms and conditions *
                    </Link>
                  </label>
                  <span className="">
                  {error.regCheck && (
                    <p className="mt-2" style={{ color: "red" }}>{error.regCheck}</p>
                  )}
                  </span>
                  </div>
                <div className="mt-0">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-rvs-bg px-4 py-2 text-lg font-semibold text-white shadow transition-colors duration-300  focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Sign up
                  </button>
                </div>
                <div className="md:pt-5 flex  font-semibold  items-center justify-center text-center gap-1 md:gap-2 pb-2 flex-wrap">
                  <span>Already have an account?</span>
                  <p className="underline text-rvs-bg ">
                    {" "}
                    <Link to="/login">Login </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
