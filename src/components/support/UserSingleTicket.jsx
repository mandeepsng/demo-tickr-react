import { Button, Timeline, Alert, Label, Card } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { ServiceState } from "../../context/serviceContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { authService, helper } from "../../services/api";
import CKEditorComponent from "../common/CKEditorComponent";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import FileDisplay from "../common/FileDisplay";
import UrlBreadcrumb from "../common/UrlBreadcrumb";
import {
  HiArrowNarrowRight,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";
import ErrorPage from "../../error-page";

const UserSingleTicket = () => {
  const navigate = useNavigate();

  const [isShowMore, setIsShowMore] = useState(false);
  const {
    userDetails,
    modal,
    setModal,
    setSuccMsg,
    emergencyPrice,
    setPageTitle,
  } = ServiceState();

  const { ticket } = useParams();
  let crumbWord = window.location.pathname;

  const editorRef = useRef();

  const [send_by, setSendBy] = useState("");
  const [dev_id, setDevId] = useState("");
  const [client_id, setClientId] = useState("");
  const [error, setError] = useState({});

  const [tickets, setTickets] = useState([]);
  const [comment, setComment] = useState([]);
  const [editorData, setEditorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTruncated, setIsTruncated] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const fetchTicketComments = async () => {
    try {
      const response = await authService.getTicketById(ticket);
      if (response && response.status === 200) {
        setTickets(response.data);
        setComment(response.data?.comment);
        setClientId(response.data.user_id);

        console.log("response = ", response.data);
      } else {
        console.error("Error fetching tickets:", response);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error.response.status);
      if (error && error.response.status === 404) {
        setNotFoundError(true);
        console.error("404 errror:");
      }
    } finally {
      setLoading(false);
    }
  };
  // console.log(comment)
  useEffect(() => {
    fetchTicketComments();

    const intervalId = setInterval(() => {
      fetchTicketComments();
    }, 5000);

    setPageTitle(`Tickets | ${ticket}`);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    fetchTicketComments();
  }, [editorData]);

  console.log("comment cccc= ", comment);
  console.log("client_id= ", client_id);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };
  // const editorRef = useRef(null);
  // const [editorData, setEditorData] = useState("");

  const handleEditorChange = (data) => {
    console.log("Editor data:", data);
    setEditorData(data);
    // You can perform additional actions with the editor data
  };
  
  const handleDiscard = async(e) => {

    e.preventDefault();
    if (editorRef.current) {
      setEditorData(null);
      console.log(editorData, "editorData")
      console.log(editorRef, "editorData")
      editorRef.current();
    }

  };

  const handleContact = async (e) => {
    e.preventDefault();

    
    console.log("editorData", editorData);

    const validationErrors = validateForm();
    // console.log(validationErrors)
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0 && editorData) {
      const contactUserPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.comment({
            message: editorData,
            ticket_id: ticket,
            send_by: send_by,
            dev_id: dev_id,
          });
          resolve(`message sent..`);
          setEditorData("");
          console.log("editorRef =  ", editorRef);

          fetchTicketComments();

          if (editorRef.current) {
            editorRef.current();
          }
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 422) {
            // Handle validation errors
            const err = error.response.data.message;
            let errorObject = {};
            errorObject["email"] = err;
            setError(errorObject);
            reject(errorObject); // Reject with the validation error for toast.error
          } else {
            // Handle other errors
            console.error("An error occurred during contacting:", error);
            reject(error); // Reject with the general error for toast.error
          }
        }
      });
      toast.promise(contactUserPromise, {
        pending: {
          render() {
            return "Please wait ...";
          },
          icon: true,
        },
        success: {
          render({ data }) {
            return `${data}`;
          },
          // You can customize the success icon or add other options
          icon: "✔️",
        },
        error: {
          render({ data }) {
            // When the promise rejects, data will contain the error
            // console.log(data.email)
            return `${data.email}`;
          },
        },
      });

      // Use the promise after creating it
      contactUserPromise
        .then((successMessage) => {
          console.log(successMessage);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      // setError(validationErrors)
      console.log("Contact failed. Please fix the errors.");
      // console.log(error, 'error.username')
    }
  };
  const status = [
    "Waiting for response",
    "Resolved",
    "Working",
    "On Hold",
    "Rejected",
  ];
  const bg_status = ["#F3EAFC", "#E0F5F0", "#EFF1FF", "#FFEFE0", "#FFECEC"];

  const validateForm = () => {
    let errors = {};

    if (!editorData.trim()) {
      errors.editorData = "editorData is required";
    }

    return errors;
  };

  const handleCheckout = async (e, stripePriceId) => {
    e.preventDefault();

    try {
      // Make an API call to initiate subscription checkout
      const response = await authService.checkout(stripePriceId);

      console.log(response);

      // Redirect to the Stripe Checkout page
      //  navigate(response.data.checkout_url);

      // Redirect to the Stripe Checkout page
      window.location.href = response.data.checkout_url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      // Handle error (e.g., show an error message)
    }
  };

  if (notFoundError) {
    return <ErrorPage />;
  }

  return (
    <div className="container m-auto">
      {loading ? (
        <></>
      ) : (
        <div className="flex flex-col  m-auto p-5  w-auto h-auto ">
          <div className=" container m-auto text-white py-5">
            <UrlBreadcrumb crumbWord={crumbWord} />
          </div>

          <div className="tickets-reply flex mt-5 gap-8 border p-5 flex-col lg:flex-row">
            <div className="lg:w-1/2 w-full">
              <div className="border-0">
                <div className="back-btn flex justify-between">
                  <Link to="/tickets">
                    <Button outline pill>
                      <HiOutlineArrowLeft className="h-6 w-6" />{" "}
                      <span className="text-dark-text text-lg ml-2">Back</span>
                    </Button>
                  </Link>
                  <div className="update-ticket-id flex gap-2 items-center">
                    <button
                      className={`border rounded-full px-5 py-2 text-dark-bg text-sm `}
                      style={{
                        backgroundColor: bg_status[tickets.status],
                      }}
                    >
                      {status[tickets.status]}
                    </button>
                  </div>
                </div>
                <div className="ticket-desc flex flex-col md:flex-row items-start md:justify-between md:items-center mb-5 gap-4 md:gap-1">
                  <Timeline className="">
                    <Timeline.Item className="mb-0">
                      <Timeline.Content>
                        {isTruncated ? (
                          <>
                            <Timeline.Title className="text-xl text-dark-text font-bold my-2">
                              {tickets.subject.slice(0, 22)} ...{" "}
                              <button
                                onClick={toggleTruncate}
                                className="hover:underline text-blue-500 font-bold text-base"
                              >
                                See more
                              </button>
                              <Timeline.Time>#{tickets.id}</Timeline.Time>
                            </Timeline.Title>
                            <Timeline.Body className="my-4">
                              <Timeline.Time className="text-base font-medium">
                                <span className=" pe-2">
                                  Created on{" "}
                                  {helper.formatTimestamp(tickets.created_at)}
                                </span>
                              </Timeline.Time>
                            </Timeline.Body>
                          </>
                        ) : (
                          <>
                            <Timeline.Title className="text-xl text-dark-text font-bold my-2">
                              {tickets.subject}
                              <Timeline.Time>#{tickets.id}</Timeline.Time>
                            </Timeline.Title>
                            <Timeline.Body className="my-4">
                              <Timeline.Time className="text-base font-medium ">
                                <span className=" pe-2 ">
                                  Created on{" "}
                                  {helper.formatTimestamp(tickets.created_at)}
                                </span>
                              </Timeline.Time>
                            </Timeline.Body>
                            <Card className="max-w-auto  shadow-none border-0 box-shadow-none">
                              <p className="font-normal text-gray-700 dark:text-gray-400">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: tickets.description,
                                  }}
                                />
                              </p>
                              <span
                                outline="true"
                                gradientduotone="redToYellow"
                                className="text-sm text-gray-600 pt-2"
                              >
                                {/* <h5 className="text-xl mb-2 font-bold tracking-tight text-dark-bg">Assets</h5> */}
                                {tickets.file_attachment_id !== null ? (
                                  <>
                                    <FileDisplay
                                      fileAttachment={tickets.file_attachment}
                                      size={70}
                                    />
                                    <p>Assets(1)</p>
                                  </>
                                ) : (
                                  <p>Assets(0)</p>
                                )}
                                {/* {tickets.file_attachment?.file_path} */}
                                {/* Assets(0)  */}
                              </span>
                              <button
                                onClick={toggleTruncate}
                                className="hover:underline text-blue-500 font-bold text-left"
                              >
                                Show less
                              </button>
                            </Card>
                          </>
                        )}
                      </Timeline.Content>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </div>

              <hr />
              <div className="reply-chats mt-3 max-h-96 overflow-y-auto">
                <Timeline>
                  {comment && comment.length > 0 ? (
                    comment
                      .slice()
                      .reverse()
                      .map((commentItem) => (
                        <div
                          className="single-chat mt-2 bg-[#f9fafb] p-5 mx-2"
                          key={comment.id}
                        >
                          <Timeline.Item>
                            <Timeline.Content>
                              {/* <Timeline.Time>February 2022</Timeline.Time> */}
                              <Timeline.Title className="flex  justify-between items-center">
                                <div className="client-details">
                                  <button
                                    className={`rounded-full  w-10 h-10  me-2 ${
                                      commentItem.send_by ===
                                      commentItem.client.id
                                        ? "bg-[#FDEAEE] text-[#EF295A]"
                                        : "bg-[#EF295A] text-[#FDEAEE]"
                                    }`}
                                  >
                                    {commentItem.send_by ===
                                    commentItem.client.id
                                      ? commentItem.client.name.substring(0, 1)
                                      : commentItem.dev.name.substring(0, 1)}
                                  </button>
                                  {commentItem.send_by === commentItem.client.id
                                    ? commentItem.client.name
                                    : commentItem.dev.name}
                                </div>
                                <div className="ticket-created-details text-sm me-2">
                                  Created on{" "}
                                  {helper.formatTimestamp(
                                    commentItem.created_at
                                  )}
                                </div>
                              </Timeline.Title>
                              <Timeline.Body className="my-4">
                                {parse(commentItem.message)}
                              </Timeline.Body>

                              {commentItem.emergencyticketpayment !== null && (
                                <div className="single-ticket-pay flex gap-2 flex-col mb-5">
                                  <div className="single-ticket-pay-head">
                                    <h5>
                                      {commentItem.emergencyticketpayment
                                        .emergency_payment /
                                        emergencyPrice}{" "}
                                      Hours in total will be spent on task
                                    </h5>
                                  </div>
                                  <div className="single-ticket-pay-body flex gap-3 mt-4 mx-2">
                                    <Link to="#">
                                      <Button
                                        className="bg-rvs-bg"
                                        size="lg"
                                        onClick={(e) =>
                                          handleCheckout(
                                            e,
                                            commentItem.emergencyticketpayment
                                              .price_id
                                          )
                                        }
                                        disabled={
                                          commentItem.emergencyticketpayment
                                            .emergency_payment_status === 1
                                            ? true
                                            : false
                                        }
                                      >
                                        Pay £
                                        {
                                          commentItem.emergencyticketpayment
                                            .emergency_payment
                                        }
                                      </Button>
                                    </Link>
                                    {/* <Button
                                      color="gray"
                                      size="lg"
                                      onClick={() =>
                                        setModal({ reviseQuotation: true })
                                      }
                                    >
                                      Revise
                                    </Button> */}
                                  </div>
                                </div>
                              )}
                            </Timeline.Content>
                            {/* <hr /> */}
                          </Timeline.Item>
                        </div>
                      ))
                  ) : (
                    <Card className="max-w-auto p-5 disabled">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Describe your issue !!
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
                      </p>
                    </Card>
                  )}
                </Timeline>
              </div>
            </div>
            <div className="lg:w-1/2 py-2 w-full">
              {tickets.status == 1 ? (
                <Card className="max-w-auto p-5 disabled text-center">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Ticket is now resolved
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <h6 className="text-lg font-semibold inline">
                      Having Isue?
                    </h6>
                    <span className=" text-dark-bg ">
                      {" "}
                      Drop an email to Admin{" "}
                      <a
                        href="mailto:hello@rvsmedia.co.uk"
                        className="hover:underline"
                      >
                        hello@rvsmedia.co.uk
                      </a>{" "}
                      or{" "}
                      <a href="/contact-us" className="hover:underline">
                        Contact us
                      </a>
                    </span>
                  </p>
                </Card>
              ) : tickets.status == 4 ? (
                <Card className="max-w-auto p-5 disabled text-center">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Ticket is now Rejected
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <h6 className="text-lg font-semibold inline">
                      Having Isue?
                    </h6>

                    <span className=" text-dark-bg ">
                      {" "}
                      Drop an email to Admin{" "}
                      <a
                        href="mailto:hello@rvsmedia.co.uk"
                        className="hover:underline"
                      >
                        hello@rvsmedia.co.uk
                      </a>{" "}
                      or{" "}
                      <a href="/contact-us" className="hover:underline">
                        Contact us
                      </a>
                    </span>
                  </p>
                </Card>
              ) : (
                <form action="">
                  <div className="form-chat-section">
                    <div className="agent-details  rounded-md mx-2 ">
                      <h4 className="text-base font-semibold p-2 border-2 border-gray-100">
                        <span className="text-sm text-gray-500">To: </span>
                        Admin
                      </h4>{" "}
                      <div className="reply-editor h-[500px]">
                        <CKEditorComponent
                          placeholderr="Type Your Message"
                          onChange={handleEditorChange}
                          clearEditorRef={editorRef}
                          value={editorData}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end mt-4 mx-2">
                      {editorData && editorData.length > 0 && ( 
                      <Link to="#">
                        <Button 
                        color="gray" 
                        size="lg"
                        onClick={(e) => handleDiscard(e)}
                        >
                          Discard
                        </Button>
                      </Link>
                      )}

                      <Link to="#">
                        <Button
                          className="bg-rvs-bg"
                          size="lg"
                          onClick={(e) => handleContact(e)}
                          disabled={tickets.status === 1 ? true : false}
                        >
                          Send
                        </Button>
                      </Link>
                    </div>
                  </div>
                </form>
              )}

              {/* <div className="agent-details border-2 border-gray-100 rounded-md px-2 mt-4">
              <h4 className="text-base font-semibold py-2">TICKET FIELDS</h4>{" "}
              <p>
                <span className="text-sm text-gray-500">
                  Status <br />
                </span>
                Being Processed
              </p>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSingleTicket;
