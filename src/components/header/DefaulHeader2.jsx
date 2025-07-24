
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { Constant } from "@/utils/constant/constant";
import logo from "../../../public/company_logo.png";
import { toast } from "react-hot-toast";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  // Move userToken to state to avoid re-reading localStorage on every render
  const [userToken, setUserToken] = useState(() => localStorage.getItem(Constant.USER_TOKEN));
  const [navbar, setNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Update userToken when auth state changes
  useEffect(() => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    setUserToken(token);
  }, []);

  // Handle scroll background change
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Add a small delay to prevent immediate closing after opening
      if (isMobileMenuOpen && 
          !event.target.closest('.mobile-menu-container') && 
          !event.target.closest('.mobile-menu-trigger')) {
        console.log('Clicking outside, closing menu'); // Debug log
        setIsMobileMenuOpen(false);
      }
    };
    
    // Add a small delay before attaching the listener
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    console.log('Mobile menu state changed:', isMobileMenuOpen); // Debug log
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const logoutHandler = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(logout());
      toast.success("Successfully logged out");
      setUserToken(null); // Update local state
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error("Error logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLinkClick = () => {
    // console.log('Link clicked, closing menu'); // Debug log
    setIsMobileMenuOpen(false);
  };

  // Add this function to force toggle
  const toggleMobileMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    // console.log('Toggle called, current state:', isMobileMenuOpen);
    const newState = !isMobileMenuOpen;
    // console.log('Setting new state to:', newState);
    setIsMobileMenuOpen(newState);
    
  };

  return (
    <>
      
      
      
      {/* Header */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          navbar 
            ? "bg-white shadow-lg border-b border-gray-200" 
            : "bg-white/95 backdrop-blur-sm border-b border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-trigger p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors mr-3 touch-manipulation relative z-[1000]"
                aria-label="Toggle mobile menu"
                style={{ zIndex: 1000 }} // Force high z-index
              >
                {isMobileMenuOpen ? (
                  <IoCloseOutline size={24} />
                ) : (
                  <IoMenuOutline size={24} />
                )}
              </button>
              <Link to="/" onClick={handleLinkClick}>
                <img src={logo} alt="Company Logo" className="h-8 sm:h-9 w-auto" />
              </Link>
            </div>

            {/* Desktop Logo & Navigation */}
            <div className="hidden lg:flex items-center flex-1">
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="Company Logo" className="h-10 xl:h-12 w-auto" />
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="ml-8 xl:ml-12">
                <ul className="flex items-center space-x-6 xl:space-x-8">
                  <li>
                    <Link 
                      to="/job-list-v3" 
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/career-advice" 
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1"
                    >
                      Careers & Training
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://employer.sentryspot.co.uk/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1"
                    >
                      Post Job
                    </a>
                  </li>
                  <li>
                    <Link 
                      to="/sentry-spot" 
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1"
                    >
                      AI Services
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/companies-list" 
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/community" 
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1"
                    >
                      Community
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {userToken ? (
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  {/* Desktop Icons */}
                  <div className="hidden lg:flex items-center space-x-3">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <i className="las la-bell text-xl"></i>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <i className="las la-comment text-xl"></i>
                    </button>
                  </div>
                  
                  {/* Dashboard Link */}
                  <Link 
                    to="/candidates-dashboard/dashboard" 
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={handleLinkClick}
                  >
                    <i className="las la-user text-xl"></i>
                  </Link>
                  
                  {/* Logout Button */}
                  <Button
                    className="bg-gray-100 hover:bg-red-500 text-gray-700 hover:text-white p-2 h-auto duration-300 rounded-lg transition-all shadow-sm hover:shadow-md min-w-[40px] touch-manipulation"
                    title="Logout"
                    onClick={logoutHandler}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <IoLogOutOutline size={20} />
                    )}
                  </Button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors bg-blue-50 hover:bg-blue-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base touch-manipulation"
                  onClick={handleLinkClick}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Always render but control visibility */}
      <div 
        className={`fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'z-[998] opacity-100' : 'z-[-1] opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar - Always render but control position */}
      <div
        className={`mobile-menu-container fixed top-0 left-0 w-80 max-w-[85vw] bg-white lg:hidden shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0 z-[999]" : "-translate-x-full z-[999]"
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '20rem',
          maxWidth: '85vw',
          backgroundColor: 'white',
          zIndex: 999,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          // Add these for debugging - keep the red border for now
          // border: '2px solid red',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          // Force visibility when open
          display: 'block',
          scrollbarWidth:'none',
          visibility: isMobileMenuOpen ? 'visible' : 'visible' // Always visible for debugging
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <img src={logo} alt="Company Logo" className="h-8 sm:h-10 w-auto" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation"
              aria-label="Close mobile menu"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-4">
              <Link 
                to="/job-list-v3" 
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                onClick={handleLinkClick}
              >
                <i className="las la-briefcase text-xl mr-3 text-gray-500"></i>
                Jobs
              </Link>
              
              <Link 
                to="/career-advice" 
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                onClick={handleLinkClick}
              >
                <i className="las la-graduation-cap text-xl mr-3 text-gray-500"></i>
                Careers & Training
              </Link>
              
              <a 
                href="https://employer.sentryspot.co.uk/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                onClick={handleLinkClick}
              >
                <i className="las la-plus-circle text-xl mr-3 text-gray-500"></i>
                Post Job
              </a>
              
              <Link 
                to="/sentry-spot" 
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                onClick={handleLinkClick}
              >
                <i className="las la-robot text-xl mr-3 text-gray-500"></i>
                AI Services
              </Link>
              
              <Link 
                to="/companies-list" 
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                onClick={handleLinkClick}
              >
                <i className="las la-building text-xl mr-3 text-gray-500"></i>
                Companies
              </Link>
              
              <Link 
                to="/community" 
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                onClick={handleLinkClick}
              >
                <i className="las la-users text-xl mr-3 text-gray-500"></i>
                Community
              </Link>
              
              {/* User Section for Mobile */}
              {userToken && (
                <>
                  <div className="border-t border-gray-200 my-4"></div>
                  
                  <Link 
                    to="/candidates-dashboard/dashboard" 
                    className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                    onClick={handleLinkClick}
                  >
                    <i className="las la-tachometer-alt text-xl mr-3 text-gray-500"></i>
                    Dashboard
                  </Link>
                  
                  <button
                    onClick={logoutHandler}
                    disabled={isLoggingOut}
                    className="flex items-center w-full text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors touch-manipulation disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent mr-3"></div>
                        Logging out...
                      </>
                    ) : (
                      <>
                        <IoLogOutOutline size={20} className="mr-3" />
                        Logout
                      </>
                    )}
                  </button>
                </>
              )}
              
              {!userToken && (
                <>
                  <div className="border-t border-gray-200 my-4"></div>
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center mx-4  text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors touch-manipulation"
                    onClick={handleLinkClick}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 lg:h-18"></div>
    </>
  );
};

export default DefaulHeader2;