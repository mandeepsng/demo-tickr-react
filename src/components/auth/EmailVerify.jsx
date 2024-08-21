import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/api";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ServiceState } from "../../context/serviceContext";
import axios from "axios";

const EmailVerify = () => {
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmedpassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [error, setError] = useState({});
  const { setPageTitle } = ServiceState();

  console.log('dsfsdf fdsfs');

  useEffect(() => {
    setPageTitle("Reset Password");
    fetchData(getUrl, getToken)
    .then(data => {
        console.log('Response:', data);
        setMessage(data.status)
    })
    .catch(error => {
        console.error('Error:', error);
    });
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
  const getToken = pathSegement[2].split("token=")[1];
  const getUrl = pathSegement[1].split("email_verify_url=")[1];

  const decodedToken = decodeURIComponent(getToken);

  console.log('getToken', getToken);
  console.log('email_verify_url', getUrl);


  async function fetchData(getUrl, getToken) {
    try {
      const response = await axios.get(getUrl, {
        headers: {
          'Authorization': `Bearer ${decodedToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  
//   console.log(getToken);
  // console.log(crumbWclgord);
  

  
  return (
    <div className="container text-center m-auto flex items-center justify-center">
    <div className=" bg-[#dcdcdc] rounded-2xl w-11/12 md:w-4/5 px-5">
      <div className=" text-center py-10 ">
        <p className="text-center">
          <svg stroke="currentColor" fill="green" stroke-width="0" viewBox="0 0 16 16" height="3em" width="3eem" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path></svg>
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-bg-trans mt-5 ">Email verified!</h2>
        
        <Link to="/">
          <button type="button" width="300px" className="btn bg-rvs-bg px-10 py-3 my-5 mt-8 rounded-lg text-white">Home</button>
        </Link>
      </div>
    </div>
      </div>
  );
};

export default EmailVerify;
