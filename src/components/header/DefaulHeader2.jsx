import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#user-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
      {!userToken && ( // Only show the top header if the user is not logged in
        <div className="TopHeader">
          <div className="container">
            <div className="TopMenu">
              <div className="TopSocial hidden lg:flex justify-center">
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-linkedin-in mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>
              </div>
              <div className="TopMenu">
                <ul className="flex">
                  <li>
                    <a href="/job-list-v7">
                      <i className="fa-solid fa-compass"></i> Jobs
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-solid fa-medal"></i> Careers & Training
                    </a>
                  </li>
                  <li className="border-l-2"></li>
                  <li>
                    <a href="https://employer.sentryspot.co.uk/">
                      <i className="fa-solid fa-user"></i> Post Job
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`header ${
          navbar ? "bg-white shadow-md" : "bg-transparent"
        } transition-all duration-300`}
      >
        <div className="container flex justify-between items-center">
          {/* Sidebar for Mobile View */}
          <div className="md:hidden flex items-center">
            <Link to="/">
              <img
                src="https://htmlsentryspot.vercel.app/img/company_logo.png"
                alt="Logo"
                className="h-14 "
              />
            </Link>
          </div>

          {/* Main Menu for Desktop View */}
          <div className="hidden md:flex items-center">
            <div className="header-menu flex items-center">
              <div className="header-logo flex items-center">
                <Link to="/">
                  <img
                    src="https://htmlsentryspot.vercel.app/img/company_logo.png"
                    alt="Logo"
                    className="h-14"
                  />
                </Link>
                <div className="main-menu ms-4">
                  <ul className="flex space-x-4">
                    <li>
                      <a href="/sentry-spot">AI Services</a>
                    </li>
                    <li>
                      <a href="https://blog.sentryspot.co.uk/category/job-search-strategies/">
                        Hiring Advice
                      </a>
                    </li>
                    <li>
                      <a href="/job-list-v7#tab2">Companies</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Side Menu */}
          <div className="side-menu flex items-center">
            <div className="btn-box flex items-center">
              {userToken ? (
                <>
                  <span className="icon la la-bell text-3xl  text-blue-900"></span>

                  <i class="las la-comment text-3xl mx-4 text-blue-900"></i>

                  {/* <i class="las la-user text-3xl text-blue-900"></i>
                   */}
                  <div id="user-dropdown" className=" ">
                    <i
                      className="las la-user text-3xl text-blue-900 me-3 flex items-center focus:outline-none cursor-pointer"
                      onClick={() => setIsOpen(!isOpen)}
                    ></i>

                    {isOpen && (
                      <div className=" profile-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                        <ul className="py-2 text-sm text-gray-700 ">
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100  "
                            >
                              Profile
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100  "
                            >
                              Saved Searches
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100  "
                            >
                              Saved Jobs
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100  "
                            >
                              Applied Jobs
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100  "
                            >
                              Recommended Jobs
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100  "
                            >
                              Settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2  hover:bg-gray-100  "
                            >
                              Sign Out
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <Button
                    className="bg-gray-500 p-3 duration-500 hover:bg-[#E60278] ml-4 "
                    title="logout"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <IoLogOutOutline size={24} />
                  </Button>
                </>
              ) : (
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#loginPopupModal"
                  className="mr-2 my-4"
                >
                  Sign in
                </a>
              )}
              {!userToken && (
                <Link to={"/sentry-spot"}>
                  <button
                    type="button"
                    className="register-btn hidden lg:flex "
                  >
                    Create Your Sentry ID
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaulHeader2;
