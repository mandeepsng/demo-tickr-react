import React from 'react'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


function PaymentFaildedPage() {
  return (
    <div
      id="error-page"
      className="container mx-auto flex justify-center items-center px-5"
    >
      <div className="inner-content text-center bg-light-pink p-5 rounded-xl">
        <div className="not-found-content text-dark-bg w-full md:w-1/2 m-auto">
          <h1 className="text-5xl mt-8 font-medium"></h1>
          <h2 className="text-3xl mt-2">Payment Failed</h2>
          <p className="w-auto m-auto mt-5">
            Your payment has failed. Please select a new plan to proceed.
          </p>
          <div className="view-all-testimonial flex justify-center mt-4 pb-5">
          <Link to="/">
                <Button
                  className="bg-rvs-bg px-5"
                  size="lg"
                >
                  Home
                </Button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFaildedPage