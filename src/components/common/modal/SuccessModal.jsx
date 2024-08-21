import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { ServiceState } from "../../../context/serviceContext";
import { Link } from "react-router-dom";

const SuccessModal = () => {
  const { setModal, modal, succMsg, setSuccMsg } = ServiceState();
  // console.log(modal.succMsg);
  const contSuccessMsg = {
    title: "Thank you for contacting us!",
    desc: "As our team gets back to you, take a seat back and unwind.",
    url: "/tickets",
  };
  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal
        dismissible
        show={modal.successPopup}
        onClose={() => setModal({ successPopup: false })}
        className="w-11/12 md:w-3/4 lg:w-2/5 xl:w-1/3  m-auto h-auto"
        id="success-modal"
      >
        <Modal.Header className="border-0 p-0 success-modal-header">
          <img src="/assets/success-popup.png" alt="" srcSet="" />
        </Modal.Header>
        <Modal.Body className="md:mt-8 p-5">
          <div className="text-center flex flex-col gap-2">
            <h4 className="text-2xl font-semibold">{succMsg.title}</h4>
            <p className="text-base leading-relaxed w-auto md:w-96 lg:w-auto m-auto text-gray-500 dark:text-gray-400">
              {" "}
              {succMsg.desc}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center pb-6 md:py-12">
          <Link to={succMsg.url ? succMsg.url : "/"}>
            <Button
              className="bg-rvs-bg px-8 md:px-28 text-2xl"
              size="xl"
              onClick={() => setModal({ successPopup: false })}
            >
              OK
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuccessModal;
