import { Link } from "react-router-dom";

const CompanyCard = ({ company, onFollow, isFollowing }) => {
  return (
    <div className="company-card rounded-2xl shadow flex flex-col items-center text-center py-8 px-4 min-h-[230px] bg-white transition-all duration-300 hover:bg-blue-100 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={
          company.logo ||
          "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg"
        }
        alt={company.company_name}
        className="w-16 h-16 object-contain mb-4 rounded"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg";
        }}
      />
      <div className="font-semibold text-lg mb-2 min-h-[48px] flex items-center justify-center text-center w-full">
        {company.company_name}
      </div>

      <div className="flex flex-col gap-2 items-center mt-2">
        <Link
          to={`/showcase-company/${company.id}`}
          className="text-[#f43f5e] font-bold text-base hover:underline"
        >
          View Company
        </Link>
        <button
          onClick={onFollow}
          className={`${
            isFollowing ? "bg-gray-400" : "bg-[#f43f5e]"
          } text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition`}
        >
          {isFollowing ? "Unfollow" : "Follow Company"}
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
