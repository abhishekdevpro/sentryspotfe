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
import { IoMenuOutline } from "react-icons/io5";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  // const { userToken } = useSelector((state) => state.auth);
  const userToken = localStorage.getItem(Constant.USER_TOKEN);
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
              <ul className="flex flex-wrap justify-center md:justify-start">
                <li className="px-2">
                  <a href="/job-list-v3" className="flex items-center gap-1">
                    <i className="fa-solid fa-compass"></i> Jobs
                  </a>
                </li>
                <li className="px-2">
                  <a href="" className="flex items-center gap-1">
                    <i className="fa-solid fa-medal"></i> Careers & Training
                  </a>
                </li>
                <li className="border-l-2 mx-2"></li>
                <li className="px-2">
                  <a href="https://employer.sentryspot.co.uk/" className="flex items-center gap-1">
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
        } transition-all duration-300 fixed w-full top-0 z-50`}
      >
        <div className="flex justify-between items-center p-2 max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-blue-900"
            >
              <IoMenuOutline size={24} />
            </button>
            <Link to="/" className="ml-2">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
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
                      <a href="/sentry-spot" className="hover:text-blue-600">AI Services</a>
                    </li>
                    <li>
                      <a href="https://blog.sentryspot.co.uk/category/job-search-strategies/" className="hover:text-blue-600">
                        Hiring Advice
                      </a>
                    </li>
                    <li>
                      <a href="/companies-list" className="hover:text-blue-600">Companies</a>
                    </li>
                    <li>
                      <a href="/community" className="hover:text-blue-600">Community</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Side Menu */}
          <div className="flex items-center">
            {userToken ? (
              <div className="flex items-center gap-2">
                <span className="icon la la-bell hidden md:block text-2xl text-blue-900"></span>
                <i className="las la-comment hidden md:block text-2xl text-blue-900"></i>
                <Link to={"/candidates-dashboard/dashboard"} className="text-2xl text-blue-900">
                  <i className="las la-user"></i>
                </Link>
                <Button
                  className="bg-gray-500 p-2 duration-500 hover:bg-[#E60278]"
                  title="logout"
                  onClick={logoutHandler}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <IoLogOutOutline size={20} />
                  )}
                </Button>
              </div>
            ) : (
              <Link to="/login" className="text-blue-900 hover:text-blue-600">
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-blue-900"
              >
                <IoLogOutOutline size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              <a href="/sentry-spot" className="block text-lg py-2 hover:text-blue-600">AI Services</a>
              <a href="https://blog.sentryspot.co.uk/category/job-search-strategies/" className="block text-lg py-2 hover:text-blue-600">
                Hiring Advice
              </a>
              <a href="/companies-list" className="block text-lg py-2 hover:text-blue-600">Companies</a>
              <a href="/community" className="block text-lg py-2 hover:text-blue-600">Community</a>
              {userToken && (
                <div className="pt-4 border-t">
                  <Link to={"/candidates-dashboard/dashboard"} className="block text-lg py-2 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block text-lg py-2 text-red-600 hover:text-red-700 w-full text-left"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
      {/* Add padding to prevent content from hiding under fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default DefaulHeader2;
