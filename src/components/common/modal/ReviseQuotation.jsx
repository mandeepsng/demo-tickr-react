import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { ServiceState } from "../../../context/serviceContext";
import { Link } from "react-router-dom";

const ReviseQuotation = () => {
  const { setModal, modal , succMsg,setSuccMsg } = ServiceState();
    // console.log(modal.succMsg);
   return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal
      dismissible
        show={modal.reviseQuotation}
        onClose={() => setModal({ reviseQuotation: false })}
        className="w-1/3 m-auto h-auto"
        id="success-modal"
        
      >
        <Modal.Header className="border-0 p-0 success-modal-header">
          <img src="/assets/revise-bg.png" alt="" srcSet="" />
        </Modal.Header>
        <Modal.Body className="mt-8">
          <div className="text-center flex flex-col gap-2 px-5 text-bg-trans">
            <h4 className="text-2xl font-bold">
              Would you like to request revisions yto the quotation again?
            </h4>
            {/* <p className="text-base leading-relaxed w-96 m-auto text-gray-500 dark:text-gray-400">
             {succMsg.desc}
            </p> */}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center py-12 text-2xl">
          <Link to="/">
            <Button className="bg-rvs-bg px-5" size="xl" >
              Re-request
            </Button>
          </Link>
          <Link to="/ ">
                <Button color="gray" size="lg" className="px-5 font-medium" onClick={() => setModal({ successPopup: false })}>
                  Close ticket
                </Button>
              </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviseQuotation;
