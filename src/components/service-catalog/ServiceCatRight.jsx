import React, { useState, useEffect } from "react";
import { ServiceState } from "../../context/serviceContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import getStripe from "../../services/getStripe";
import axios from "axios";
// import Loading from "../Loading";
import { authService } from "../../services/api";

const ServiceCatRight = ({ servId , serv }) => {
  const { userDetails } = ServiceState();
  const navigate = useNavigate();
  // console.log(serv)

const [loading, setLoading] = useState(false);



  var uptServices;

  // if (catId === 'All') {
  //   uptServices = services;
  // } else {
  //   uptServices = services && services.filter((ser) => ser.category_id == catId);
  // }


  const handleCheckout = async (e, stripePriceId) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Make an API call to initiate subscription checkout
      const response = await authService.stripeCheckout(stripePriceId);

      const stripeCheckoutUrl = response.data.checkout_url;
      console.log(response)
      setLoading(false);
       // Redirect to the Stripe Checkout page
      //  navigate(response.data.checkout_url);
       window.location.href = stripeCheckoutUrl;

      // Redirect to the Stripe Checkout page
      // window.location.href = response.data.checkout_url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      // Handle error (e.g., show an error message)
    }finally {
      // Set loading back to false after the API call completes
      setLoading(false);
    }
  };

  


  return (
    <div className="service-cat-right mt-5 basis-80">
      <Card className='w-full py-5 px-8 rounded-xl bg-dark-bg border-1 border-gray-400 text-white' key={servId}>
        <form>
          <div className="flex items-end mb-4 p-2 gap-2">
            <h5 className="text-2xl font-bold text-bold inline  text-rvs-bg  dark:text-rvs-bg">{serv.HoursIncluded} Hours</h5> <span>Per Month</span>
          </div>
          <p className="px-2">{serv.name}</p>
          <div className="flex flex-col gap-3 items-baseline  dark:text-white mt-5">
              {/* <span className="text-3xl font-semibold">£</span> */}
              <h3 className="text-4xl font-bold tracking-tight">£{serv.price}</h3>
              {/* <span className="ml-1 text-xl font-normal">/month</span> */}
                <button
                type="submit"
                onClick={(e) => handleCheckout(e, serv.StripePriceID)}
                className="inline-flex w-full justify-center rounded-lg px-5 py-3 text-center text-sm font-medium bg-rvs-bg text-white"
                disabled={userDetails.plan_id === serv.id ? true : false } 
                >
                {userDetails.plan_id === serv.id ? 'Current Plan' : 'Buy Now'  }
                </button>
          </div>
          <ul className="my-7 space-y-5 text-white">

            <li className="flex space-x-3">
              <img src="/assets/check.svg"/>
              <span className="text-base font-normal leading-tight">
              {serv.HoursIncluded} Hours 
                </span>
            </li>
            
            {serv.plan_feature.length > 0 && serv.plan_feature.map((val, index) => (
              
              <li className="flex space-x-3" key={index}>
                  <img src="/assets/check.svg"/>
                  <span className="text-base font-normal leading-tight">{val.feature}</span>
              </li>

            ))}

            {/*         
            <li className="flex space-x-3">
              <img src="/assets/check.svg"/>
              <span className="text-base font-normal leading-tight">Integration help</span>
            </li>
            <li className="flex space-x-3">
              <img src="/assets/check.svg"/>
              <span className="text-base font-normal leading-tight">Integration help</span>
            </li> 
            <li className="flex space-x-3">
              <img src="/assets/check.svg"/>
              <span className="text-base font-normal leading-tight">Integration help</span>
            </li> */}
          </ul>
        </form>
      </Card>
    </div>
  );
};

export default ServiceCatRight;
