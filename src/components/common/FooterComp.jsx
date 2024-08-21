import { List } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function FooterComp() {
  return (
    <>
      <footer className="text-white  z-50 bg-dark-bg p-5 md:px-8">
        <div className="container m-auto text-center ">
          <div className="flex justify-between flex-col gap-4 lg:flex-row ">
            <div className="left-contact flex items-center gap-2 justify-between md:justify-center flex-col md:flex-row">
              <Link to="/">
                <img src="/assets/footer-R.png" alt="" />
              </Link>
              <span className="underline underline-offset-1 pr-1"></span> © 2024
              RVS Media Ltd. VAT No. GB294309777. Registered in England, Company
              No. 10419987
            </div>
            <div className="right-contact flex items-center justify-between md:justify-center ">
              <span className="underline underline-offset-1 pr-5">
                <Link to="/">Privacy Policy</Link>
              </span>
              <List className="flex items-center gap-3 pl-5 md:border-l border-gray-500">
                <List.Item>Find Us:</List.Item>
                <List.Item>
                  <Link to="/">
                    <FaFacebookF style={{ color: "col-svg" }} />
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/">
                    <FaInstagram style={{ color: "col-svg" }} />
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/">
                    <FaXTwitter style={{ color: "col-svg" }} />
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/">
                    <FaLinkedinIn style={{ color: "col-svg" }} />
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/">
                    <FaXTwitter style={{ color: "col-svg" }} />
                  </Link>
                </List.Item>
              </List>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterComp;
