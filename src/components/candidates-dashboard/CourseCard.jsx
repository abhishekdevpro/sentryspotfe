// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Heart, HeartIcon } from "lucide-react";

// const CourseCard = ({ course, onSave, onEnroll, isSaving, isEnrolling }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/courses/${course.id}`)}
//       className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg"
//     >
//       {/* Course Banner */}
//       <img
//         src={
//           course.course_banner_image?.startsWith("http")
//             ? course.course_banner_image
//             : `https://api.sentryspot.co.uk${course.course_banner_image}`
//         }
//         alt={course.course_title}
//         className="w-full h-40 object-cover bg-gray-100"
//       />

//       {/* Instructor and Heart Icon */}
//       <div className="flex items-center gap-4 px-4 pt-4">
//         <img
//           src={
//             course.trainer_photo?.startsWith("http")
//               ? course.trainer_photo
//               : `https://api.sentryspot.co.uk${course.trainer_photo}`
//           }
//           alt={course.trainer_display_name}
//           className="w-12 h-12 rounded-full object-cover border border-gray-200"
//         />
//         <div className="flex-1">
//           <div className="font-semibold text-base">
//             {course.trainer_display_name || "Trained Professional"}
//           </div>
//           <div className="text-sm text-gray-500">Instructor</div>
//         </div>
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//             onSave(course.id);
//           }}
//           className={`text-xl transition-transform ${
//             isSaving ? "opacity-50" : "hover:scale-110"
//           }`}
//         >
//           {course.is_course_favorite ? (
//             <Heart className="text-red-600 w-5 h-5 fill-red-600" />
//           ) : (
//             <HeartIcon className="text-gray-400 w-5 h-5" />
//           )}
//         </div>
//       </div>

//       {/* Course Title */}
//       <div className="px-4 pt-2 text-lg font-bold">{course.course_title}</div>

//       {/* Stats */}
//       <div className="flex items-center gap-4 text-sm text-gray-600 px-4 pt-1">
//         <span>👥 {course.enrolled_jobseeker_count || 0} Users</span>
//         <span>⏰ {course.time_spent_on_course || 20} hrs</span>
//       </div>

//       {/* Pricing */}
//       <div className="px-4 pt-2 pb-1 flex items-center gap-2">
//         <span className="text-xl font-bold text-red-600">
//           £
//           {course.after_discount_price &&
//           course.after_discount_price !== course.course_price
//             ? course.after_discount_price
//             : course?.course_price}
//         </span>
//         {course.after_discount_price &&
//           course.after_discount_price !== course.course_price && (
//             <span className="text-gray-400 line-through">
//               £{course.course_price}
//             </span>
//           )}
//       </div>

//       {/* Enroll Button */}
//       <div className="px-4 pb-4 mt-auto">
//         <Button
//           onClick={(e) => {
//             e.stopPropagation();
//             onEnroll(course.id, e);
//           }}
//           variant={course.is_enrolled ? "success" : "destructive"}
//           disabled={isEnrolling || course.is_enrolled}
//           className={`w-full`}
//         >
//           {isEnrolling
//             ? "Enrolling..."
//             : course.is_enrolled
//             ? "Enrolled"
//             : "Enroll Now"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Heart, HeartIcon } from "lucide-react";

const CourseCard = ({ course, onSave, onEnroll, isSaving, isEnrolling }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg"
    >
      {/* Course Banner */}
      <img
        src={
          course.course_banner_image?.startsWith("http")
            ? course.course_banner_image
            : `https://api.sentryspot.co.uk${course.course_banner_image}`
        }
        alt={course.course_title}
        className="w-full h-40 object-cover bg-gray-100"
      />

      {/* Instructor and Heart Icon */}
      <div className="flex items-center gap-4 px-4 pt-4">
        <img
          src={
            course.trainer_photo?.startsWith("http")
              ? course.trainer_photo
              : `https://api.sentryspot.co.uk${course.trainer_photo}`
          }
          alt={course.trainer_display_name}
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1">
          <div className="font-semibold text-base">
            {course.trainer_display_name || "Trained Professional"}
          </div>
          <div className="text-sm text-gray-500">Instructor</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(course.id, e); // Pass the event to the handler
          }}
          disabled={isSaving}
          className={`text-xl transition-transform p-1 rounded ${
            isSaving ? "opacity-50 cursor-not-allowed" : "hover:scale-110 cursor-pointer"
          }`}
          aria-label={course.is_course_favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {course.is_course_favorite ? (
            <Heart className="text-red-600 w-5 h-5 fill-red-600" />
          ) : (
            <HeartIcon className="text-gray-400 w-5 h-5 hover:text-red-400" />
          )}
        </button>
      </div>

      {/* Course Title */}
      <div className="px-4 pt-2 text-lg font-bold">{course.course_title}</div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 px-4 pt-1">
        <span>👥 {course.enrolled_jobseeker_count || 0} Users</span>
        <span>⏰ {course.time_spent_on_course || 20} hrs</span>
      </div>

      {/* Pricing */}
      <div className="px-4 pt-2 pb-1 flex items-center gap-2">
        <span className="text-xl font-bold text-red-600">
          £
          {course.after_discount_price &&
          course.after_discount_price !== course.course_price
            ? course.after_discount_price
            : course?.course_price}
        </span>
        {course.after_discount_price &&
          course.after_discount_price !== course.course_price && (
            <span className="text-gray-400 line-through">
              £{course.course_price}
            </span>
          )}
      </div>

      {/* Enroll Button */}
      <div className="px-4 pb-4 mt-auto">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onEnroll(course.id, e);
          }}
          variant={course.is_enrolled ? "success" : "destructive"}
          disabled={isEnrolling || course.is_enrolled}
          className={`w-full`}
        >
          {isEnrolling
            ? "Enrolling..."
            : course.is_enrolled
            ? "Enrolled"
            : "Enroll Now"}
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
