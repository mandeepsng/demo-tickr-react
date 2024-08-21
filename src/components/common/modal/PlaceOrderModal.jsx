import { Modal } from "flowbite-react";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ServiceState } from "../../../context/serviceContext";

const PlaceOrderModal = () => {
  const{services,setModal,modal}= ServiceState();
  return (
    <>
<Modal dismissible show={modal.placeOrderPopup} onClose={() => setModal({placeOrderPopup:false})} className="w-1/4 p-0" id="place-order-modal">
  <form className="h-screen flex flex-col ">
  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <div className="w-96 text-end">
      <button
        className="text-black close--search-modal"
        data-modal-hide="place-modal"
        onClick={() => setModal({placeOrderPopup:false})}
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
        <h3
          className="font-semibold leading-6 text-gray-900 text-2xl"
          id="modal-title"
        >
          Items Requested
        </h3>
        <div className="mt-2 flex items-center gap-3">
          <div className="">
            <img src="/assets/service-cat-cart.svg" />
          </div>
          <div
            className="item-title text-gray-400 flex justify-between items-center w-full"
          >
            <div>Password Reset</div>
            <div>
              <button>
                <AiOutlineMinusCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="place-request d-flex mt-5">
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2 w-64">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="jaskirat.rvs@gmail.com"
                />
              </div>

              <div className="flex items-start mb-5 mt-3">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Request for someone else
                </label>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
</Modal>
    </>
  );
};

export default PlaceOrderModal;
