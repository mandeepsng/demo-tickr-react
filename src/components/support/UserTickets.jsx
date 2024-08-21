import {
  Badge,
  Button,
  Dropdown,
  Label,
  TextInput,
  Timeline,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiCloudDownload, HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ServiceState } from "../../context/serviceContext";
import Tickets from "./Tickets";
import UrlBreadcrumb from "../common/UrlBreadcrumb";
import { IoIosSearch } from "react-icons/io";
import { authService } from "../../services/api";

const UserTickets = () => {
  const { userDetails, setPageTitle } = ServiceState();
  let crumbWord = window.location.pathname;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropDown, setSearchDropdown] = useState(5);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await authService.getTickets();
        if (response && response.status === 200) {
          setTickets(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching tickets:", response);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    setPageTitle("All Tickets");

    fetchTickets();
  }, []);

  const status = [
    "Waiting for response",
    "Resolved",
    "Working",
    "On Hold",
    "Rejected",
    "All Tickets",
  ];
  console.log(status[searchDropDown]);

  return (
    <div className="container flex flex-col m-auto p-5 w-auto  mt-5 min-h-screen">
      <div className="service-cat-top">
        <UrlBreadcrumb crumbWord={crumbWord} />
      </div>
      <div className="flex flex-col justify-between mt-5">
        <div className="flex gap-4">
          <div className="container m-auto border-2 border-gray-100 ">
            <div className="flex justify-between m-auto p-5 w-auto h-auto flex-col md:flex-row gap-3 md:gap=0">
              <div className="service-cat-top  ">
                <div className="flex flex-col  text-dark-text">
                  <h1 className="text-3xl md:text-4xl font-bold ">
                    All Tickets
                  </h1>
                  <p className="text-base  font-medium	">
                    Total {tickets.length} tickets
                  </p>
                </div>
              </div>
              <div className="all-tickets-right flex md:flex-row md:items-center gap-2 md:gap-8 flex-row items-start">
                <div className="md:max-w-md w-full">
                  <TextInput
                    id="email4"
                    type="text"
                    rightIcon={IoIosSearch}
                    className=""
                    placeholder="Search tickets"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                </div>
                <div className="w-auto margin-auto text-center border p-2 rounded-lg  block disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 text-sm ">
                  <Dropdown
                    label={
                      searchDropDown === 5
                        ? "All Tickets"
                        : status[searchDropDown]
                    }
                    inline
                    className="margin-auto font-semibold"
                  >
                    {status.map((tic, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={(e) => setSearchDropdown(idx)}
                        value={searchDropDown}
                        className="text-center"
                      >
                        {tic}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
                {/* <button type="button" className="w-auto">
                  <span className=" font-semibold text-normal text-blue-600">
                    Export Tickets
                  </span>
                </button> */}
              </div>
            </div>
            <hr />
            <div className="user-all-tickets m-2 md:m-5">
              <Tickets query={searchQuery} searchDropDown={searchDropDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
