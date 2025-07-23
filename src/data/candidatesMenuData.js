import { Constant } from "@/utils/constant/constant";

// Retrieve the token from local storage
const token = localStorage.getItem(Constant.USER_TOKEN);
// console.log(token,"token value");

const candidateMenus = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/candidates-dashboard/dashboard",
    active: "active",
  },
  {
    id: 1,
    name: "My Profile",
    icon: "la-user",
    routePath: "/candidates-dashboard/my-profile",
    active: "active",
  },
  {
    id: 1,
    name: "upload Documents",
    icon: "la-file-upload",
    routePath: "/candidates-dashboard/upload-documents",
    active: "active",
  },

  {
    id: 3,
    name: "AI Resume Builder",
    icon: "la la-robot",
    routePath: `https://airesume.sentryspot.co.uk?${token}`,
    // routePath: `http://localhost:3000/?${token}`,
    active: "",
  },
  {
    id: 4,
    name: "Search Jobs",
    icon: "la-search",
    // routePath: "/candidates-dashboard/job-search",
    routePath: "/job-list-v3",
    active: "",
  },
  {
    id: 5,
    name: "Saved Jobs",
    icon: "la-heart",
    routePath: "/candidates-dashboard/job-alerts",
    active: "",
  },
  {
    id: 5,
    name: "Applied Jobs",
    icon: "la-briefcase",
    routePath: "/candidates-dashboard/applied-jobs",
    active: "",
  },
  {
    id: 5,
    name: "Saved Companies",
    icon: "las la-bookmark",
    routePath: "/candidates-dashboard/saved-companies",
    active: "",
  },
  {
    id: 9,
    name: "AI Skill Test",
    icon: "la-box",
    routePath: "/candidates-dashboard/skilllistpage",
    active: "",
  },
   {
    id: 9,
    name: "Add Referral",
     icon: "la-user-plus",
    routePath: "/candidates-dashboard/add-referral",
    active: "",
  },
  {
    id: 4,
    name: "Skill Test History",
    icon: "la-file-invoice",
    routePath: "/candidates-dashboard/skill-test-history",
    active: "",
  },
  {
    id: 7,
    name: "Community",
    icon: "la-safari",
    routePath: "/community",
    active: "",
  },
  {
    id: 10,
    name: "Messages",
    icon: "la-comment-o",
    routePath: "/candidates-dashboard/messages",
    active: "",
  },
  {
    id: 11,
    name: "Notifications",
    icon: "la-bell",
    routePath: "/candidates-dashboard/notifications",
    active: "",
  },
  {
    id: 13,
    name: "My Courses",
    icon: "las la-folder",
    routePath: "/courses",
    active: "",
  },
  {
    id: 14,
    name: "Saved Courses",
    icon: "las la-bookmark",
    routePath: "/candidates-dashboard/saved-courses",
    active: "",
  },
  // {
  //   id: 14,
  //   name: "Certifications",
  //   icon: "las la-graduation-cap",
  //   routePath: "",
  //   active: "",
  // },
  // {
  //   id: 15,
  //   name: "Change Password",
  //   icon: "la-lock",
  //   routePath: "/candidates-dashboard/change-password",
  //   active: "",
  // },
 
  // {
  //   id: 16,
  //   name: "Settings",
  //   icon: "la-user-tie",
  //   routePath: "/candidates-dashboard/my-profile",
  //   active: "",
  // },
  // {
  //   id: 17,
  //   name: "Contact Us",
  //   icon: "la-phone",
  //   routePath: "/",
  //   active: "",
  // },
  // {
  //   id: 18,
  //   name: "Logout",
  //   icon: "la-sign-out",
  //   // routePath: "/",
  //   active: "",
  // },
];

export default candidateMenus;
