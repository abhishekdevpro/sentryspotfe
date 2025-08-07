import { Link } from "react-router-dom";
// import jobs from "../../../data/job-featured";
import JobCard from "@/components/job-listing-pages/job-list-v3/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const RelatedJobs2 = () => {
  const [jobs,setJobs] = useState([])

  const fetchJobs= async ()=>{
     try {
       const res = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/public/job-list")
       if(res.data.status === "success" || res.data.code ===200){
        setJobs(res.data.data || [])
       }
     } catch (error) {
       console.log(error)
     }
  }
  useEffect(()=>{
    fetchJobs()
  },[])
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {jobs.slice(0,4).map((item) => (
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
