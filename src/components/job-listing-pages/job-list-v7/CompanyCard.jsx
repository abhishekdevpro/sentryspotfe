import { Button } from "@/components/ui/button";
import { Constant } from "@/utils/constant/constant";
import { Link, useNavigate } from "react-router-dom";

const CompanyCard = ({ company, onFollow, isFollowing }) => {
    const token = localStorage.getItem(Constant.USER_TOKEN)
    const navigate = useNavigate()
  return (
    <div className="rounded-2xl shadow flex flex-col gap-2 items-center text-center py-4 px-4 bg-blue-50 transition-all duration-300 hover:bg-blue-100 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={
          company.logo ||
          "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg"
        }
        alt={company.company_name}
        className="w-full h-20 object-contain rounded"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg";
        }}
      />
      <div className="app-text-h3">
        {company?.company_name || "Not available"}
      </div>

      <div className="w-full flex flex-col gap-2 items-center">
        <Button
        onClick={()=>navigate(`/showcase-company/${company.id}`)}
          variant="link"
          className="w-full"
        >
          View Company
        </Button>
       {token && 
       <Button
          onClick={onFollow}
           variant={isFollowing ? "destructive" : "default"}
          className="w-full"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>}
      </div>
    </div>
  );
};

export default CompanyCard;
