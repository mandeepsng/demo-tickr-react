import { Button } from "flowbite-react";
import { Link, useRouteError } from "react-router-dom";
import { ServiceState } from "./context/serviceContext";
import { useEffect } from "react";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);
const {setPageTitle} = ServiceState();

useEffect(() => {
  setPageTitle("Page Not Found")
}, [])
  return (
    <div
      id="error-page"
      className="container mx-auto flex justify-center items-center px-5"
    >
      <div className="inner-content text-center bg-light-pink p-5 rounded-xl">
        <div className="not-found-content text-dark-bg w-full md:w-1/2 m-auto">
          <h1 className="text-5xl mt-8 font-medium">404</h1>
          <h2 className="text-3xl mt-2">Oops! That page can not be found</h2>
          <p className="w-auto m-auto mt-5">
            We’re sorry, but we can’t seem to find the page which you requested.
            This might be because you have typed the web address incorrectly.
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
  );
}

