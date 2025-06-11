import { Link } from "react-router-dom";
import jobs from "../../../data/job-featured";

const RelatedJobs2 = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {jobs.slice(20, 24).map((item) => (
        <div
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          key={item.id}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img
                  src={item.logo}
                  alt={item.company}
                  className="w-10 h-10 rounded-lg border"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-600">{item.company}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {item.jobType.map((val, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full ${
                          val.styleClass === "green"
                            ? "bg-green-100 text-green-600"
                            : val.styleClass === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {val.type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={`/job-single-v3/${item.id}`}
              className="block text-lg font-semibold text-gray-800 hover:text-[#e63946] mb-2 line-clamp-2"
            >
              {item.jobTitle}
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="flaticon-map-locator text-[#e63946]" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            {item.salary && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <i className="flaticon-money text-[#e63946]" />
                <span>{item.salary}</span>
              </div>
            )}
            {item.postedDate && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <i className="flaticon-calendar text-[#e63946]" />
                <span>Posted {item.postedDate}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedJobs2;
