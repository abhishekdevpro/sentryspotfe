
import Skilltestlist from "@/components/dashboard-pages/candidates-dashboard/skilltestlist";
import MetaComponent from "@/components/common/MetaComponent";


const metadata = {
  title: "Applied Jobs || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const Skilllistpage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Skilltestlist />
    </>
  );
};

export default Skilllistpage
