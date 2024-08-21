import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoBookOutline } from "react-icons/io5";
import { FaTicketSimple } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { ServiceState } from "../../context/serviceContext";
import { authService } from "../../services/api";

function Header() {
  const [isHidden, setIsHidden] = useState(true);
  const myDivRef = useRef(null);
  const myLiRef = useRef(null);
  const { login, modal, setModal, setLogin, userDetails, notiflength } =
    ServiceState();
  const token = localStorage.getItem("token");
  const [isValidToken, setIsValidToken] = useState(null); // Change default state to null

  async function checkTokenValidity() {
    try {
      const response = await authService.getAuthenticatedUserData();
      return response && response.status === 200;
    } catch (error) {
      console.error("Error during token validation:", error);
      return false;
    }
  }
  console.log(login);
  const [urlWord, setUrlWord] = useState(""); // Change default state to null

  let crumbWord = window.location.pathname;
  useLayoutEffect(() => {
    setUrlWord("");
    let crumbWord = window.location.pathname;
    setUrlWord(crumbWord);
    console.log(urlWord);
    console.log("crumbword", crumbWord);
    // return () => {
    //   setUrlWord("");
    // };
  }, [crumbWord]);
  useEffect(() => {
    // get token and set if exist
    // if (token !== null) {
    //   setLogin(true);
    // }

    async function checkToken() {
      try {
        const isValid = await checkTokenValidity();

        if (isValid) {
          setIsValidToken(true);
          console.log("Token is valid");
          setLogin(true);
        } else {
          setIsValidToken(false);
          console.log("Token is not valid");
          setLogin(false);
        }
      } catch (error) {
        setIsValidToken(false);
        setLogin(false);
        console.error("Error during token validation:", error);
      }
    }

    checkToken();
    const handleClickOutside = (event) => {
      // Check if the click is outside the element
      if (myDivRef.current && !myDivRef.current.contains(event.target)) {
        // Clicked outside of the element, so add the "hidden" class
        setIsHidden(true);
      }
    };
    document.addEventListener("click", handleClickOutside);
    // document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("click", handleClickLi);

    const handlePopstate = () => {
      // Show alert to the user
      // setUrlWord("");
      setIsHidden(true);
     
      // alert('Navigating through browser history!');
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      // document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("click", handleClickOutside);
      // document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [token]);

  const handleToggleClick = (event) => {
    // Prevent the document click event from being triggered
    event.stopPropagation();

    // Toggle the "hidden" class when the button is clicked
    setIsHidden(!isHidden);
  };

  const menuItems = [
    { id: 1, name: "Home", url_link: "/", logo: "/assets/home-logo.svg" },
    {
      id: 2,
      name: "Tickets",
      url_link: "/tickets",
      logo: "/assets/ticket-logo.svg",
    },
    {
      id: 3,
      name: "Ad-Hoc-Hours",
      url_link: "/ad-hoc-hours",
      logo: "/assets/ad-hoc-logo.svg",
    },
    {
      id: 4,
      name: "Server Plans",
      url_link: "/server-plans",
      logo: "/assets/ad-hoc-logo.svg",
    },
  ];
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index, event) => {
    setActiveItem(index);
    setIsHidden(true);
    // console.log(isHidden);
    // You can add additional logic or perform other actions here
  };

  window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    if (window.scrollY > 1) {
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  });

  var header = document.querySelector("header");

  return (
    <header className="text-white p-5 md:px-8   bg-dark-bg z-40 relative">
      <div className="container mx-auto flex  items-center justify-between max-w-8xl">
        <div className="flex items-center cursor-pointer">
          {/* <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg"
            aria-controls="navbar-default"
            aria-expanded="false"
            id="menu-icon"
            onClick={handleToggleClick}
          >
            <span className="sr-only">Open main menu</span>
            <img
              className="menu-white w-8 h-8 md:mr-5 "
              alt="menu"
              src="/assets/menu-icon.svg"
            />
          </button> */}
          <div
            ref={myDivRef}
            className={`transition ease-in-out delay-150 fixed left-0 pt-8 md:pt-16 bottom-0  shadow-lg shadow-grey-500/50 bg-white h-full w-72 md:w-96 ${
              isHidden ? "hidden" : ""
            }`}
            id="navbar-hamburger"
          >
            <ul
              ref={myLiRef}
              className="flex flex-col  font-medium mt-4 md:mx-10 mx-4 gap-3  rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className={
                    activeItem === item.id || item.url_link === urlWord
                      ? "active"
                      : ""
                  }
                  onClick={() => handleItemClick(item.id)}
                >
                  <Link
                    to={item.url_link}
                    className="py-2 px-6 text-dark-bg flex items-center gap-2 rounded hover:bg-light-pink dark:text-gray-400  hover:text-text-pink"
                  >
                    <img src={item.logo} alt="" />
                    {item.name}
                  </Link>
                </li>
                // <li
                //   key={index}
                //   className={`py-2 px-6 text-dark-bg flex items-center gap-2 rounded hover:bg-light-pink dark:text-gray-400  hover:text-text-pink ${
                //     activeItem === index ? "active" : ""
                //   }`}
                //   onClick={() => handleItemClick(index)}
                // >
                //   {item}
                // </li>
              ))}
            </ul>
          </div>
          <Link to="/">
            <img src="/assets/ticket-logo.svg" alt="" className="w-36 sm:w-50" />
          </Link>
        </div>

        {!login && (
          <div className="flex items-center">
            <Link to="/login">
              <button className="text-white px-2 py-2 sm:px-4 mr-2 rounded sm:mr-4">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="text-white px-2 py-2 sm:px-4 sm rounded">Sign up</button>
            </Link>
          </div>
        )}

        {login && (
          <div className="flex items-center gap-2 md:gap-5 h-10 ">
            {/* <SearchServices/> */}
            {/* <Link to="/#" className=""> */}

            <button onClick={() => setModal({ notificationPopup: true })}>
              <div className="rounded-full p-2 bg-[#40444b] relative ">
                <GoBell className="w-6 h-6 " />
                <div className="absolute top-2 right-2 lef">
                  {notiflength > 0 ? (
                    <img src="/assets/red-dot.svg" alt="" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </button>
            {/* </Link> */}
            {/* <Link to="/#"> */}
            <button
              className="rounded-full bg-[#FDEAEE] w-10 h-10 font-semibold text-text-pink"
              onClick={() => setModal({ userProfilePopup: true })}
            >
              {userDetails && userDetails.name.substring(0, 1)}
            </button>
            {/* </Link> */}
          </div>
        )}
      </div>
    </header>
  );
}


export default Header;
