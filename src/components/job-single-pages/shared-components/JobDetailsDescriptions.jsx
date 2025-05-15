const JobDetailsDescriptions = (jobData) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>
       {jobData?.job_description}
      </p>
    
    </div>
  );
};

export default JobDetailsDescriptions;
