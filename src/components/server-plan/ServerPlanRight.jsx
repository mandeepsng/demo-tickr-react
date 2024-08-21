import React, { useState, useEffect } from "react";
import { ServiceState } from "../../context/serviceContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import getStripe from "../../services/getStripe";
import axios from "axios";
import Loading from "../Loading";
import { authService } from "../../services/api";

const ServerPlanRight = ({ planId, plan }) => {
  const { userDetails } = ServiceState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e, stripePriceId) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make an API call to initiate subscription checkout
      const response = await authService.stripeCheckout(stripePriceId);

      const stripeCheckoutUrl = response.data.checkout_url;
      console.log(response);
      setLoading(false);
      // Redirect to the Stripe Checkout page
      //  navigate(response.data.checkout_url);
      window.location.href = stripeCheckoutUrl;

      // Redirect to the Stripe Checkout page
      // window.location.href = response.data.checkout_url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      // Handle error (e.g., show an error message)
    } finally {
      // Set loading back to false after the API call completes
      setLoading(false);
    }
  };

  return (
    <div className="service-cat-right mt-5 basis-80">
      <Card
        className="w-full py-5 px-8 rounded-xl bg-dark-bg border-1 border-gray-400 text-white"
        key={planId}
      >
        <form>
          <div className="flex items-end mb-4 p-2 gap-2">
            <h5 className="text-2xl font-bold text-bold inline  text-rvs-bg  dark:text-rvs-bg">
              {plan.name}
            </h5>
          </div>

          {/* <p className="px-2">{plan.name}</p> */}
          <div className="flex flex-col gap-3 items-baseline  dark:text-white mt-5">
              {/* <span className="text-3xl font-semibold">£</span> */}
              <h3 className="text-4xl font-bold tracking-tight">£{plan.price}</h3>
              {/* <span className="ml-1 text-xl font-normal">/month</span> */}
                <button
                type="submit"
                onClick={(e) => handleCheckout(e, plan.StripePriceID)}
                className="inline-flex w-full justify-center rounded-lg px-5 py-3 text-center text-sm font-medium bg-rvs-bg text-white"
                // disabled={userDetails.plan_id === plan.id ? true : false } 
                >
                {/* {userDetails.plan_id === plan.id ? 'Current Plan' : 'Buy Now'  } */}
                Buy Now
                </button>
          </div>
          <ul className="my-7 space-y-5 text-white">
            {plan.plan_feature.length > 0 &&
              plan.plan_feature.map((featPlan,idx) => (
                <li className="flex space-x-3" key={idx}>
                  <img src="/assets/check.svg" />
                  <span className="text-base font-normal leading-tight">
                    {featPlan.feature}
                  </span>
                </li>
              ))}
          </ul>
          {/* <button
            type="submit"
            onClick={(e) => handleCheckout(e, plan.StripePriceID)}
            className="inline-flex w-full justify-center rounded-lg px-5 py-3 text-center text-sm font-medium bg-rvs-bg text-white"
            disabled={userDetails.plan_id === plan.id ? true : false } 
          >
           {userDetails.plan_id === plan.id ? 'Current Plan' : 'Book Now'  }
          </button> */}
        </form>
      </Card>
    </div>
  );
};

export default ServerPlanRight;
