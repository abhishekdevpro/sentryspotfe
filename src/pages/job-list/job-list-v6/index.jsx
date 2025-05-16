
import JobList from "@/components/job-listing-pages/job-list-v6";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V6 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const JobListPage6 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage6
