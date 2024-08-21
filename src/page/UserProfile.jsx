import { Breadcrumb, Table, Tabs } from "flowbite-react";
import React, { useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { Card, Dropdown } from "flowbite-react";
import { GoPencil } from "react-icons/go";
import { ServiceState } from "../context/serviceContext";
import UrlBreadcrumb from "../components/common/UrlBreadcrumb";

// import NextNProgress from 'nextjs-progressbar';

const UserProfile = () => {
  let crumbWord = window.location.pathname;
  const { userDetails, setPageTitle } = ServiceState();

  console.log(userDetails);
  const orders = userDetails.orders;
  const revOrders = orders.slice().reverse();

  useEffect(() => {
    setPageTitle("Profile");
  }, []);

  console.log("revOrders", revOrders);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    });
    return formattedDate;
  };

  // console.log(userDetails.orders.reverse())

  return (
    <>
      {/* <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} /> */}
      <div className="flex flex-col p-5  w-auto h-auto ">
        <div className=" container mx-auto text-white py-5">
          <UrlBreadcrumb crumbWord={crumbWord} />
        </div>
        <div className="service-cat container m-auto my-5 flex flex-col-reverse lg:flex-row w-full border border-gray-200 justify-between">
          <div className="report-left w-full lg:w-3/4 border border-gray-200 p-5 ">
            <Card className="w-full text-dark-text">
              <div className="flex md:items-center pb-0 md:p-10 md:flex-row md:justify-between md:text-lg flex-col justify-start items-start gap-4 p-5">
                {/* <button className="rounded-full bg-indigo-400 w-32 h-32 text-6xl text-indigo-300 ">{userDetails && userDetails.name.substring(0,1)}</button> */}
                <div className="plan-exp w-auto">
                  <h4 className="">
                    {userDetails.activePlanDate ? (
                      <>
                        Your trial will expire on{" "}
                        <span className="font-semibold text-base">
                          {formatTimestamp(userDetails.activePlanDate)}
                        </span>
                      </>
                    ) : (
                      <>
                      Please purchase a <a
                      href="/ad-hoc-hours"
                      className="hover:underline font-semibold"
                    >
                      Perfect Plan 
                    </a></>
                    )}
                  </h4>
                </div>
                <div className="flex space-x-3 lg:mt-6 flex-col sm:flex-row md:flex-col justify-center items-center ">
                  <span className="pb-2">
                    Remaining hours / Purchased Hours
                  </span>
                  <h5 className="mb-1 font-medium  dark:text-white">
                    {" "}
                    <a className="inline-flex gap-2 items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium  hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                      {userDetails.remaining_hr}/{userDetails.total_hr}
                    </a>
                  </h5>
                </div>
              </div>
              <footer className="bg-white rounded-lg shadow  p-4 pt-0">
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                {userDetails.activePlanDate &&
                <span className="block text-dark-bg sm:text-center ">
                  Drop email to Admin to cancel the Subscription{" "}
                  <a
                    href="mailto:hello@rvsmedia.co.uk"
                    className="hover:underline font-semibold"
                  >
                    hello@rvsmedia.co.uk
                  </a>
                </span>
}
              </footer>
            </Card>
            <Tabs aria-label="Tabs with icons" style="underline">
              {/* <Tabs.Item title="Profile Data">
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item> */}
              <Tabs.Item active title="Purchase History">
                {revOrders.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <Table hoverable className="purchase-tb bg-transparent ">
                      <Table.Head className="sticky top-0">
                        <Table.HeadCell>S.No.</Table.HeadCell>
                        <Table.HeadCell>Plan name</Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Interval</Table.HeadCell>
                        <Table.HeadCell>Created</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y ">
                        {revOrders &&
                          revOrders.map((order, idx) => (
                            <Table.Row
                              className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              key={idx}
                            >
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {idx + 1}
                              </Table.Cell>
                              <Table.Cell>{order.plan.name}</Table.Cell>
                              <Table.Cell>£{order.amount}</Table.Cell>
                              <Table.Cell>{order.order_type}</Table.Cell>
                              <Table.Cell>
                                {formatTimestamp(order.created_at)}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>
                    </Table>
                  </div>
                ) : (
                  <span className="block text-dark-bg sm:text-center ">
                    Purchase the Subscription{" "}
                    <a
                      href="/ad-hoc-hours"
                      className="hover:underline font-semibold"
                    >
                      Perfect Plan for Your Needs
                    </a>
                  </span>
                )}
              </Tabs.Item>
            </Tabs>
          </div>
          <div className="report-right w-full lg:w-1/3 bg-stone-50 flex bg-[#fff8f9] flex-col pt-10 justify-center items-center text-center p-5">
            <img src="/assets/contact-bg.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
