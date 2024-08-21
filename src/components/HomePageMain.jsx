import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ServiceState } from "../context/serviceContext";

const HomePageMain = () => {
  const{setPageTitle}= ServiceState();

  useEffect(() => {
    setPageTitle("HomePage")
  }, [])
  return (
    <div className="homepage-cards py-10">
      <div className="container m-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-dark-text text-center mb-2">Support Services</h2>
        <div className="flex  justify-center gap-5 sm:gap-5 xl:gap-6 pt-5 text-dark-text flex-wrap">

        {/* <div className="homepage-card-single border  flex-none w-4/5 sm:w-72 lg:w-96 xl:w-96 shadow hover:shadow-gray-700/40">
            <Link to="/server-plans">
              <div className="gap-4 py-8 px-2 flex items-center">
                <div className="card-single-img w-20 md:w-32">
                  <img
                    src="/assets/server-plans.svg"
                    className="md:w-28"
                    srcSet=""
                    />
                </div>
                <div className="card-single-desc">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Server Plans</h3>
                  <p className="text-base md:text-lg">Get Best Server Plan</p>
                </div>
              </div>
            </Link>
          </div> */}

          <div className="homepage-card-single border  flex-none w-4/5 sm:w-72 lg:w-96 xl:w-96 shadow hover:shadow-gray-700/40">
            <Link to="/ad-hoc-hours">
              <div className="gap-4 py-8 px-2 flex items-center">
                <div className="card-single-img w-20 md:w-32">
                  <img
                    src="/assets/retainer-plans.svg"
                    className="md:w-28"
                    srcSet=""
                    />
                </div>
                <div className="card-single-desc">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Retainer Plans</h3>
                  <p className="text-base md:text-lg">Customized Solutions for Your Business</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="homepage-card-single border  flex-none w-4/5 sm:w-72 lg:w-96 xl:w-96 shadow hover:shadow-gray-700/40">
            <Link to="#">
              <div className="gap-4 py-8 px-2 flex items-center">
                <div className="card-single-img w-20 md:w-32">
                  <img
                    src="/assets/on-demand-service-2.svg"
                    className="md:w-28"
                    srcSet=""
                    />
                </div>
                <div className="card-single-desc">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">On Demand Service</h3>
                  <p className="text-base md:text-lg">Get Best Server Plan</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="homepage-card-single border  flex-none w-4/5 sm:w-72 lg:w-96 xl:w-96 shadow hover:shadow-gray-700/40">
            <Link to="/emergency">
              <div className="gap-4 py-8 px-2 flex items-center">
                <div className="card-single-img w-20 md:w-32">
                  <img
                    src="/assets/emergency-support-2.svg"
                    className="md:w-28"
                    srcSet=""
                    />
                </div>
                <div className="card-single-desc">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Emergency Support</h3>
                  <p className="text-base md:text-lg">Fast Response to Your Needs</p>
                </div>
              </div>
            </Link>
          </div>

          
        
          <div className="homepage-card-single border w-4/5 sm:w-72 lg:w-96 xl:w-96 flex-none  shadow hover:shadow-gray-700/40 flex-wrap">
            <Link to="/report-issue">
              <div className="gap-4 py-8 px-2 flex items-center ">
                <div className="card-single-img w-20 md:w-32">
                  <img
                    src="/assets/create-ticket-2.svg"
                    className="md:w-28"
                    srcSet=""
                    />
                </div>
                <div className="card-single-desc">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Create a Ticket</h3>
                  <p className="text-base md:text-lg">Having trouble? Contact the support team</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="homepage-card-single border  flex-none w-4/5 sm:w-72 lg:w-96 xl:w-96 shadow hover:shadow-gray-700/40">
            <Link to="/contact-us">
              <div className="gap-4 py-8 px-2 flex items-center">
                <div className="card-single-img w-20 md:w-32">
                  <img
                    src="/assets/contact-2.svg"
                    className="md:w-28"
                    srcSet=""
                    />
                </div>
                <div className="card-single-desc">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Contact Us</h3>
                  <p className="text-base md:text-lg">Contact Us for Expert Support</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePageMain;
