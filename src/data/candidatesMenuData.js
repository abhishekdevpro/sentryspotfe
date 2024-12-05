import { Constant } from "@/utils/constant/constant";

// Retrieve the token from local storage
const token = localStorage.getItem(Constant.USER_TOKEN);

// Define the candidateMenus array with the token added to the "AI Resume Builder" routePath
// const candidateMenus = [
//   {
//     id: 1,
//     name: "Dashboard",
//     icon: "la-home",
//     routePath: "/candidates-dashboard/dashboard",
//     active: "active",
//   },
//   {
//     id: 16,
//     name: "Settings",
//     icon: "la-user-tie",
//     routePath: "/candidates-dashboard/my-profile",
//     active: "",
//   },
//   {
//     id: 3,
//     name: "AI Resume Builder",
//     icon: "la la-robot",
//     routePath: `https://sentryspot-new-rb-fe.vercel.app?${token}`,
//     active: "",
//   },
//   {
//     id: 6,
//     name: "AI skill Test",
//     icon: "la-box",
//     routePath: "/candidates-dashboard/skilltest",
//     active: "",
//   },
//   {
//     id: 7,
//     name: "Skill History",
//     icon: "la la-file-invoice",
//     routePath: "/candidates-dashboard/skilllistpage",
//     active: "",
//   },
//   {
//     id: 5,
//     name: "Applied Jobs",
//     icon: "la-briefcase",
//     routePath: "/candidates-dashboard/applied-jobs",
//     active: "",
//   },
//   {
//     id: 4,
//     name: "Saved Jobs",
//     icon: "la la-heart",
//     routePath: "/candidates-dashboard/job-alerts",
//     active: "",
//   },
//   {
//     id: 8,
//     name: "Communtity",
//     icon: "la la-safari",
//     routePath: "/community",
//     active: "",
//   },
//   {
//     id: 9,
//     name: "Messages",
//     icon: "la-comment-o",
//     routePath: "/candidates-dashboard/messages",
//     active: "",
//   },
//   {
//     id: 10,
//     name: "Notification",
//     icon: "la la-bell",
//     routePath: "",
//     active: "",
//   },
//   // {
//   //   id: 12,
//   //   name: "My Company",
//   //   icon: "las la-copyright",
//   //   routePath: "",
//   //   active: "",
//   // },
//   {
//     id: 11,
//     name: "My Courses",
//     icon: "las la-folder",
//     routePath: "",
//     active: "",
//   },
//   {
//     id: 12,
//     name: "Certifications",
//     icon: "las la-graduation-cap",
//     routePath: "",
//     active: "",
//   },
//   {
//     id: 13,
//     name: "Change Password",
//     icon: "la-lock",
//     routePath: "/candidates-dashboard/change-password",
//     active: "",
//   },
//   {
//     id: 14,
//     name: "Logout",
//     icon: "la-sign-out",
//     routePath: "/login",
//     active: "",
//   },
//   {
//     id: 15,
//     name: "Delete Profile",
//     icon: "la-trash",
//     routePath: "/",
//     active: "",
//   },
// ];
const candidateMenus = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/candidates-dashboard/dashboard",
    active: "active",
  },
 
  {
    id: 3,
    name: "AI Resume Builder",
    icon: "la la-robot",
    routePath: `https://sentryspot-new-rb-fe.vercel.app?${token}`,
    // routePath: `http://localhost:3000/?${token}`,
    active: "",
  },
  {
    id: 4,
    name: "Search Jobs",
    icon: "la-search",
    routePath: "/candidates-dashboard/job-search",
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
    id: 9,
    name: "AI Skill Test",
    icon: "la-box",
    routePath: "/candidates-dashboard/skilllistpage",
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
    routePath: "",
    active: "",
  },
  {
    id: 14,
    name: "Certifications",
    icon: "las la-graduation-cap",
    routePath: "",
    active: "",
  },
  {
    id: 15,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/candidates-dashboard/change-password",
    active: "",
  },
 
  {
    id: 16,
    name: "Settings",
    icon: "la-user-tie",
    routePath: "/candidates-dashboard/my-profile",
    active: "",
  },
  {
    id: 17,
    name: "Contact Us",
    icon: "la-phone",
    routePath: "/",
    active: "",
  },
  {
    id: 18,
    name: "Logout",
    icon: "la-sign-out",
    routePath: "/",
    active: "",
  },
];

export default candidateMenus;
