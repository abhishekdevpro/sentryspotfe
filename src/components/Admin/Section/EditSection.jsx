import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../../footer";
import CourseHeader from "../header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSection = () => {
  const { courseid, sectionid } = useParams();
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState({
    section_name: "",
    section_objective: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  useEffect(() => {
    const loadSectionData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/admin/${courseid}/${sectionid}/section`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = response.data.data;
        setSectionData({
          section_name: data.section_name || "",
          section_objective: data.section_objective || "",
        });
      } catch (error) {
        console.error("Error fetching section data:", error);
        toast.error("Failed to load section data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSectionData();
  }, [courseid, sectionid]);

  const handleInputChange = (e) => {
    setSectionData({ ...sectionData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setSectionData({ ...sectionData, section_objective: data });
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `https://api.sentryspot.co.uk/api/admin/${courseid}/${sectionid}/section`,
        sectionData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Section updated successfully:", response.data.data);
      toast.success("Section updated successfully!");

      setTimeout(() => {
        navigate(`/course-details/${courseid}`);
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error("Error updating section:", error);
      toast.error("Failed to update section. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="main-wrapper">
    //   <CourseHeader activeMenu={"EditSection"} />
    //   <section className="page-content course-sec">
    //     <div className="container">
    //       <div className="row align-items-center">
    //         <div className="col-12">
    //           <div className="add-course-header d-flex flex-column flex-md-row justify-content-between align-items-center">
    //             <h2 className="mb-3 mb-md-0">Edit Section</h2>
    //             <div className="add-course-btns">
    //               <ul className="nav">
    //                 <li className="nav-item me-2">
    //                   <Link
    //                     to={`/course-details/${courseid}`}
    //                     className="btn btn-primary w-100 w-md-auto"
    //                   >
    //                     Section-List
    //                   </Link>
    //                 </li>
    //                 <li className="nav-item">
    //                   <Link
    //                     to={`/course-details/${courseid}`}
    //                     className="btn btn-black w-100 w-md-auto"
    //                   >
    //                     Back
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="row">
    //         <div className="col-md-12">
    //           <div className="card">
    //             <div className="widget-set">
    //               <div className="widget-content multistep-form">
    //                 <div className="add-course-info">
    //                   <div className="add-course-inner-header">
    //                     <h4>Section Information</h4>
    //                   </div>
    //                   <div className="add-course-form">
    //                     <form action="#">
    //                       <div className="input-block">
    //                         <label className="add-course-label">
    //                           Section Name
    //                         </label>
    //                         <input
    //                           type="text"
    //                           className="form-control"
    //                           placeholder="Enter section name"
    //                           name="section_name"
    //                           value={sectionData.section_name}
    //                           onChange={handleInputChange}
    //                         />
    //                       </div>
    //                       <div className="input-block mb-0">
    //                         <label className="add-course-label">
    //                           Section Objective
    //                         </label>
    //                         <div id="editor">
    //                           <CKEditor
    //                             editor={ClassicEditor}
    //                             data={sectionData.section_objective}
    //                             onChange={handleEditorChange}
    //                           />
    //                         </div>
    //                       </div>
    //                     </form>
    //                   </div>
    //                   <div className="widget-btn">
    //                     <button
    //                       className="btn btn-info-light"
    //                       onClick={handleSave}
    //                     >
    //                       Save Section
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   <Footer />
    // </div>

    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <CourseHeader activeMenu="EditSection" />

      {/* Page Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Page Title & Navigation */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Section</h2>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link
                to={`/course-details/${courseid}`}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Section List
              </Link>
              <Link
                to={`/course-details/${courseid}`}
                className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900"
              >
                Back
              </Link>
            </div>
          </div>

          {/* Section Form */}
          <div className="mt-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">
                Section Information
              </h4>
              <form>
                {/* Section Name */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">Section Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter section name"
                    name="section_name"
                    value={sectionData.section_name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Section Objective */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Section Objective
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={sectionData.section_objective}
                    onChange={handleEditorChange}
                  />
                </div>
              </form>

              {/* Save Button */}
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Save Section
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EditSection;
