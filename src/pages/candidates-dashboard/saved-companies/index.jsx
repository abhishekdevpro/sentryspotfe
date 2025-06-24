
import SavedCompanies from "@/components/dashboard-pages/candidates-dashboard/saved-companies/index";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Saved Companies || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const JobAlertPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <SavedCompanies />
    </>
  );
};

export default JobAlertPage
