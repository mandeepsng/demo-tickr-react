import React, { useEffect } from "react";
import ServiceCatTop from "../components/service-catalog/ServiceCatTop";
import ServerPlanRight from "../components/server-plan/ServerPlanRight";
import { useParams } from "react-router-dom";
import { ServiceState } from "../context/serviceContext";

const ServerPlan = () => {
  let urlParams = useParams();
  const { searchData, setPageTitle, services, serverPlans,userDetails } = ServiceState();

  // console.log("ServerPlan", userDetails);

  useEffect(() => {
    setPageTitle("Server Plans");
  }, []);

  return (
    <div className="service-cat   my-5 mt-0">
      <ServiceCatTop />
      <div className="container m-auto text-center">
        <div className="py-5 p-1 text-gray-600">
          <h1 className="text-3xl md:text-4xl font-bold ">
            The Server Plan for Your Needs
          </h1>
          <p className="text-base mt-2">
            Always know what you'll pay with monthly caps and flat pricing.{" "}
            {/* <span className="text-lg hover:underline cursor-pointer font-semibold">
              {searchData ? searchData : "customizable Service Name"}
            </span> */}
          </p>
        </div>
      </div>
      <div className="service-cat-main container m-auto flex justify-center w-full gap-8 flex-wrap px-5">
        {serverPlans.length > 0 &&
          serverPlans.map((plan, idx) => (
            <ServerPlanRight planId={idx + 1} plan={plan} key={idx} />
          ))}
      </div>
      <div className="container m-auto text-center">
        <div className="py-5 p-1 text-gray-600">
          <p className="text-2xl md:text-2xl font-bold ">
            Contact us for more bespoke requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerPlan;
