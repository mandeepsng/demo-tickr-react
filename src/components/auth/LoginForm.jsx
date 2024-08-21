import React, { useEffect, useState } from "react";
import { authService } from "../../services/api";
import { ServiceState } from "../../context/serviceContext";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({});
  const { setLogin, setPageTitle } = ServiceState();

  useEffect(() => {
    setPageTitle("Login");
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const resend = async (e) => {
    e.preventDefault();
    console.log("resend", username)

    const id2 = toast.loading("Please wait...");

    try {
      const response = await authService.resendverifyLink({
        email: username,
      });


      toast.update(id2, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      console.log(response.data);

    } catch (error) {
      console.error(error)

    }

  }


  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log(import.meta.env.VITE_REACT_APP_API_URL)


    // const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
    // toast.promise(
    //     resolveAfter3Sec,
    //     {
    //       pending: 'Promise is pending',
    //       success: 'Promise resolved 👌',
    //       error: 'Promise rejected 🤯'
    //     }
    // )

    // add login logic here
    console.log(`username : ${username}`);
    console.log(`password : ${password}`);
    console.log(!username.trim());

    //validate form data
    const validationErrors = validateForm();
    console.log(validationErrors);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // console.log('login api here')

    const id = toast.loading("Please wait...");

    
      try {
        const response = await authService.login({
          email: username,
          password: password,
        });

        console.log(response.data.data.token);
        if (response.data?.data?.token) {
          // Login successful
          const token = response.data.data.token;

          // Save the token to localStorage or sessionStorage
          localStorage.setItem("token", token);
          setLogin(true);
          console.log("Login successful!");

          navigate("/");
          toast.update(id, {
            render: "Login successful!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          // console.log(response);
          // Handle other response scenarios
          toast.update(id, {
            render: "Login failed. Please check your credentials.",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          console.log("Login failed. Please check your credentials.");
        }
      } catch (error) {


        // if(error.response.data.message === '' )

        if (error.response && error.response.status === 422) {
          toast.update(id, {
            render: "Login failed. Please check your credentials.",
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          });
          // Handle validation errors
          setError(convertErrorFormat(error.response.data.message));
        } else {
          // Handle other errors
          console.error("An error occurred during login:", error);
          console.log("An error response:", error.response.data.message);
          // toast.update(id, {
          //   render () => error.response.data.message,
          //   type: "warning",
          //   isLoading: false,
          //   // autoClose: 3000,
          // });
          // toast.update(id, {
          //   render: () => error.response.data.message <button>Resend</button>,
          //   // type: toast.TYPE.INFO,
          //   autoClose: 5000
          // });

          toast.update(id, {
            render: ({ closeToast }) => (
                <div>
                    {error.response.data.message} {" "}
                    <button className=" rounded-md bg-rvs-bg  py-2 px-4   text-white shadow transition-colors duration-300  focus:outline-none focus:ring-4 focus:ring-blue-200"
                        onClick={resend}>Resend</button>
                </div>
            ),
            type: "warning",
            isLoading: false,
            autoClose: 5000
        });
        
        }
      }
    } else {
      // setError(validationErrors)
      console.log("Login failed. Please fix the errors.");
      // console.log(error, 'error.username')
    }

    console.log(validationErrors);

    return false;
  };

  const validateForm = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // Helper function to convert error message format
  const convertErrorFormat = (errorMessage) => {
    const errorObject = {};
    errorObject["username"] = errorMessage;
    return errorObject;
  };

  return (
    <div className="login-screen auth-bg">
      <div className="container mx-auto">
        <div className="flex min-h-screen items-center  p-4 lg:justify-center">
          <div className="max flex lg:flex-row flex-col items-center flex-wrap justify-center overflow-hidden rounded-md lg:gap-2 xl:gap-10  md:flex-1 md:flex-row gap-15">
            <div className="p-4 py-6 w-full sm:w-2/3 lg:w-1/3 md:flex text-white items-start md:flex-col md:items-left md:justify-center gap-10">
              <div className="go-home">
              <div class="card-single-desc cursor-pointer"><Link to="/" className="flex gap-1 hover:underline"><img src="/assets/home-logo.svg" className="invert" alt=""/><h3 class="m-0 font-bold text-xl md:text-2xl">Home</h3></Link></div>
              </div>
              <div className="my-3 text-center text-3xl lg:text-4xl font-bold tracking-wider">
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
                <h1 className="text-3xl lg:text-4xl font-medium flex mb-5">
                  Ticketing System
                </h1>
                <p className="mt-6  font-normal text-lg md:mt-0">
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
            <div className="bg-white w-full sm:w-2/3 lg:w-1/3 rounded-lg lg:py-10 lg:px-10 p-5  border border-grey-600 text-dark-text shadow-lg">
              <h3 className="my-4 lg:mb-10 mb-4 text-2xl lg:text-3xl font-semibold  text-center">
                Account Login
              </h3>
              <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-dark-text"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoFocus
                    className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {error.username && (
                    <span style={{ color: "red" }}>{error.username}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-dark-text"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex w-full items-center relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="rounded border  w-full border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 pr-8"
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
                <div className="flex items-center space-x-2 justify-between flex-wrap gap-2">
                  <div>
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 me-2 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-semibold text-dark-text"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm m-0 text-rvs-bg hover:underline font-semibold "
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="mt-0">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-rvs-bg px-4 py-2 text-lg font-semibold text-white shadow transition-colors duration-300  focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Log in
                  </button>
                </div>

                <div className="pt-5 flex  font-semibold  items-center justify-center text-center gap-1 md:gap-2 pb-2 flex-wrap">
                  <span>Don't have an account?</span>
                  <p className="underline text-rvs-bg ">
                    {" "}
                    <Link to="/register">Register Account</Link>
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

export default LoginForm;
