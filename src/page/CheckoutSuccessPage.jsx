import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { runFireworks } from '../lib/utils';
import { Link } from "react-router-dom";
import { ServiceState } from '../context/serviceContext';
function CheckoutSuccessPage() {

  const location = useLocation();
  const [sessionID, setSessionID] = useState(null);
  const{ setPageTitle}= ServiceState();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get('session_id');
        setSessionID(sessionId);
        runFireworks();
    }, [location.search])

    useEffect(() => {
      setPageTitle("Thanks")
    }, [])

  return (
    <div className="container text-center m-auto flex items-center justify-center">
    <div className=" bg-[#dcdcdc] rounded-2xl w-11/12 md:w-4/5 px-5">
      <div className=" text-center py-10 ">
        <p className="text-center">
          <svg stroke="currentColor" fill="green" stroke-width="0" viewBox="0 0 16 16" height="3em" width="3eem" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path></svg>
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-bg-trans mt-5 ">Thank you for your order !!</h2>
        <p className="mb-5 text-normal mt-2">Check your email inbox for the invoice receipt!</p>
        <p className="font-semibold">If you have any questions, please email <a className=" text-rvs-bg" href="mailto:order@rvsmedia.com">order@rvsmedia.com</a></p>
        
        <Link to="/">
          <button type="button" width="300px" className="btn bg-rvs-bg px-10 py-3 my-5 mt-8 rounded-lg text-white">Home</button>
        </Link>
      </div>
    </div>
      </div>
  )
}

export default CheckoutSuccessPage