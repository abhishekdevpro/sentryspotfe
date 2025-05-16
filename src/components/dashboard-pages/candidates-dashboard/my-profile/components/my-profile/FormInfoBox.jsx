


import Select from "react-select";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";


const FormInfoBox = () => {
  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];
  const current = new Date().toISOString().split("T")[0]

  const [logImg, setLogImg] = useState(null);
  const logImgHander = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogImg(URL.createObjectURL(file));
    }
  };

  return (
    <form action="#" className="default-form">
      <div className="row ">

      <div className="form-group col-lg-6 col-md-12 flex justify-center">
       
      <div>
      <div className="rounded-full  border w-32 h-32   flex items-center justify-center">
        <input
          className="uploadButton-input hidden"
          type="file"
          name="attachments[]"
          accept="image/*"
          id="upload"
          required
          onChange={logImgHander}
        />
        <label className="uploadButton-button cursor-pointer flex items-center justify-center" htmlFor="upload">
          {logImg ? (
            <img src={logImg} alt="Uploaded" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="flex flex-col items-center">
              <i className="fas fa-camera text-6xl"></i>
              
              
            </div>
            
          )}
          
        </label>
        
      </div>
      <div className="bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
        Add Picture
      </div>
      </div>
     
    </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12 ">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Jerome" required
          className="border rounded-none" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <input type="text" name="name" placeholder="Gender" required />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry </label>
          <Select
            defaultValue={[catOptions[1]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12 ">
          <label>Phone</label>
          <input
            type="text"
            name="name"
            placeholder="0 123 456 7890"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12 ">
          <label className="text-start">Date of birth</label><br/>
          <input type='date'
      placeholder='Enter BirthDate'
    className="border text-2xl px-40 py-2.5 rounded-lg bg-slate-200 text-center"
      name='birthdate'
      max={current}
      required
    />
        </div>
       
        <div className="form-group col-lg-6 col-md-12">
          <label>Location</label>
          <input type="text" name="name" placeholder="Location" required />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Prefered Location</label>
          <input type="text" name="name" placeholder="Location" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Functional Area</label>
          <input
            type="text"
            name="name"
            placeholder="creativelayers"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Notice Period</label>
          <input
            type="text"
            name="name"
            placeholder="www.jerome.com"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Annual Salary(INR)</label>
          <select className="chosen-single form-select" required>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary(INR)</label>
          <select className="chosen-single form-select" required>
            <option>120-350 K</option>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input type="text" name="name" placeholder="5-10 Years" required />
        </div>

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <select className="chosen-single form-select" required>
            <option>23 - 27 Years</option>
            <option>24 - 28 Years</option>
            <option>25 - 29 Years</option>
            <option>26 - 30 Years</option>
          </select>
        </div>*/}
        

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input type="text" name="name" placeholder="Certificate" required />
        </div>

 
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <input
            type="text"
            name="name"
            placeholder="English, Turkish"
            required
          />
        </div>
        
         <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select className="chosen-single form-select" required>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        */}
        

        {/* <!-- Search Select --> */}
        

        {/* <!-- Input --> */}
       

        {/* <!-- About Company --> */}
       

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one bg-blue-900">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
