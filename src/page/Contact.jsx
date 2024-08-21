import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import UrlBreadcrumb from "../components/common/UrlBreadcrumb";
import { authService } from "../services/api";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PiMapPinLight } from "react-icons/pi";
import { ServiceState } from "../context/serviceContext";
import SuccessModal from "../components/common/modal/SuccessModal";

const Contact = () => {
  const [editorData, setEditorData] = useState("");
  const{setModal ,modal ,   succMsg,setSuccMsg , userDetails , setPageTitle}= ServiceState();
  // console.log(userDetails);
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  useEffect(() => {
    setPageTitle("Contact Us")
  }, [])
  

  let crumbWord = window.location.pathname;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState({});

  const contSuccessMsg ={
    title:"Thank you for contacting us!",
    desc:"As our team gets back to you, take a seat back and unwind.",
    url:"/tickets"

  };


  const handleContact = async (e) => {
    e.preventDefault();

    
    console.log(authService.contact);
    // return;
    
    const validationErrors = validateForm();
    // console.log(typeof validationErrors);
    // console.log(validationErrors);
    setError(validationErrors);
    
    console.log(email, name,phone,address,editorData);
    // return;
    if (Object.keys(validationErrors).length === 0) {
      const contactUserPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.contact({
            name: name,
            email: email,
            phone: phone,
            address: address, 
            description: editorData,
          });
          // alert("okkkkk")
          console.log(response);
          resolve(`Thankyou , we will contact you shortly`);
          setEmail("");
          setName("");
          setAddress("");
          setPhone("");
          setEditorData("");
          setModal({ successPopup: true, succMsg : setSuccMsg(contSuccessMsg), })
          console.log(modal.succMsg)
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

  const validateForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Email is invalid";
    }

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
    }else if (!/^\d{10}$/.test(phone.trim())) {
      errors.phone = "Phone number must be 10 digits long";
    }

    // if (!address.trim()) {
    //   errors.address = "Address is required";
    // }

    if (!editorData.trim()) {
      errors.editorData = "Description is required";
    }

    return errors;
  };
  return (
    <>
  <SuccessModal/>
    <div className="flex flex-col  m-auto md:p-5 h-auto ">
      <div className=" container mx-auto my-2 text-white py-2">
        <UrlBreadcrumb crumbWord={crumbWord} />
      </div>
      <div className="service-cat container m-auto my-5 flex flex-wrap flex-col-reverse lg:flex-row w-full border border-gray-200 justify-between">
        <div className="report-left w-full lg:w-3/5  p-5">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white my-4">
            Contact Us
          </h1>
          <hr />
          <form className="flex w-full flex-col gap-5 mt-5">
            <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-8">
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="cont_name" value="Full Name*" />
                </div>
                <TextInput
                  id="cont_name"
                  type="text"
                  placeholder="Your name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error.name && (
                  <span style={{ color: "red" }}>{error.name}</span>
                )}
              </div>
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="cont_email" value="Email*" />
                </div>
                <TextInput
                  id="cont_email"
                  type="email"
                  placeholder="example@eg.com"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                {error.email && (
                  <span style={{ color: "red" }}>{error.email}</span>
                  )}
              </div>
              <div className="md:w-2/4 w-full">
                <div className="mb-2 block">
                  <Label htmlFor="cont_tel" value="Phone number*" />
                </div>
                <TextInput
                  id="cont_tel"
                  type="number"
                  placeholder="0000 000-0000"
                  required
                  addon="+44"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {error.phone && (
                  <span style={{ color: "red" }}>{error.phone}</span>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Website*" />
              </div>
              <TextInput
                id="address"
                type="text"
                // rightIcon={PiMapPinLight}
                placeholder="Enter your address"
                // required
                addon="https://"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
                {error.address && (
                  <span style={{ color: "red" }}>{error.address}</span>
                  )}
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Description*" />
              </div>
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleChange}
                config={{
                  height: "200px", // Set your desired height here
                }}
                name="desc"
              />
               {error.editorData && (
                 <span style={{ color: "red" }}>{error.editorData}</span>
                 )}
            </div>
            <div className="flex gap-3 justify-start mt-2">
              <Link to="#">
                <Button
                  className="bg-rvs-bg"
                  size="lg"
                  onClick={(e) => handleContact(e)}
                >
                  Submit
                </Button>
              </Link>
              <Link to="/ ">
                <Button color="gray" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="report-right w-full lg:w-1/3 bg-stone-50 flex bg-[#fff8f9] flex-col md:pt-10 justify-center items-center text-center p-5">
          <img src="/assets/contact-bg.png" />
          {/* <h4 className="text-lg font-semibold py-2">
          Looking to solve your issue quickly?
        </h4>{" "}
        <span className="text-sm text-gray-500">
        Add more details to the subject to see relevant articles right here!
        </span> */}
        </div>
      </div>
    </div>
        </>
  );
};

export default Contact;
