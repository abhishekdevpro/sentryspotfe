// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import employerMenuData from "../../data/employerMenuData";
// import HeaderNavContent from "./HeaderNavContent";
// import { isActiveLink } from "../../utils/linkActiveChecker";
// import logo from "../../../public/company_logo.png";
// import { useLocation } from "react-router-dom";

// const DashboardHeader = () => {
//   const { pathname } = useLocation();
//   const [navbar, setNavbar] = useState(false);

//   const changeBackground = () => {
//     if (window.scrollY >= 0) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", changeBackground);
//   }, []);

//   return (
//     // <!-- Main Header-->
//     <header
//       className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
//     >
//       <div className="container-fluid">
//         {/* <!-- Main box --> */}
//         <div className="main-box">
//           {/* <!--Nav Outer --> */}
//           <div className="nav-outer">
//             <div className="logo-box">
//               <div className="me-10">
//                 <Link to="/">
//                   <img alt="brand" src={logo} className="h-28 w-28" />
//                 </Link>
//               </div>
//             </div>
//             {/* End .logo-box */}

//             {/* <HeaderNavContent /> */}
//             {/* <!-- Main Menu End--> */}
//           </div>
//           {/* End .nav-outer */}

//           <div className="outer-box">
//             <button className="menu-btn">
//               <span className="count">1</span>
//               <span className="icon la la-heart-o"></span>
//             </button>
//             {/* wishlisted menu */}

            
//             <span className="icon la la-bell text-3xl ms-3 text-blue-900"></span>
            
             
//             <i class="las la-comment text-3xl mx-2 text-blue-900"></i>
         
        
//             <i class="las la-user text-3xl text-blue-900"></i>
//             {/* End notification-icon */}

//             {/* <!-- Dashboard Option --> */}
//             {/* <div className="dropdown dashboard-option">
//               <a
//                 className="dropdown-toggle"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <img
//                   alt="avatar"
//                   className="thumb"
//                   src="/images/resource/company-6.png"
//                 />
//                 <span className="name">My Account</span>
//               </a>

//               <ul className="dropdown-menu">
//                 {employerMenuData.map((item) => (
//                   <li
//                     className={`${
//                       isActiveLink(item.routePath, pathname) ? "active" : ""
//                     } mb-1`}
//                     key={item.id}
//                   >
//                     <Link to={item.routePath}>
//                       <i className={`la ${item.icon}`}></i> {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div> */}
//             {/* End dropdown */}
//           </div>
//           {/* End outer-box */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;


import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../public/company_logo.png";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { IoLogOutOutline, IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";
import { Bell } from "lucide-react";
import { logout } from "@/store/slices/authSlice";

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate()

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#user-dropdown")) {
        setIsOpen(false);
      }
      if (!event.target.closest("#notification-dropdown")) {
        setIsNotificationModalOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );
  const [navbar, setNavbar] = useState(false);
   const adminToken = localStorage.getItem("adminToken")
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/employeer/notifications"
      );

      if (response.data.status === "status" || response.data.code === 200) {
        // console.log(response.data.data,"notiii");
        setNotifications(response.data.data || []);
        setNotificationCount(response.data.data?.length || 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      // year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  };
  //  console.log(notifications,"notiii");
  return (
    <header
      className={`main-header header-shadow ${navbar ? "fixed-header" : ""}`}
    >
      <div className="header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="header-logo flex items-center">
              <a href="/">
                <img src={logo} alt="Company Logo" className="h-10 w-auto" />
              </a>
              {/* <div className="main-menu ms-4 hidden md:flex">
                <ul className="flex space-x-4">
                  <li>
                    <a href="" className="text-gray-700 hover:text-blue-600">
                      AI Services
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-gray-700 hover:text-blue-600">
                      Hiring Advice
                    </a>
                  </li>
                  <li>
                    <a
                      href="/job-list-v7#tab2"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Companies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/job-list-v3"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Jobs
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="side-menu flex items-center">
              <div id="notification-dropdown" className="relative">
                <div
                  className="icon la la-bell hidden md:block text-3xl text-blue-900 cursor-pointer "
                  onClick={handleNotificationClick}
                >
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </div>
                {isNotificationModalOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 px-4 py-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Recent Notifications
                    </h3>
                    {notifications.length > 0 ? (
                      <ul className="space-y-3">
                        {notifications
                          .slice(0, 5)
                          .map((notification, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer"
                            >
                              <div className="text-blue-600 flex-shrink-0">
                                <Bell className="h-6 w-6" />
                              </div>
                              <div className="flex-grow ">
                                <div className="text-sm text-start font-medium text-gray-700">
                                  {notification.message}
                                </div>
                                <div className="text-xs text-start text-gray-500 mt-1">
                                  {formatDate(notification.created_at)}
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 text-center">
                        No recent notifications
                      </p>
                    )}
                    <div className="mt-4 text-center">
                      <Link
                        to="/candidates-dashboard/notifications"
                        className="inline-block text-blue-600 text-sm font-medium hover:underline"
                        onClick={() => setIsNotificationModalOpen(false)}
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <i className="las la-comment hidden md:block text-3xl mx-4 text-blue-900"></i>

              <div id="user-dropdown" className="">
                <i
                  className="las la-user md:hidden text-3xl text-blue-900 me-3 flex items-center focus:outline-none cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                ></i>

                {/* {isOpen && (
                  <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-left">
                    <ul className="py-2 text-sm text-gray-700 ">
                      <li>
                        <Link
                          to={`/candidates-dashboard/my-profile`}
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Profile
                        </Link>
                      </li>
                     
                      <li>
                        <Link
                          to={'/candidates-dashboard/job-alerts'}
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Saved Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/candidates-dashboard/applied-jobs'}
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Applied Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/job-list-v7#tab2'}
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Companies
                        </Link>
                      </li>
                     
                      <li>
                        <Link
                          to={"/candidates-dashboard/my-profile"}
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Settings
                        </Link>
                      </li>
                    
                    </ul>
                  </div>
                )}  */}
              </div>
              <div className="btn-box">
                {adminToken ? (
                  <Button
                    className="bg-gray-500 p-2 duration-500 hover:bg-[#E60278] flex items-center"
                    title="logout"
                   
                    onClick={logoutHandler}
                  >
                    <IoLogOutOutline size={24} />
                  </Button>
                ) : (
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#loginPopupModal"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Sign in
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
