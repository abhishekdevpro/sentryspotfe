import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import ApplyJobPopup from "./ApplyJobPopup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Companieslist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);






  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
      

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/companies`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
       setJobCount(response.data.data.length);
        setJobs(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  const savejob = async(jobId)=>{
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
       
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Your job successfully Saved!');
      } else {
        toast.error('Failed to job  the job. Please try again.');
      }
    } catch (error) {
      toast.error('Error Saving  job:', error);
      toast.error('An error occurred while saving for the job. Please try again.');
    }
  };
  



  const handleApplyNowClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-6  min-h-screen flex">
      {/* Sidebar */}
     

      {/* Job List */}
      <main className="flex-1 pl-6">
      <div className="flex justify-between px-5 my-3">

      <p className="text-lg  text-gray-800 mb-4">
        Show {jobCount} {jobCount === 1 ? 'Job' : 'Jobs'} 
      </p>

    
      </div>

        <ul className="px-16">
          {jobs.map((job) => (
            <div
            className="job-block-four "
            key={job.id}
          >
            <div className="inner-box text-start ps-5 p-0">
              <span className="flex align-middle">
                <img
                  src={job.logo || "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717372800&semt=ais_user"}
                  alt="featured job"
                  className="absolute -left-10 top-7 rounded-xl border-2 p-1 h-20 w-20 bg-black"
                />
                <h4 className="pt-8 ps-2 flex justify-between w-full">
                  {console.log(job.job_title, "data")}
                  <Link to={`/employers-single-v1/${job.id}`}>{job.company_name}</Link>
                {/*  <div className="absolute right-0 text-sm">
                    <button className=" p-1 px-2 border-blue-800 rounded-full me-2 " onClick={handleApplyNowClick} >
                      <i className="fas fa-bookmark text-blue-900 "></i> Apply
                    </button>
                    <button className=" p-1 px-2 border-blue-800 rounded-full me-2" onClick={() => savejob(job.id)}>
                      <i className="fas fa-heart text-blue-900"></i> Save
                    </button>
                  </div> */}
                </h4>
              </span>
              {showPopup && (
        <ApplyJobPopup jobId={job.id} token={token} onClose={handleClosePopup} />
      )}

<div className="location">
                <span className="icon flaticon-briefcase"></span>
                {job.company_industry.name}
              </div> {" "}
              <div className="location">
                <span className="icon flaticon-map-locator"></span>
                {job.country.name}, {job.state.name},  {job.city.name}
              </div>
             
    
              <div className="flex">
                <ul className="post-tags text-start">
                  <li className="border">
                    <a href="#">Company Type: {job.company_type.name || "software"}</a>
                  </li>
                  <li className="border">
                    <a href="#">Company Size: {job.company_size.range}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          ))}
        </ul>
      </main>
    </div>
  );
};


export default Companieslist;
