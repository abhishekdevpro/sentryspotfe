import Map from "../../../Map";
import ResumeUpload from "./my-profile/ResumeUpload";

const Certificate = ({ onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    // After successful submission, go to the next tab
    onNext();
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
      Certificate
       
        {/* End MapBox */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save & Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Certificate;
