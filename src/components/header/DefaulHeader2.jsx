import { IoLogOutOutline } from "react-icons/io5";
// import logo from "../../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { Constant } from "@/utils/constant/constant";
import logo from "../../../public/company_logo.png";
import { toast } from "react-hot-toast";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  // const { userToken } = useSelector((state) => state.auth);
  const userToken = localStorage.getItem(Constant.USER_TOKEN);
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
  const logoutHandler = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(logout());
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {!userToken && ( // Only show the top header if the user is not logged in
        <div className="TopHeader ">
          <div className="container">
            <div className="TopMenu ">
              <ul className="flex ">
                <li>
                  <a href="/job-list-v3">
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
      )}
      <div
        className={`header ${
          navbar ? "bg-white shadow-md" : "bg-transparent"
        } transition-all duration-300 `}
      >
        <div className="flex justify-between items-center p-2 ">
          {/* Sidebar for Mobile View */}
          <div className="md:hidden flex items-center">
            <Link to="/">
              <img
                // src="https://htmlsentryspot.vercel.app/img/company_logo.png"
                src={logo}
                alt="Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Main Menu for Desktop View */}
          <div className="hidden md:flex items-center">
            <div className="header-menu flex items-center">
              <div className="header-logo flex items-center ">
                <Link to="/">
                  <img
                    // src="https://htmlsentryspot.vercel.app/img/company_logo.png"
                    src={logo}
                    alt="Logo"
                    className="h-14 w-auto"
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
                      <a href="/companies-list">Companies</a>
                    </li>
                    <li>
                      <a href="/community">Community</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Side Menu */}
          <div className=" flex items-center">
            <div className=" flex items-center">
              {userToken ? (
                <>
                  <span className="icon la la-bell hidden md:block text-3xl  text-blue-900"></span>
                  <i class="las la-comment hidden md:block text-3xl mx-4 text-blue-900"></i>

                  <Link to={"/candidates-dashboard/dashboard"}>
                    <i class="las la-user  text-3xl text-blue-900"></i>
                  </Link>
                  <Button
                    className="bg-gray-500 p-3 duration-500 hover:bg-[#E60278] ml-4 "
                    title="logout"
                    onClick={logoutHandler}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <IoLogOutOutline size={24} />
                    )}
                  </Button>
                </>
              ) : (
                // <a
                //   href="#"
                //   data-bs-toggle="modal"
                //   data-bs-target="#loginPopupModal"
                //   className="mr-2 my-4"
                // >
                <Link to="/login">Sign in</Link>

                // </a>
              )}
              {/* {!userToken && (
                <Link to={"/sentry-spot"}>
                  <button
                    type="button"
                    className="register-btn hidden lg:flex "
                  >
                    Create Your Sentry ID
                  </button>
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaulHeader2;
