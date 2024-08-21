import React, { useState } from "react";
import UrlBreadcrumb from "../common/UrlBreadcrumb";
import {
  Breadcrumb,
  Button,
  Checkbox,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ServiceState } from "../../context/serviceContext";


const CustomHours = () => {
  let crumbWord = window.location.pathname;
  const [hours, setHours] = useState(0);
  const{setModal}= ServiceState();


  // Function to increment the count
  const incrementHours = () => {
    setHours(hours + 1);
  };

  // Function to decrement the hours
  const decrementHours = () => {
    setHours(hours - 1);
  };

  return (
    <div className="flex flex-col  m-auto p-5  w-auto h-auto ">
      <div className=" container m-auto text-white py-5">
        <UrlBreadcrumb crumbWord={crumbWord} />
      </div>
      <div className="service-cat container m-auto my-5 flex w-screen border border-gray-200 justify-between">
        <div className="report-left w-3/5  p-5">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white my-4">
            Purchase hours based on your needs
          </h1>
          <hr />
          <form className="flex w-full flex-col gap-2 mt-5">
          <div className="flex justify-between gap-20">
                <div className="w-2/4">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Name*" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    helperText={
                      <>This name will be shown on your payment bill.</>
                    }
                  />
                </div>
                <div className="w-2/4">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email*" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    helperText={
                      <>
                        Type the email where you would like to receive follow-up
                        emails from us
                      </>
                    }
                  />
                </div>
            </div>
                <div className="flex justify-between gap-20">
                <div className="w-2/4">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Phone number*" />
                  </div>
                  <TextInput
                    id="name"
                    type="number"
                    placeholder="+44(0000) 000-0000"
                    required
                    addon="UK"
                  />
                </div>
                <div className="w-2/4">
                  {/* <div className="mb-2 block">
                    <Label htmlFor="email" value="Number of Hours*" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    helperText={
                      <>
                        Add the hours you want to add to your project
                      </>
                    }
                  /> */}
                      <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Hours</label>
    <div className="relative flex items-center ">
        <button type="button" id="decrementHours-button"  onClick={decrementHours} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300  w-16 text-center rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-4 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </svg>
        </button>
        <input type="text" id="quantity-input"  value={hours}  onChange={(e)=>setHours(e.target.value) }data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required/>
        <button type="button" id="increment-button" onClick={incrementHours} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300  w-16 text-center rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-4 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Add the hours you want to add to your project.</p>

                </div>
            </div>
                <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Description" />
      </div>
      <Textarea id="comment" placeholder="Enter a description..." required rows={4} />
    </div>

            <div className="flex gap-3 justify-start mt-12">
              <Link to="#">
                <Button className="bg-rvs-bg" size="lg"  onClick={() => setModal({ successPopup: true })}>
                 Raise Request
                </Button>
              </Link>
              <Link to="/service-catalog">
                <Button color="gray" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="report-right w-1/3 bg-stone-50 flex flex-col pt-10 justify-start items-center text-center p-5">
          <img src="/assets/custom-hours-bg.jpg" />
          {/* <h4 className="text-lg font-semibold py-2">
            Looking to solve your issue quickly?
          </h4>{" "}
          <span className="text-sm text-gray-500">
            Add more details to the subject to see relevant articles right here!
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default CustomHours;
