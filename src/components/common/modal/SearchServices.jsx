import React, { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { ServiceState } from "../../../context/serviceContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const SearchServices = () => {
  const modalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { services, setSearchData } = ServiceState();

  const buttonRef = useRef(null);

  const navigate = useNavigate();
  // Filter data based on searchQuery
  const filteredData = services.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(filteredData)

  const handleSearchData = (e) => {
    // modalRef.current.classList.remove('hidden');
    e.preventDefault();
    searchDATA(searchQuery);
    if(searchQuery != null){
    navigate("/ad-hoc-hours");
    }
  };

  const validSearchTypes = ['Maintenance Support', 'E-Commerce Website development', 'Bespoke Software Solutions', 'Hosting'];

  const handleSearchButton = (buttonType) => {
      if (validSearchTypes.includes(buttonType)) {
          console.log(buttonType);
          setSearchData(buttonType);
          navigate("/ad-hoc-hours");
      } else {
          console.log(buttonType + ' not found in valid search types array');
          setSearchData('Custom development');
          navigate("/ad-hoc-hours");
      }
  };

  const searchDATA = (buttonType) => {
      const inputLength = buttonType.trim().length;
      
      if (inputLength >= 3) {
          const partialMatch = validSearchTypes.find(type => type.toLowerCase().startsWith(buttonType.toLowerCase()));
          
          if (partialMatch) {
              console.log(buttonType + ' partially matches ' + partialMatch);
              setSearchData(partialMatch);
              navigate("/ad-hoc-hours");
              return;
          }
      }
      
      console.log(buttonType + ' not found in valid search types array');
      setSearchData('Custom development');
      navigate("/ad-hoc-hours");
  };





  return (
    <div>
      <div className="banner-search w-100">
        <form onSubmit={(e) => handleSearchData(e)}>
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-3 flex-none"
              >
                <path
                  d="m19 19-3.5-3.5"
                  stroke="#1f2937 "
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="#1f2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
              </svg>
            </span>
            <input
              className="placeholder:normal placeholder:text-gray-500 block text-gray-800 bg-white w-full lg:w-[778px] text-sm md:text-base rounded-full py-3 md:py-4 pl-11 pr-3 base:text-base  border border-gray-300 focus:border-white focus:ring-0 focus:ring-white-500 "
              placeholder="Search for solutions, services and tickets"
              id="show-search-modal"
              type="search"
              name="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </label>
        </form>
      </div>
      <div className="rel-searches flex  flex-wrap  gap-2 items-start md:items-center md:justify-center  md:gap-4 text-white pt-8 font-normal">
        <h6 className="w-full text-left md:text-center md:w-auto">
          Relevant Searches:
        </h6>
        {/* <Button
          className="bg-bg-trans font-normal	"
          pill
          onClick={() => handleSearchButton('Maintenance Support')}
        >
          <IoSearchOutline className="me-1" />
          Maintenance Support
        </Button> */}
        <Button
          className="bg-bg-trans font-normal	"
          pill
          onClick={() => handleSearchButton('E-Commerce Website development')}
        >
          <IoSearchOutline className="me-1" />
          E-Commerce Website development
        </Button>
        <Button
          className="bg-bg-trans font-normal	"
          pill
          onClick={() => handleSearchButton('Bespoke Software Solutions')}
        >
          <IoSearchOutline className="me-1" />
          Bespoke Software Solutions
        </Button>
        {/* <Button
          className="bg-bg-trans font-normal	"
          pill
          onClick={() => handleSearchButton('Hosting')}
        >
          <IoSearchOutline className="me-1" />
          Hosting
        </Button> */}
      </div>

      {/* seacrch popup */}
      {/* <div ref={modalRef} className="search-modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 hidden z-50 w-1/2">
  <div className="bg-white rounded shadow-lg w-screen h-screen">
      <div className="border-b px-4 py-2 flex justify-between items-center container m-auto">
      <h3 className="font-semibold text-lg">Search Here</h3>
      <button className="text-black close--search-modal" onClick={closeSearchModal}><ImCancelCircle /></button>
    </div> */}
      {/* <form className='container m-auto pt-5'>    */}
      {/* <div className='container m-auto pt-5 w-1/2'>   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">Search</label>
  <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
      </div>
      <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for solutions, services and tickets" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/> */}
      {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
      {/* </div>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <div>
                <div scope="col" className="px-6 py-3 font-bold">
                   Search
                </div>
            </div>
        </div>
    {
   filteredData.length==0 ?
   <div className='not-found flex flex-col justify-center items-center gap-3 my-5'>
<img src="assets/not-found.svg" alt="" srcSet="" />
<p>
            Sorry! We searched everywhere but didn't find a match for 
            "<span id="no-result-text">{searchQuery}</span>"
          </p>
            <Link to="/support/report-issue/" className="text-blue-500 no-underline hover:underline text-base font-semibold">
              Raise a Ticket
            </Link>
   </div>
: 
      searchQuery!="" && 
        filteredData.map((item) => (
        <Link to={`service-catalog/${item.id}`} key={item.id}>
            <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <div scope="row" className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                {item.name}
                </div>
            </div>
        </Link>
           )) 
            }
     </div>
   </div>
  </div>
  </div>
  </div> */}
    </div>
  );
};

export default SearchServices;
