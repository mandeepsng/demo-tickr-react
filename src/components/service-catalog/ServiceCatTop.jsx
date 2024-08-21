import React from "react";
import { LiaOpencart } from "react-icons/lia";
import { useParams } from "react-router-dom";
import UrlBreadcrumb from "../common/UrlBreadcrumb";

const ServiceCatTop = () => {
  let crumbWord=window.location.pathname; 
  return (
    <>
      <div className="flex flex-col  m-auto p-5  w-auto h-auto ">
          <div className="service-cat-top container m-auto text-white py-5">
          {/* <div className="top-left-img">
            <h2 className="text-3xl font-semibold">Ad-Hoc Hours</h2>
            <p className="text-base">Browse the list of services offered and raise a request</p>
          </div> */}
          <UrlBreadcrumb crumbWord={crumbWord}/>
        {/* <div className="flex gap-4 items-center mt-2">
          {/* <div className="top-left-img">
            <img src="/assets/service-cat-cart.svg" />
          </div> */}
        {/* </div> */} 
      </div>
    </div>
    </>
  );
};

export default ServiceCatTop;
