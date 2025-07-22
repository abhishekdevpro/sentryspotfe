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
import { IoIosArrowDown } from "react-icons/io";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  // const { userToken } = useSelector((state) => state.auth);
  const userToken = localStorage.getItem(Constant.USER_TOKEN);
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
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
      <div className="TopHeader bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2.5">
        <div className="container mx-auto px-4">
          <div className="TopMenu">
            <ul className="flex flex-wrap justify-center md:justify-start items-center">
              <li className="px-4">
                <Link 
                  to="/job-list-v3" 
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  <i className="fa-solid fa-compass text-blue-300"></i> 
                  Jobs
                </Link>
              </li>
              <li className="px-4">
                <Link 
                  to="/career-advice" 
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  <i className="fa-solid fa-medal text-blue-300"></i> 
                  Careers & Training
                </Link>
              </li>
              <li className="border-l border-blue-700/50 mx-2 h-4"></li>
              <li className="px-4">
                <a 
                  href="https://employer.sentryspot.co.uk/" 
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  <i className="fa-solid fa-user text-blue-300"></i> 
                  Post Job
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`header ${
          navbar ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        } transition-all duration-300 fixed w-full top-0 z-50`}
      >
        <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <IoMenuOutline size={24} />
            </button>
            <Link to="/" className="ml-3">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Main Menu for Desktop View */}
          <div className="hidden md:flex items-center w-full">
            <div className="header-menu flex items-center justify-between w-full">
              <div className="header-logo flex items-center">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-10 w-auto"
                  />
                </Link>
                <div className="main-menu ml-8">
                  <ul className="flex space-x-6">
                    <li>
                      <Link to="/job-list-v3" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                        Jobs
                      </Link>
                    </li>
                    <li>
                      <Link to="/career-advice" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                        Careers & Training
                      </Link>
                    </li>
                    <li>
                      <a href="https://employer.sentryspot.co.uk/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                        Post Job
                      </a>
                    </li>
                    <li>
                      <Link to="/sentry-spot" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                        AI Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/companies-list" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link to="/community" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                        Community
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Side Menu */}
              <div className="flex items-center space-x-4">
                {userToken ? (
                  <div className="flex items-center gap-4">
                    <span className="icon la la-bell hidden md:block text-xl text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"></span>
                    <i className="las la-comment hidden md:block text-xl text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"></i>
                    <Link to={"/candidates-dashboard/dashboard"} className="text-xl text-gray-600 hover:text-blue-600 transition-colors">
                      <i className="las la-user"></i>
                    </Link>
                    <Button
                      className="bg-gray-100 hover:bg-[#E60278] text-gray-700 hover:text-white p-2 duration-300 rounded-lg transition-all shadow-sm hover:shadow-md"
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
                  <Link 
                    to="/login" 
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-lg text-sm"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoLogOutOutline size={24} />
              </button>
            </div>
            <nav className="space-y-6">
              <a href="/sentry-spot" className="block text-lg py-2 text-gray-700 hover:text-blue-600 font-medium">AI Services</a>
              <a href="https://blog.sentryspot.co.uk/category/job-search-strategies/" className="block text-lg py-2 text-gray-700 hover:text-blue-600 font-medium">
                Hiring Advice
              </a>
              <a href="/companies-list" className="block text-lg py-2 text-gray-700 hover:text-blue-600 font-medium">Companies</a>
              <a href="/community" className="block text-lg py-2 text-gray-700 hover:text-blue-600 font-medium">Community</a>
              {userToken && (
                <div className="pt-6 border-t border-gray-200">
                  <Link to={"/candidates-dashboard/dashboard"} className="block text-lg py-2 text-gray-700 hover:text-blue-600 font-medium">
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block text-lg py-2 text-red-600 hover:text-red-700 w-full text-left font-medium"
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
   
    </>
  );
};

export default DefaulHeader2;
