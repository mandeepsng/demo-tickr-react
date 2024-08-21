import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Badge, Dropdown, Timeline } from "flowbite-react";
import { ServiceState } from "../../context/serviceContext";
import { Button } from "flowbite-react";
import { authService } from "../../services/api";
const Tickets = ({ limit, query, searchDropDown }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [comboTickets, setComboTickets] = useState([]);

  console.log(searchDropDown);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await authService.getTickets();
        if (response && response.status === 200) {
          console.log(response.data);

          if (query) {
            setTickets(null);
            if (searchDropDown == 5) {
              const filteredData = response.data.filter((item) =>
                item.subject.toLowerCase().includes(query.toLowerCase())
              );
              setTickets(filteredData);
              console.log("combo");
            } else {
              const filteredData = response.data.filter(
                (item) =>
                  item.subject.toLowerCase().includes(query.toLowerCase()) &&
                  item.status === searchDropDown
                // || item.type == searchDropDown
              );
              setTickets(filteredData);
              console.log("query");
            }
          } else if (searchDropDown >= 0 && searchDropDown < 5) {
            setTickets(null);
            // console.log("first");
            // console.log(searchDropDown);
            const dropData = response.data.filter(
              (item) => item.status === searchDropDown
            );
            console.log("dropData");
            setTickets(dropData);
          }

          // if (query  && searchDropDown) {
          //   // setTickets(null);

          //   const filteredArray = response.data.filter(item => {
          //     const nameMatch = item.subject.toLowerCase().includes(query.toLowerCase());

          //     const categoryMatch = item.status === searchDropDown;

          //     return nameMatch && categoryMatch;
          //   });
          //   // const result = response.map(item => item.subject === item.subject.toLowerCase().includes(query.toLowerCase()) && item.status === searchDropDown);
          //   console.log("combo" , filteredArray);
          //   // setTickets(response);
          // }
          else if (searchDropDown === 5) {
            setTickets(null);
            query = null;
            setTickets(response.data);
            // } else if (limit > 0) {
            //   setTickets(response.data.slice(0, limit));
            //   return;
          } else {
            setTickets(response.data);
          }
          // console.log(response.data);
        } else {
          console.error("Error fetching tickets:", response);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [query, limit, searchDropDown]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  };

  const status = [
    "Waiting for response",
    "Resolved",
    "Working",
    "On Hold",
    "Rejected",
  ];
  const bg_status = ["#F3EAFC", "#E0F5F0", "#EFF1FF", "#FFEFE0", "#FFECEC"];
  const via = ["Normal", "Report an Issue", "Emergency"];

  return (
    <div className="all-tickets py-5 flex flex-col gap-5">
      {loading ? (
        <></>
      ) : tickets.length > 0 ? (
        tickets
          .slice()
          .reverse()
          .slice(0, limit)
          .map((ticket) => (
            <div
              key={ticket.id}
              className="single-tickets border-2 border-gray-100 py-4 px-3 md:p-5"
            >
              <Link
                to={{
                  pathname: `/tickets/${ticket.id}`,
                  state: ticket.id,
                }}
              >
                <div className="flex justify-between flex-col md:flex-row items-start md:items-center border-0 gap-5 md:gap-0">
                  <Timeline className="">
                    <Timeline.Item className="mb-0">
                      <Timeline.Content>
                        <Timeline.Title className="text-xl text-dark-text font-bold my-2">
                          {ticket.subject.slice(0, 30)}...{" "}
                          <Timeline.Time>#{ticket.id}</Timeline.Time>
                        </Timeline.Title>
                        <Timeline.Body className="mb-0">
                          <Timeline.Time className="text-base">
                            <span className=" pe-2">
                              Created on {formatTimestamp(ticket.created_at)}
                            </span>
                            <span className="">
                              {/* - {ticket.type==2 ? "via Report an Issue" : "via Emergency"} */}
                              - {via[ticket.type]}
                            </span>
                          </Timeline.Time>{" "}
                          {/* | Assigned to:{" "}
                        <span className="font-medium text-bg-trans">{ticket.subject}</span> */}
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  </Timeline>
                  <button
                    className={`border rounded-full px-5 py-2 text-dark-bg text-sm `}
                    style={{
                      backgroundColor: bg_status[ticket.status],
                    }}
                  >
                    {status[ticket.status]}
                  </button>
                  {/* You can customize the rendering of each ticket as needed */}
                </div>
              </Link>
            </div>
          ))
      ) : (
        <div className="text-center font-semibold">
          No Tickets Found {query ? query : ""}
        </div>
      )}
    </div>
  );
};

export default Tickets;
