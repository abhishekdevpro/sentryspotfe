import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../../footer";
import CourseHeader from "../header";
import LectureItem from "../Lecture/LectureItem";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import styled from "styled-components";

const CourseTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    margin: 0;

    li {
      list-style: none;

      .btn {
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 4px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;

        &.btn-secondary {
          background-color: #6c757d;
          color: white;
          &:hover {
            background-color: #5a6268;
          }
        }

        &.btn-primary {
          background-color: #007bff;
          color: white;
          &:hover {
            background-color: #0069d9;
          }
        }

        &.btn-black {
          background-color: #333;
          color: white;
          &:hover {
            background-color: #222;
          }
        }

        .feather {
          margin-right: 8px;
        }

        @media (max-width: 576px) {
          padding: 6px 10px;
          min-width: auto;

          .feather {
            margin-right: 0;
          }

          span {
            display: none;
          }
        }
      }
    }
  }
`;

const HeaderWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 576px) {
    padding: 15px;
  }
`;

const SectionItem = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionHeader = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  h5 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const SectionContent = styled.div`
  padding: 15px;

  h6 {
    margin-bottom: 10px;
    color: #555;
  }

  .lecture-list {
    list-style-type: none;
    padding: 0;
  }

  .btn {
    margin-top: 10px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #555;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionsList = () => {
  const { id } = useParams();
  const [sections, setSections] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [expandedSectionId, setExpandedSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const trainerToken = localStorage.getItem("trainerToken");
  const vendorToken = localStorage.getItem("vendorToken");
  const adminToken = localStorage.getItem("adminToken");

  let role = trainerToken
    ? "instructor"
    : vendorToken
    ? "vendor"
    : adminToken
    ? "admin"
    : null;

  if (!role) {
    throw new Error("No valid token found for authentication");
  }

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.novajobs.us/api/students/course-details/${id}`
      );
      setSections(response.data.data.section_response || []);
      setCourseTitle(response.data.data.course_title);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sections:", error);
      setError("Failed to fetch course details. Please try again later.");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const toggleSection = (sectionId) => {
    setExpandedSectionId(expandedSectionId === sectionId ? null : sectionId);
  };

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    // <div className="main-wrapper">
    //   <CourseHeader activeMenu={"SectionsList"} />

    //   <section className="page-content course-sec">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-12">
    //           <HeaderWrapper>
    //             <CourseTitle>{courseTitle || "Course"}</CourseTitle>
    //             <ButtonGroup>
    //               <ul className="nav">
    //                 <li>
    //                   <Link
    //                     to={`/edit-course/${id}`}
    //                     className="btn btn-secondary"
    //                   >
    //                     <FeatherIcon icon="edit" className="feather" />
    //                     <span>Edit Course</span>
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link
    //                     to={`/add-section/${id}`}
    //                     className="btn btn-primary"
    //                   >
    //                     <FeatherIcon icon="plus-circle" className="feather" />
    //                     <span>Add New Section</span>
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link
    //                     to={`/${role}/${role}-dashboard`}
    //                     className="btn btn-black"
    //                   >
    //                     <FeatherIcon icon="arrow-left" className="feather" />
    //                     <span>Back</span>
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </ButtonGroup>
    //           </HeaderWrapper>
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col-12">
    //           <div className="card">
    //             <div className="card-body">
    //               {sections.length === 0 ? (
    //                 <div className="no-content">
    //                   <p>No sections available for this course.</p>
    //                   <Link
    //                     to={`/add-section/${id}`}
    //                     className="btn btn-primary"
    //                   >
    //                     Add New Section
    //                   </Link>
    //                 </div>
    //               ) : (
    //                 sections.map((section) => (
    //                   <SectionItem key={section.id}>
    //                     <SectionHeader
    //                       onClick={() => toggleSection(section.id)}
    //                     >
    //                       <h5>{section.section_name}</h5>
    //                       <div className="button-group">
    //                         <Link
    //                           to={`/edit-section/${id}/${section.id}`}
    //                           className="btn btn-sm btn-warning"
    //                         >
    //                           <FeatherIcon icon="edit" className="me-2" />
    //                           <span>Edit</span>
    //                         </Link>
    //                         <button
    //                           className="btn btn-sm btn-info"
    //                           onClick={(e) => {
    //                             e.stopPropagation();
    //                             toggleSection(section.id);
    //                           }}
    //                         >
    //                           {expandedSectionId === section.id ? (
    //                             <>
    //                               <FeatherIcon
    //                                 icon="x-circle"
    //                                 className="me-2"
    //                               />
    //                               <span>Close</span>
    //                             </>
    //                           ) : (
    //                             <>
    //                               <FeatherIcon icon="eye" className="me-2" />
    //                               <span>View</span>
    //                             </>
    //                           )}
    //                         </button>
    //                       </div>
    //                     </SectionHeader>
    //                     {expandedSectionId === section.id && (
    //                       <SectionContent>
    //                         <h6>Lectures:</h6>
    //                         {section.lectures && section.lectures.length > 0 ? (
    //                           <ul className="lecture-list">
    //                             {section.lectures.map((lecture) => (
    //                               <LectureItem
    //                                 key={lecture.id}
    //                                 lecture={lecture}
    //                                 courseId={id}
    //                                 sectionId={section.id}
    //                               />
    //                             ))}
    //                           </ul>
    //                         ) : (
    //                           <p>No lectures available</p>
    //                         )}
    //                         <Link
    //                           to={`/add-lecture/${id}/${section.id}`}
    //                           className="btn btn-sm btn-primary mt-3"
    //                         >
    //                           <FeatherIcon icon="plus" className="me-2" />
    //                           <span>Add Lecture</span>
    //                         </Link>
    //                       </SectionContent>
    //                     )}
    //                   </SectionItem>
    //                 ))
    //               )}
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
      <CourseHeader activeMenu="SectionsList" />

      {/* Page Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">{courseTitle || "Course"}</h2>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link
                to={`/edit-course/${id}`}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 flex items-center"
              >
                <Feather size={16} className="mr-2" />
                Edit Course
              </Link>
              <Link
                to={`/add-section/${id}`}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Feather size={16} className="mr-2" />
                Add New Section
              </Link>
              <Link
                to={`/${role}/${role}-dashboard`}
                className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center"
              >
                <Feather size={16} className="mr-2" />
                Back
              </Link>
            </div>
          </div>

          {/* Sections List */}
          <div className="mt-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              {sections.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-600">
                    No sections available for this course.
                  </p>
                  <Link
                    to={`/add-section/${id}`}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                  >
                    Add New Section
                  </Link>
                </div>
              ) : (
                sections.map((section) => (
                  <div
                    key={section.id}
                    className="border-b last:border-none py-4"
                  >
                    {/* Section Header */}
                    <div className="flex justify-between items-center">
                      <h5 className="text-lg font-semibold">
                        {section.section_name}
                      </h5>
                      <div className="flex gap-2">
                        <Link
                          to={`/edit-section/${id}/${section.id}`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center text-sm"
                        >
                          <Feather size={14} className="mr-2" />
                          Edit
                        </Link>
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center text-sm"
                          onClick={() => toggleSection(section.id)}
                        >
                          {expandedSectionId === section.id ? (
                            <>
                              <Feather size={14} className="mr-2" />
                              Close
                            </>
                          ) : (
                            <>
                              <Feather size={14} className="mr-2" />
                              View
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Section Content */}
                    {expandedSectionId === section.id && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <h6 className="font-medium">Lectures:</h6>
                        {section.lectures && section.lectures.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {section.lectures.map((lecture) => (
                              <li key={lecture.id} className="text-gray-700">
                                {lecture.title}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No lectures available</p>
                        )}
                        <Link
                          to={`/add-lecture/${id}/${section.id}`}
                          className="mt-3 inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 text-sm"
                        >
                          <Feather size={14} className="mr-2" />
                          Add Lecture
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SectionsList;
