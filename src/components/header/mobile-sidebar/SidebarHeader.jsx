
import { Link } from "react-router-dom";
import logo from "../../../Images/logo.png"
const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link to="/">
        <img  src={logo} alt="brand" />
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
