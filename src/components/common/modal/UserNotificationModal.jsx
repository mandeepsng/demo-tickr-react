import { Button, Modal, Timeline } from "flowbite-react";
import { ServiceState } from "../../../context/serviceContext";
import { Link , useNavigate } from "react-router-dom";
import { authService } from "../../../services/api";
import { useEffect, useState } from "react";


const UserNotficationModal = () => {

  const navigate = useNavigate();
  
  const { modal, setModal  , setNotiflength , userDetails } = ServiceState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [notification, setNotification] = useState([]);



  console.log(notification)

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    });
    return formattedDate;
  };


 
  useEffect(() => {

    const fetchNotifications = async () => {
      try {
        const response = await authService.notification({
          token: token,
        });
        if (response && response.status === 200) {
          setNotification(response.data);
          setNotiflength(response.data.length);
          console.log(response.data);
          
        } else {
          console.error("Error fetching tickets:", response);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    const intervalId = setInterval(() =>{
      fetchNotifications();

    }, 5000);


    return () => {
      clearInterval(intervalId);
    }
    // fetchNotifications();

  }, []);
  // const href= notification[0].href.split('/');

  const handleNotificationClick = async (notif)=>{
      // e.preventDefault();
      console.log(notif);

      try{
        const response = await authService.readNotification({
          notification_id: notif.id,
        })
          const notifHref= notif.type;

          if(notifHref == 'ticket'){
            navigate(notif.href.split("support")[1]);
          }
          else if(notifHref == 'order' || notifHref == "register"){
            navigate('/profile');
          }
          else{
            navigate('/');

          }

        console.log(response);
        setModal({ notificationPopup: false });
      }
      catch(error){
        
        // setError(validationErrors)
        console.log('failed. Please fix the errors.')
        console.log(error)
      }
      


    }

  return (
    <>
      <Modal
        dismissible
        show={modal.notificationPopup}
        onClose={() => setModal({ notificationPopup: false })}
        className="w-auto lg:w-1/3 2xl:w-1/4 m-auto fixed top-10 user-notification-modal"
        // id="user-notification-modall"
      >
        <div className=" shadow-lg shadow-gray-500/50 h-auto">
          <Modal.Header>Notifications</Modal.Header>
          <Modal.Body className="user-notification-body max-h-96 overflow-y-auto py-5 px-5">
            <div className="latest-tickets">
              <Timeline className="border-l-0 ">
                {notification.length > 0 ?
                  notification.map((notif) => (

                    notif.is_read == 0  &&
                    <Link 
                    // to={{
                    //   pathname: notif.href.split("support")[1],
                    //   state: notif.id,
                    // }}
                    // to={`/readNotification/${notif.id}`}
                    onClick={()=>handleNotificationClick(notif)}
                    key={notif.id}
                    >
                    <Timeline.Item
                      className="border-b-2 mb-0 py-4 cursor-pointer"
                      key={notif.id}
                    >
                      <Timeline.Content>
                        <div className="flex items-center">
                          <Timeline.Title>
                            <img
                              src="/assets/ad-hoc.svg"
                              alt=""
                              srcSet=""
                              className=""
                            />
                          </Timeline.Title>
                          <Timeline.Body>
                            <h4>
                              <b>{notif.type != 'register' ? notif.sender?.name : userDetails?.name}</b> {notif.message}
                              {/* <b>50 hrs Add-Hoc Hours</b> for the project{" "} */}
                              {/* <b>#SR-11 SOMAA.IO </b> */}
                            </h4>
                            <Timeline.Time className="">
                              Received on{" "}
                              {formatTimestamp(notif.updated_at)}
                            </Timeline.Time>
                          </Timeline.Body>
                        </div>
                      </Timeline.Content>
                    </Timeline.Item>
                    </Link>
                  )) :  <div className="text-dark-text font-semibold hover:text-blue-500 text-center cursor-pointer">
                   <p>No Notification Found</p>
                </div>}
                </Timeline>
            </div>
          </Modal.Body>
          {notification.length  > 0 && 
          <Modal.Footer className="justify-center py-2">
            {/* <Link to="/">
              <span className="text-dark-text font-semibold hover:text-blue-500">
                  See All Notifications
              </span>
            </Link> */}
          </Modal.Footer>}
        </div>


      </Modal>
    </>
  );
};
export default UserNotficationModal;
