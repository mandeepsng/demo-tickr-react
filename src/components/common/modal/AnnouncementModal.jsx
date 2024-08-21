import { Modal } from "flowbite-react";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ServiceState } from "../../../context/serviceContext";

const AnnouncementModal = () => {
  const{services,setModal,modal}= ServiceState();
  return (
    <>
<Modal dismissible show={modal.announcementPopup} onClose={() => setModal({announcementPopup:false})} className="w-1/4 p-0" id="place-order-modal">
  <div className="h-screen flex flex-col ">
  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <div className="flex justify-between items-center">
    <h3
          className="font-semibold leading-6 text-gray-700 text-2xl"
          id="modal-title"
        >
         Announcements
        </h3>
      <button
        className="text-black close--search-modal"
        data-modal-hide="place-modal"
        onClick={() => setModal({announcementPopup:false})}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.1"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"
          ></path>
          <path
            d="M10.5 4l-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5z"
          ></path>
        </svg>
      </button>
    </div>
    <div className="sm:flex sm:items-start">
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
       
        <div className="mt-2 flex items-center gap-5 flex-col justify-center pt-10">
          <div className="">
            <img src="/assets/announcement.svg" className="w-64" />
          </div>
          <div
            className="item-title text-gray-600 flex justify-center items-center w-full"
          >
            <div>Looks like you don't have any announcements yet</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</Modal>
    </>
  );
};

export default AnnouncementModal;
