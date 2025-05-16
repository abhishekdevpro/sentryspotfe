import GalleryBox from "./GalleryBox";

const JobDetailsDescriptions = (employer) => {
  console.log(employer)
  return (
    <div className="job-detail">
      <h4>About Company</h4>
      <p>
       {employer.employer?.about}
      </p>
      <p>
      {employer.employer?.summery}
      </p>
      <div className="row images-outer">
        <GalleryBox />
      </div>
      
    </div>
  );
};

export default JobDetailsDescriptions;
