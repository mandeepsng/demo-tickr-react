import React, { useEffect } from "react";
import ServiceCatTop from "../components/service-catalog/ServiceCatTop";
import ServiceCatLeft from "../components/service-catalog/ServiceCatLeft";
import { useParams } from "react-router-dom";
import { ServiceState } from "../context/serviceContext";

const ServiceCatalog = () => {
  let urlParams = useParams();
  const { searchData , setPageTitle } = ServiceState();

  console.log(searchData);

  useEffect(() => {
    setPageTitle("Ad hoc Hours")
  }, [])

  return (
    <div className="service-cat   my-5 mt-0">
      <ServiceCatTop />
      <div className="container m-auto text-center">
        <div className="py-5 p-2 text-gray-600">
          <h1 className="text-3xl md:text-4xl font-bold ">
            The Perfect Plan for Your Needs
          </h1>
          <p className="text-base mt-2">
            These are the best suited plans for a{" "}
            <span className="text-lg hover:underline cursor-pointer font-semibold">
              {searchData ? searchData : "customizable Service Name"}
            </span>
          </p>
        </div>
      </div>
      <div className="service-cat-main container m-auto flex justify-center w-full gap-8 flex-wrap px-5">
        <ServiceCatLeft />
      </div>
      <div className="container m-auto text-center">
        <div className="py-5 p-1 text-gray-600">
          <p className="text-2xl md:text-2xl font-bold">
            Contact us for more bespoke requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;
