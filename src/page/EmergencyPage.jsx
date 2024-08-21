import React, { useEffect, useState } from "react";
import { ServiceState } from "../context/serviceContext";
import UrlBreadcrumb from "../components/common/UrlBreadcrumb";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Link } from "react-router-dom";
import { authService } from "../services/api";
import { toast } from "react-toastify";

const EmergencyPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brandName, setBrandName] = useState("");
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");
  let crumbWord = window.location.pathname;
  const { setModal, modal, userDetails, succMsg, setSuccMsg, emergencyPrice,setPageTitle } =
    ServiceState();
  const [error, setError] = useState({});

  const contSuccessMsg = {
    title: "The request has been successfully submitted!",
    desc: "Dont't forget to check for further updted on your request",
    url: "/tickets",
  };


    useEffect(()=> {
      setName(userDetails && userDetails.name)
      setEmail(userDetails && userDetails.email)
      setPageTitle("Emergency");
    }, [])

  const handleEmergency = async(e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setError(validationErrors);
    console.log(error);
    console.log(email, name, phone, brandName, issue, title);

    if (Object.keys(validationErrors).length === 0) {
      const emergencyPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.emergency({
            name: name,
            email: email,
            phone: phone,
            bussiness_name: brandName,
            subject: title,
            description: issue,
          });
          // alert("okkkkk")
          console.log(response);
          resolve(`Thankyou , we will contact you shortly`);
          setEmail("");
          setName("");
          setTitle("");
          setPhone("");
          setBrandName("");
          setIssue("");
          setModal({ successPopup: true, succMsg: setSuccMsg(contSuccessMsg) });
          console.log(modal.succMsg);
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
      toast.promise(emergencyPromise, {
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
          icon: "🟢",
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
      emergencyPromise
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
  const validateForm = () => {
    let error = {};

    if (!email.trim()) {
      error.email = "Email is required";
    }

    if (!name.trim()) {
      error.name = "Name is required";
    }


    if (!phone.trim()) {
      error.phone = "Phone is required";
    }else if (!/^\d{10}$/.test(phone.trim())) {
      error.phone = "Phone number must be 10 digits long";
    }

    if (!brandName.trim()) {
      error.brandName = "Company Name is required";
    }

    if (!title.trim()) {
      error.title = "Title is required";
    }

    if (!issue.trim()) {
      error.issue = "Describe your Issue";
    }

    return error;
  };

  return (
    <div className="flex flex-col  m-auto md:p-5  w-auto h-auto ">
      <div className=" container mx-auto my-2 text-white py-2">
        <UrlBreadcrumb crumbWord={crumbWord} />
      </div>
      <div className="service-cat container m-auto my-5 flex flex-wrap flex-col-reverse lg:flex-row w-full border border-gray-200 justify-between">
        <div className="report-left w-full lg:w-3/5 p-5">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white my-4">
            Emergency
          </h1>
          <p className="mb-2 font-medium text-dark-bg">
            Our hourly charge for emergency assistance is £{emergencyPrice}
          </p>
          <hr />
          <form className="flex w-full flex-col gap-4 mt-5">
            <div className="flex justify-between gap-4 md:gap-14 flex-col md:flex-row">
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name*" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder={userDetails && userDetails.name}
                  value={userDetails && userDetails.name}
                  required
                  // helperText={
                  //   <>This name will be shown on your payment bill.</>
                  // }
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
                {error.name && (
                  <span style={{ color: "red" }}>{error.name}</span>
                )}
              </div>
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email*" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder={userDetails && userDetails.email}
                  value={userDetails && userDetails.email}
                  required
                  // helperText={
                  //   <>
                  //     Type the email where you would like to receive follow-up
                  //     emails from us
                  //   </>
                  // }
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                {error.email && (
                  <span style={{ color: "red" }}>{error.email}</span>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-4 md:gap-14 flex-col md:flex-row">
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Phone number*" />
                </div>
                <TextInput
                  type="number"
                  placeholder="0000-000-0000"
                  required
                  addon="+44"
                  value={phone}
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {error.phone && (
                  <span style={{ color: "red" }}>{error.phone}</span>
                )}
              </div>
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Company Name*" />
                </div>
                <TextInput
                  id="brand"
                  type="text"
                  placeholder="Your Company"
                  required
                  value={brandName}
                  name="brandName"
                  onChange={(e) => setBrandName(e.target.value)}
                />
                {error.brandName && (
                  <span style={{ color: "red" }}>{error.brandName}</span>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Title*" />
                </div>
                <TextInput
                  type="text"
                  placeholder="Enter Title"
                  required
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error.title && (
                  <span style={{ color: "red" }}>{error.title}</span>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Message*" />
              </div>
              <Textarea
                id="comment"
                placeholder="Please start typing ..."
                required
                rows={4}
                value={issue}
                name="issue"
                onChange={(e) => setIssue(e.target.value)}
              />
              {error.issue && (
                <span style={{ color: "red" }}>{error.issue}</span>
              )}
            </div>

            <div className="flex gap-3 justify-start mt-5">
              <Link to="#">
                <Button
                  className="bg-rvs-bg"
                  size="lg"
                  onClick={(e) => handleEmergency(e)}
                >
                  Request Quote
                </Button>
              </Link>
              <Link to="/">
                <Button color="gray" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="report-right w-full lg:w-1/3 bg-stone-50 flex bg-[#fff8f9] flex-col md:pt-10 justify-center items-center text-center p-5">
          <img src="/assets/emergency-bg.png" />
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

export default EmergencyPage;
