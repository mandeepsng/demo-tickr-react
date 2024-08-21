import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/api";
import { ServiceState } from "../../context/serviceContext";

const ForgotForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [emailExist, setEmailExist] = useState("");
  const{setPageTitle}= ServiceState();
  
  useEffect(() => {
    setPageTitle("Forgot Password")
  }, [])
  const handleForgot = async (e) => {
    e.preventDefault();
    // console.log(email);

    const validationErrors = validateForm();
    setError(validationErrors);

console.log(validationErrors.email);

    if (Object.keys(validationErrors).length === 0) {
    const id = toast.loading("Please wait...")

      const forgotPassPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.forgotPass({
            email: email,
          });
          const existEmail= Object.keys(response.data);
          console.log("Email->" ,existEmail);
          console.log('response', response);
            if(existEmail != "status"){

              console.log(existEmail);
              setEmailExist(response.data.email);
              // resolve(response.data.email);

              toast.update(id, { render: response.data.email, type: "warning", isLoading: false, autoClose: 3000 });

              // console.log("if");
              setError("");
              setTimeout(() => {
                setEmailExist("");
              }, 2000);
            }
            else{
              console.log(response.data);
              setEmailExist(response.data.status);
              // resolve(response.data.status);
              toast.update(id, { render: response.data.status, type: "success", isLoading: false, autoClose: 3000 });
              
              // console.log("else")
              setError("");
              setTimeout(() => {
                setEmailExist("");
              }, 2000);

            }

    
          // setModal({ successPopup: true, succMsg : setSuccMsg(reportSuccessMsg), })
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 422) {
            // Handle validation errors
            const err = error.response.data.email;
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
      // toast.promise(forgotPassPromise, {
      //   pending: {
      //     render() {
      //       return "Please wait ...";
      //     },
      //     icon: true,
      //   },
      //   success: {
      //     render({ data }) {
      //       return `${data}`;
      //     },
      //     // You can customize the success icon or add other options
      //     icon: "🟢",
      //   },
      //   error: {
      //     render({ data }) {
      //       // When the promise rejects, data will contain the error
      //       // console.log(data.email)
      //       return `${data.email}`;
      //     },
          
      //   },
      // });

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

    if (!email.trim()) {
      errors.email = "Email is required";
    }
    return errors;
  };
  return (
    <div className="login-screen auth-bg">
    <div className="container mx-auto">

  <div className="flex min-h-screen items-center  p-4 lg:justify-center">
    <div className="max flex lg:flex-row flex-col items-center justify-center overflow-hidden rounded-md lg:gap-2 xl:gap-10 md:flex-1 md:flex-row gap-15">
      <div className="p-4 py-6 w-full sm:w-2/3 lg:w-1/3 md:flex text-white  items-start md:flex-col md:items-left md:justify-center gap-10">
      <div className="go-home">
              <div class="card-single-desc cursor-pointer"><Link to="/" className="flex gap-1 hover:underline"><img src="/assets/home-logo.svg" className="invert" alt=""/><h3 class="m-0 font-bold text-xl md:text-2xl">Home</h3></Link></div>
              </div>
        <div className="my-3 text-center text-4xl font-bold tracking-wider">
          <a href="#"><img src="/assets/rvs-logo.png" alt="" srcset="" className='w-1/3 lg:w-full'/></a>
        </div>
        <div className="login-head-desc">
        <h1 className='text-3xl lg:text-4xl font-medium flex mb-5'>Ticketing System</h1>
        <p className="mt-6  font-normal text-lg md:mt-0">With the power of Ticket system, you can now focus only on functionaries for your digital products, while leaving the UI design on us!</p>
        </div>
        </div>
        <div className="bg-white w-full sm:w-2/3 lg:w-1/3 rounded-lg plg:py-10 lg:px-10 p-5 border border-grey-600 text-dark-text shadow-lg">
          <h3 className="my-4 mb-10 text-2xl lg:text-3xl font-semibold  text-center">
            Forgot Password
          </h3>
          <form onSubmit={handleForgot} className="flex flex-col space-y-5">
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
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <span style={{ color: "red" }}>{error.email}</span>
              )}
               {emailExist && (
                <span style={{ color: "red" }}>{emailExist}</span>
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
            <div className="pt-5 flex  font-semibold  items-center justify-center text-center gap-2 pb-2">
            <span>Already have an account?</span>
              <p className="underline text-rvs-bg "> <Link to="/login">Login </Link></p>
          </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ForgotForm;
