import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";
import AllEmployerData from "@/components/dashboard-pages/employers-dashboard/employer";

const metadata = {
  title: "Post Jobs || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const EmployersAllPages = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <AllEmployerData />
    </>
  );
};

export default EmployersAllPages;
