import React, {  useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import UrlBreadcrumb from "../common/UrlBreadcrumb";
import { HiHome } from "react-icons/hi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { authService } from "../../services/api";
import { toast } from "react-toastify";
import { ServiceState } from "../../context/serviceContext";

const ReportIssue = () => {

  const navigate = useNavigate();
 
  let editorRef = useRef(null);
  let crumbWord=window.location.pathname; 
  const [editorData, setEditorData] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [error, setError] = useState({});
  const{setModal ,  succMsg,setSuccMsg , setPageTitle}= ServiceState();

  const [attachment, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    setPageTitle("Report an Issuej")
  }, [])
  
  const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if file type is allowed
    if (!allowedFileTypes.includes(file.type)) {
      setFileError('Invalid file type. Please select an image, document, or text file.');
      return;
    }

    // Check if file size is within limits
    if (file.size > maxFileSize) {
      setFileError('File size exceeds the limit of 5MB. Please choose a smaller file.');
      return;
    }

    // Clear previous errors
    setFileError('');

    // Update selected file and file type
    setSelectedFile(file);
    setFileType(file.type);
  }

  const handleFileUpload = () => {
    console.log('Selected File:', selectedFile);
  };



  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  
  const reportSuccessMsg ={
    title:"Your report has been successfully sent!",
    desc:"Please wait for a while till our team, creates ticket for this and don't forget to come to check your ticket.",
    url:"/tickets"
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log('Selected File:', selectedFile);
    

    const validationErrors = validateForm();
    console.log(validationErrors)
    console.log(typeof validationErrors);
    setError(validationErrors);
    console.log(email,subject,webUrl,editorData, attachment);

    if (Object.keys(validationErrors).length === 0) {

      const formData = new FormData();
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('website', webUrl);
      formData.append('description', editorData);

      // Append the file to the form data
      formData.append('attachment', attachment);

      const contactUserPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await authService.ticket(
            formData
          );
          console.log(response);
          resolve(`Thankyou , we will contact you shortly`);
          setEmail('');
          setSubject('');
          setWebUrl('');
          setEditorData('');
          // setModal({ successPopup: true, succMsg : setSuccMsg(reportSuccessMsg),  })
          navigate("/tickets");
        } 
        catch (error) {

          console.log(error)
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
  }

  const validateForm = () => {
    let error = {};

    if (!email.trim()) {
      error.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      error.email = "Email is invalid";
    }

    if (!subject.trim()) {
      error.password = "Subject is required";
    } 
    
    if (!webUrl.trim()) {
      error.webUrl = "Website URL is required";
    } else if (!/^https?:\/\/\S+$/.test(webUrl.trim())) {
      error.webUrl = "Invalid Website URL";
    }

    if (!editorData.trim()) {
      error.editorData = 'Description is required';
    }

    return error;

  } 


  return (
    <div className="flex flex-col  m-auto md:p-5   h-auto ">
    <div className=" container mx-auto my-2 text-white py-2">
      <UrlBreadcrumb crumbWord={crumbWord} />
    </div>
    <div className="service-cat container m-auto my-5 flex flex-wrap flex-col-reverse lg:flex-row w-full border border-gray-200 justify-between">
      <div className="report-left w-full lg:w-3/5 p-5">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white my-4">
        Report an Issue
        </h1>
        <hr />
        <form className="flex w-full flex-col gap-5 mt-5">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Requester*" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                 {error.email && <span style={{ color: "red" }}>{error.email}</span>}
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Subject*" />
                </div>
                <TextInput
                  id="email"
                  type="text"
                  value={subject}
              placeholder="Subject*"
              onChange={(e) => setSubject(e.target.value)}
              name="subject"
                  required
                />
                  {error.password && (
              <span style={{ color: "red" }}>{error.password}</span>
            )}
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Website URL*" />
                </div>
                <TextInput
                  id="email"
                  type="url"
                  placeholder="Enter your domain URL"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  name="webUrl"
                  required
                />
                 {error.webUrl && <span style={{ color: "red" }}>{error.webUrl}</span>}

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
                height: '200px', // Set your desired height here
              }}
              name="desc"
            />
            {error.editorData && <span style={{ color: "red" }}>{error.editorData}</span>}
              </div>       
            <div id="fileUpload" className="max-w-xs">
            <div className="mb-1 block">
              <Label htmlFor="file" value="Attach a file" />
            </div>
            <FileInput 
            id="file" 
            onChange={handleFileChange}
            helperText=""
            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx, .txt"
             />
          </div>

          <div className="flex gap-3 justify-start mt-2">
            <Link to="#">
              <Button className="bg-rvs-bg" size="lg" onClick={(e) => handleSubmit(e)} >
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
        <img src="/assets/report-right.png" />
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

export default ReportIssue;
