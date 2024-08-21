import { Badge, Button, Modal, Tabs } from "flowbite-react";
import { useRef, useState } from "react";
import { ServiceState } from "../../../context/serviceContext";
import { ListGroup } from "flowbite-react";
import AnnouncementModal from "./AnnouncementModal";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/api";

const UserProfileModal = () => {
  const navigate = useNavigate();
  const { modal, setModal, userDetails } = ServiceState();
  // console.log(userDetails);
    const handleLogout = () => {
      // Clear the token from localStorage
      localStorage.removeItem("token");
      setModal({ userProfilePopup: false });

      try {
        const response = authService.logout();
        console.log(response);
      }catch (error) {
        console.log(error)
      }

      // Redirect back to the login page
      navigate("/login");
    };
  // console.log(userDetails)

  return (
    <>
      <Modal
        className="absolute w-96 m-auto right-12 top-20 transition ease-in-out delay-150 duration-300 h-auto user-profile-modal"
        dismissible
        show={modal.userProfilePopup}
        onClose={() => setModal({ userProfilePopup: false })}
        // id="user-profile-modal"
      >
        <Modal.Header>My Profile</Modal.Header>
        <Modal.Body className="p-5">
          <div className="border px-5 py-2 rounded-lg">
            <button
              className="rounded-full bg-[#FDEAEE] text-text-pink font-semibold w-10 h-10 "
              onClick={() => setModal({ userProfilePopup: true })}
            >
              {userDetails && userDetails.name.substring(0, 1)}
            </button>{" "}
            <span className="ml-2 font-semibold">{userDetails && userDetails.name}</span>
          </div>
          <div className="w-full mt-5">
            <ListGroup className="">
              <Link to="/profile">
                <ListGroup.Item
                  className="border-0 " onClick={() => setModal({ userProfilePopup: false })}                 
                >
                  <span className="py-1 font-semibold">Profile</span>
                </ListGroup.Item>
              </Link>
              {/* <ListGroup.Item
                className="border-0"
                onClick={() => setModal({ announcementPopup: true })}
              >
                <div className="flex justify-between w-full items-center">
                  Announcements{" "}
                  <span
                    type="button"
                    className="flex items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900 rounded-full focus:ring-2"
                  >
                    <span className="flex items-center transition-all duration-200 rounded-md text-sm py-1 px-2">
                      12
                    </span>
                  </span>
                </div>
              </ListGroup.Item> */}
              <ListGroup.Item className="border-0  " onClick={handleLogout}>
                <div className="flex justify-between w-full py-1">
                  Sign out <img src="/assets/signout.svg" alt="" srcSet="" />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UserProfileModal;
