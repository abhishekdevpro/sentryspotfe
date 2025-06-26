// import { Link } from "react-router-dom";
// import jobs from "../../../data/job-featured";

// const RelatedJobs2 = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {jobs.slice(20, 24).map((item) => (
//         <div
//           className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
//           key={item.id}
//         >
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center gap-2">
//                 <img
//                   src={item.logo}
//                   alt={item.company}
//                   className="w-10 h-10 rounded-lg border"
//                 />
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-600">{item.company}</h4>
//                   <div className="flex items-center gap-2 mt-1">
//                     {item.jobType.map((val, i) => (
//                       <span
//                         key={i}
//                         className={`text-xs px-2 py-1 rounded-full ${
//                           val.styleClass === "green"
//                             ? "bg-green-100 text-green-600"
//                             : val.styleClass === "blue"
//                             ? "bg-blue-100 text-blue-600"
//                             : "bg-orange-100 text-orange-600"
//                         }`}
//                       >
//                         {val.type}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to={`/job-single-v3/${item.id}`}
//               className="block text-lg font-semibold text-gray-800 hover:text-[#e63946] mb-2 line-clamp-2"
//             >
//               {item.jobTitle}
//             </Link>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <i className="flaticon-map-locator text-[#e63946]" />
//               <span className="line-clamp-1">{item.location}</span>
//             </div>
//             {item.salary && (
//               <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
//                 <i className="flaticon-money text-[#e63946]" />
//                 <span>{item.salary}</span>
//               </div>
//             )}
//             {item.postedDate && (
//               <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
//                 <i className="flaticon-calendar text-[#e63946]" />
//                 <span>Posted {item.postedDate}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RelatedJobs2;


import { Link } from "react-router-dom";
import jobs from "../../../data/job-featured";
import JobCard from "@/components/job-listing-pages/job-list-v3/JobCard";

const RelatedJobs2 = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {jobs.slice(20, 24).map((item) => (
        // <div
        //   key={item.id}
        //   className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
        // >
        //   <div className="p-5 space-y-4">
        //     {/* Header: Logo & Company */}
        //     <div className="flex items-center gap-4">
        //       <img
        //         src={item.logo}
        //         alt={item.company}
        //         className="w-12 h-12 rounded-xl border border-blue-100 object-cover"
        //       />
        //       <div className="flex flex-col">
        //         <span className="text-sm font-semibold text-blue-900">{item.company}</span>
        //         <div className="flex flex-wrap gap-1 mt-1">
        //           {item.jobType.map((val, i) => (
        //             <span
        //               key={i}
        //               className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        //                 val.styleClass === "green"
        //                   ? "bg-green-100 text-green-600"
        //                   : val.styleClass === "blue"
        //                   ? "bg-blue-100 text-blue-600"
        //                   : "bg-orange-100 text-orange-600"
        //               }`}
        //             >
        //               {val.type}
        //             </span>
        //           ))}
        //         </div>
        //       </div>
        //     </div>

        //     {/* Job Title */}
        //     <Link
        //       to={`/job-single-v3/${item.id}`}
        //       className="block text-base font-bold text-blue-900 group-hover:text-blue-700 transition-colors line-clamp-2"
        //     >
        //       {item.jobTitle}
        //     </Link>

        //     {/* Location */}
        //     <div className="flex items-center gap-2 text-sm text-gray-600">
        //       <i className="flaticon-map-locator text-blue-900" />
        //       <span className="line-clamp-1">{item.location}</span>
        //     </div>

        //     {/* Salary */}
        //     {item.salary && (
        //       <div className="flex items-center gap-2 text-sm text-gray-600">
        //         <i className="flaticon-money text-blue-900" />
        //         <span>{item.salary}</span>
        //       </div>
        //     )}

        //     {/* Posted Date */}
        //     {item.postedDate && (
        //       <div className="flex items-center gap-2 text-sm text-gray-500">
        //         <i className="flaticon-calendar text-blue-900" />
        //         <span>Posted {item.postedDate}</span>
        //       </div>
        //     )}
        //   </div>
        // </div>
        <JobCard
                          key={item.id}
                          job={item}
                          // onSaveJob={() => saveJob(job.id)}
                          // onApplyJob={() => applyToJob(job.id)}
                          // actionStatus={actionStatus}
                          showApplyButton={false}
                          showSaveButton={false}
                        />
      ))}
    </div>
  );
};

export default RelatedJobs2;
