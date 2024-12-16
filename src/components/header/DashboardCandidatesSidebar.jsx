
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { Constant } from "@/utils/constant/constant";
import { logout } from "@/store/slices/auth";

const DashboardCandidatesSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;
  const navigate = useNavigate()

  const dispatch = useDispatch();

  // Menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Logout handler
  const logoutHandler = () => {
    // localStorage.removeItem(Constant.USER_INFO);
    dispatch(logout())
    navigate('/')
    // window.location.href = "/login";
  };

  const user = JSON.parse(localStorage.getItem(Constant.USER_INFO));

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        {/* Dynamic User Profile */}
        <Link to="/candidates-dashboard/my-profile">
          <div className="flex gap-4 justify-center items-center p-4 border border-gray-200 mb-2 rounded-lg bg-blue-700 text-white">
            <div className="flex-1 h-12 w-12">
              <img
                src="https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1.jpg"
                alt="User Avatar"
                className="rounded-full w-full h-full"
              />
            </div>
            <div className="text-white flex-1 flex-col">
              <p className="text-white">{user?.first_name || "Anonymous"}</p>
              <p className="text-white">{user?.profile || "Profile"}</p>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <ul className="navigation">
          {candidatesuData.map((item) => (
            <>
              <li
                className={`font-bold ${
                  isActiveLink(item.routePath, pathname) ? "active" : ""
                } mb-1`}
                key={item.id}
                onClick={menuToggleHandler}
              >
                <Link to={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
              {item.id === 15 && (
                <div
                  className="my-4 w-full h-1 bg-gray-400"
                  style={{
                    height: "2px", // Adjust thickness
                    backgroundColor: "#333", // Dark gray line
                  }}
                ></div>
              )}
              
            </>
          ))}
          {
                <button
                  className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              }
        </ul>

        {/* Skills Percentage */}
        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>.
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
