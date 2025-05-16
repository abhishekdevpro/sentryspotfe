

import Community from "@/components/community";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Candidates List V1 || sentryspot - Job Borad ReactJs Template',
  description:
    'sentryspot - Job Borad ReactJs Template',
  
}


const Communitypage = () => {
  return (
    <>
      
    <MetaComponent meta={metadata} />
      <Community />
    </>
  );
};

export default Communitypage
