
// // import React, { useState } from "react";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import {
// //   Card,
// //   CardContent,
// // } from "@/components/ui/card";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Constant } from "@/utils/constant/constant";

// // const InsideCognizant = ({ companyData }) => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [activeTab, setActiveTab] = useState("culture");
// //   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
// //   const [tempImageFiles, setTempImageFiles] = useState({
// //     cultureImgs: Array(3).fill(null),
// //     peopleImgs: Array(3).fill(null),
// //     workplaceImgs: Array(3).fill(null),
// //   });
  
// //   const [formData, setFormData] = useState({
// //     cultureText: "Culture description here.",
// //     cultureImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     peopleText: "People description here.",
// //     peopleImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     workplaceText: "Workplace description here.",
// //     workplaceImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //   });

// //   const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
// //   const BASEIMAGEURL = "https://api.sentryspot.co.uk";
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// //   // Upload field names for each tab
// //   const uploadFieldNames = {
// //     culture: "inside_culture_images_upload",
// //     people: "inside_people_images_upload",
// //     workplace: "inside_workplace_images_upload"
// //   };

// //   const toggleEdit = () => {
// //     setIsEditing(!isEditing);
// //     if (!isEditing) {
// //       setTempImageFiles({
// //         cultureImgs: Array(3).fill(null),
// //         peopleImgs: Array(3).fill(null),
// //         workplaceImgs: Array(3).fill(null),
// //       });
// //     }
// //   };

// //   const openImageModal = (index) => {
// //     setSelectedImageIndex(index);
// //     setShowModal(true);
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const previewUrl = URL.createObjectURL(file);
      
// //       setTempImageFiles(prev => ({
// //         ...prev,
// //         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
// //           i === selectedImageIndex ? file : item
// //         )
// //       }));

// //       setFormData(prev => ({
// //         ...prev,
// //         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) =>
// //           i === selectedImageIndex ? previewUrl : item
// //         )
// //       }));
// //     }
// //     setShowModal(false);
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       const updatedImages = { ...formData };
      
// //       // Upload only the changed images
// //       for (const tab of ['culture', 'people', 'workplace']) {
// //         const files = tempImageFiles[`${tab}Imgs`];
// //         const updatedUrls = [...formData[`${tab}Imgs`]];
        
// //         for (let i = 0; i < files.length; i++) {
// //           if (files[i]) {
// //             const formDataObj = new FormData();
// //             // Use the correct upload field name for each tab
// //             formDataObj.append(uploadFieldNames[tab], files[i]);
// //             formDataObj.append("image_indexes", i.toString());

// //             const apiUrl = `${BASEURL}/company-inside-${tab}`;
// //             const response = await fetch(apiUrl, {
// //               method: "PATCH",
// //               headers: {
// //                 Authorization: `${token}`,
// //               },
// //               body: formDataObj,
// //             });

// //             if (!response.ok) {
// //               throw new Error(`Failed to upload ${tab} image ${i}`);
// //             }

// //             const data = await response.json();
            
// //             if (data.image_url) {
// //               updatedUrls[i] = `${BASEIMAGEURL}${data.image_url}`;
// //             }
// //           }
// //         }
        
// //         updatedImages[`${tab}Imgs`] = updatedUrls;
// //       }

// //       setFormData(updatedImages);

// //       setTempImageFiles({
// //         cultureImgs: Array(3).fill(null),
// //         peopleImgs: Array(3).fill(null),
// //         workplaceImgs: Array(3).fill(null),
// //       });
      
// //       setIsEditing(false);
// //     } catch (error) {
// //       console.error("Update failed:", error);
// //     }
// //   };

// //   const getImageUrl = (tab, index) => {
// //     const backendImages = {
// //       culture: companyData.inside_culture_images,
// //       people: companyData.inside_people_images,
// //       workplace: companyData.inside_workplace_images
// //     };

// //     const images = backendImages[tab];
// //     return images && images[index] 
// //       ? `${BASEIMAGEURL}${images[index]}` 
// //       : formData[`${tab}Imgs`][index];
// //   };

// //   return (
// //     <section className="inside-cognizant">
// //       <div className="auto-container w-[90%]">
// //         <div className="sec-title text-center">
// //           <p className="font-bold text-xl sm:text-3xl text-black">
// //             Inside {companyData.company_name}
// //           </p>
// //         </div>

// //         <button onClick={toggleEdit} className="text-white bg-blue-950 border p-2 rounded-lg px-4">
// //           {isEditing ? "Cancel" : "Edit"}
// //         </button>

// //         <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle" 
// //               onValueChange={(value) => setActiveTab(value)}>
// //           <div className="w-full flex justify-center">
// //             <TabsList className="grid w-[600px] grid-cols-3 bg-none">
// //               <TabsTrigger value="culture">Culture</TabsTrigger>
// //               <TabsTrigger value="people">People</TabsTrigger>
// //               <TabsTrigger value="workplace">Workplace</TabsTrigger>
// //             </TabsList>
// //           </div>

// //           <TabsContent value="culture">
// //             <Card className="w-full grid grid-cols-2 gap-2">
// //               <div>
// //                 <div className="relative h-full">
// //                   <img 
// //                     src={getImageUrl('culture', 2)} 
// //                     alt="Culture 3" 
// //                     className="object-fit w-full h-full"
// //                   />
// //                   {isEditing && (
// //                     <button
// //                       onClick={() => openImageModal(2)}
// //                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                     >
// //                       Change Image
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="grid grid-rows-2 gap-2">
// //                 {[0, 1].map((index) => (
// //                   <div key={index} className="relative">
// //                     <img 
// //                       src={getImageUrl('culture', index)} 
// //                       alt={`Culture ${index + 1}`} 
// //                       className="w-full h-[250px]"
// //                     />
// //                     {isEditing && (
// //                       <button
// //                         onClick={() => openImageModal(index)}
// //                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                       >
// //                         Change Image
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="people">
// //             <Card className="w-full grid grid-cols-2 gap-2">
// //               <div>
// //                 <div className="relative h-full">
// //                   <img 
// //                     src={getImageUrl('people', 2)} 
// //                     alt="People 3" 
// //                     className="object-fit w-full h-full"
// //                   />
// //                   {isEditing && (
// //                     <button
// //                       onClick={() => openImageModal(2)}
// //                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                     >
// //                       Change Image
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="grid grid-rows-2 gap-2">
// //                 {[0, 1].map((index) => (
// //                   <div key={index} className="relative">
// //                     <img 
// //                       src={getImageUrl('people', index)} 
// //                       alt={`People ${index + 1}`} 
// //                       className="w-full h-[250px]"
// //                     />
// //                     {isEditing && (
// //                       <button
// //                         onClick={() => openImageModal(index)}
// //                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                       >
// //                         Change Image
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="workplace">
// //             <Card className="w-full grid grid-cols-2 gap-2">
// //               <div>
// //                 <div className="relative  h-full" >
// //                   <img 
// //                     src={getImageUrl('workplace', 2)} 
// //                     alt="Workplace 3" 
// //                     className="object-fill w-full h-full"
// //                   />
// //                   {isEditing && (
// //                     <button
// //                       onClick={() => openImageModal(2)}
// //                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                     >
// //                       Change Image
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="grid grid-rows-2 gap-2">
// //                 {[0, 1].map((index) => (
// //                   <div key={index} className="relative">
// //                     <img 
// //                       src={getImageUrl('workplace', index)} 
// //                       alt={`Workplace ${index + 1}`} 
// //                       className="w-full h-[250px]"
// //                     />
// //                     {isEditing && (
// //                       <button
// //                         onClick={() => openImageModal(index)}
// //                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                       >
// //                         Change Image
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </TabsContent>
// //         </Tabs>

// //         {isEditing && (
// //           <button
// //             onClick={handleUpdate}
// //             className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
// //           >
// //             Update
// //           </button>
// //         )}

// //         <Dialog open={showModal} onOpenChange={setShowModal}>
// //           <DialogContent>
// //             <DialogHeader>
// //               <DialogTitle>Change Image</DialogTitle>
// //             </DialogHeader>
// //             <div className="p-4">
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 className="w-full"
// //               />
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </section>
// //   );
// // };

// // export default InsideCognizant;

// import React, { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Constant } from "@/utils/constant/constant";

// const InsideCognizant = ({ companyData }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("culture");
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [tempImageFiles, setTempImageFiles] = useState({
//     cultureImgs: Array(3).fill(null),
//     peopleImgs: Array(3).fill(null),
//     workplaceImgs: Array(3).fill(null),
//   });
  
//   const [formData, setFormData] = useState({
//     cultureText: "Culture description here.",
//     cultureImgs: [
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//     ],
//     peopleText: "People description here.",
//     peopleImgs: [
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//     ],
//     workplaceText: "Workplace description here.",
//     workplaceImgs: [
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//     ],
//   });

//   const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
//   const BASEIMAGEURL = "https://api.sentryspot.co.uk";
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const uploadFieldNames = {
//     culture: "inside_culture_images_upload",
//     people: "inside_people_images_upload",
//     workplace: "inside_workplace_images_upload"
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setTempImageFiles({
//         cultureImgs: Array(3).fill(null),
//         peopleImgs: Array(3).fill(null),
//         workplaceImgs: Array(3).fill(null),
//       });
//     }
//   };

//   const openImageModal = (index) => {
//     setSelectedImageIndex(index);
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
      
//       setTempImageFiles(prev => ({
//         ...prev,
//         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
//           i === selectedImageIndex ? file : item
//         )
//       }));

//       setFormData(prev => ({
//         ...prev,
//         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) =>
//           i === selectedImageIndex ? previewUrl : item
//         )
//       }));
//     }
//     setShowModal(false);
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedImages = { ...formData };
      
//       for (const tab of ['culture', 'people', 'workplace']) {
//         const files = tempImageFiles[`${tab}Imgs`];
//         const updatedUrls = [...formData[`${tab}Imgs`]];
        
//         for (let i = 0; i < files.length; i++) {
//           if (files[i]) {
//             const formDataObj = new FormData();
//             formDataObj.append(uploadFieldNames[tab], files[i]);
//             formDataObj.append("image_indexes", i.toString());

//             const apiUrl = `${BASEURL}/company-inside-${tab}`;
//             const response = await fetch(apiUrl, {
//               method: "PATCH",
//               headers: {
//                 Authorization: `${token}`,
//               },
//               body: formDataObj,
//             });

//             if (!response.ok) {
//               throw new Error(`Failed to upload ${tab} image ${i}`);
//             }

//             const data = await response.json();
            
//             if (data.image_url) {
//               updatedUrls[i] = `${BASEIMAGEURL}${data.image_url}`;
//             }
//           }
//         }
        
//         updatedImages[`${tab}Imgs`] = updatedUrls;
//       }

//       setFormData(updatedImages);
//       setTempImageFiles({
//         cultureImgs: Array(3).fill(null),
//         peopleImgs: Array(3).fill(null),
//         workplaceImgs: Array(3).fill(null),
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   const getImageUrl = (tab, index) => {
//     const backendImages = {
//       culture: companyData.inside_culture_images,
//       people: companyData.inside_people_images,
//       workplace: companyData.inside_workplace_images
//     };

//     const images = backendImages[tab];
//     return images && images[index] 
//       ? `${BASEIMAGEURL}${images[index]}` 
//       : formData[`${tab}Imgs`][index];
//   };

//   return (
//     <section className="inside-cognizant">
//       <div className="auto-container w-[90%] mx-auto">
//         <div className="sec-title text-center mb-6">
//           <p className="font-bold text-xl sm:text-3xl text-black">
//             Inside {companyData.company_name}
//           </p>
//         </div>

//         <div className="flex justify-end mb-4">
//           <button 
//             onClick={toggleEdit} 
//             className="text-white bg-blue-950 border p-2 rounded-lg px-4"
//           >
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>

//         <Tabs 
//           defaultValue="culture" 
//           className="w-full flex flex-col justify-center align-middle" 
//           onValueChange={(value) => setActiveTab(value)}
//         >
//           <div className="w-full flex justify-center mb-6">
//             <TabsList className="grid w-full sm:w-[600px] grid-cols-3 bg-none">
//               <TabsTrigger value="culture">Culture</TabsTrigger>
//               <TabsTrigger value="people">People</TabsTrigger>
//               <TabsTrigger value="workplace">Workplace</TabsTrigger>
//             </TabsList>
//           </div>

//           <TabsContent value="culture">
//             <Card className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 <div className="relative h-auto lg:h-full">
//                   <img 
//                     src={getImageUrl('culture', 2)} 
//                     alt="Culture 3" 
//                     className="w-full h-[300px] lg:h-full object-cover"
//                   />
//                   {isEditing && (
//                     <button
//                       onClick={() => openImageModal(2)}
//                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                     >
//                       Change Image
//                     </button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
//                   {[0, 1].map((index) => (
//                     <div key={index} className="relative">
//                       <img 
//                         src={getImageUrl('culture', index)} 
//                         alt={`Culture ${index + 1}`} 
//                         className="w-full h-[250px] object-cover"
//                       />
//                       {isEditing && (
//                         <button
//                           onClick={() => openImageModal(index)}
//                           className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                         >
//                           Change Image
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </TabsContent>

//           <TabsContent value="people">
//             <Card className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 <div className="relative h-auto lg:h-full">
//                   <img 
//                     src={getImageUrl('people', 2)} 
//                     alt="People 3" 
//                     className="w-full h-[300px] lg:h-full object-cover"
//                   />
//                   {isEditing && (
//                     <button
//                       onClick={() => openImageModal(2)}
//                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                     >
//                       Change Image
//                     </button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
//                   {[0, 1].map((index) => (
//                     <div key={index} className="relative">
//                       <img 
//                         src={getImageUrl('people', index)} 
//                         alt={`People ${index + 1}`} 
//                         className="w-full h-[250px] object-cover"
//                       />
//                       {isEditing && (
//                         <button
//                           onClick={() => openImageModal(index)}
//                           className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                         >
//                           Change Image
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </TabsContent>

//           <TabsContent value="workplace">
//             <Card className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 <div className="relative h-auto lg:h-full">
//                   <img 
//                     src={getImageUrl('workplace', 2)} 
//                     alt="Workplace 3" 
//                     className="w-full h-[300px] lg:h-full object-cover"
//                   />
//                   {isEditing && (
//                     <button
//                       onClick={() => openImageModal(2)}
//                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                     >
//                       Change Image
//                     </button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
//                   {[0, 1].map((index) => (
//                     <div key={index} className="relative">
//                       <img 
//                         src={getImageUrl('workplace', index)} 
//                         alt={`Workplace ${index + 1}`} 
//                         className="w-full h-[250px] object-cover"
//                       />
//                       {isEditing && (
//                         <button
//                           onClick={() => openImageModal(index)}
//                           className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                         >
//                           Change Image
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {isEditing && (
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleUpdate}
//               className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
//             >
//               Update
//             </button>
//           </div>
//         )}

//         <Dialog open={showModal} onOpenChange={setShowModal}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Change Image</DialogTitle>
//             </DialogHeader>
//             <div className="p-4">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full"
//               />
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// };

// export default InsideCognizant;



import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Constant } from "@/utils/constant/constant";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const InsideCompany = ({ companyData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [availableTabs, setAvailableTabs] = useState([]);
  const navigate = useNavigate()
  const [tempImageFiles, setTempImageFiles] = useState({
    cultureImgs: Array(3).fill(null),
    peopleImgs: Array(3).fill(null),
    workplaceImgs: Array(3).fill(null),
  });
  
  const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
  const BASEIMAGEURL = "https://api.sentryspot.co.uk";
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const uploadFieldNames = {
    culture: "inside_culture_images_upload",
    people: "inside_people_images_upload",
    workplace: "inside_workplace_images_upload"
  };

  // Determine which tabs should be visible based on data availability
  useEffect(() => {
    const tabs = [];
    
    if (companyData?.inside_culture_images?.some(img => img)) {
      tabs.push("culture");
    }
    
    if (companyData?.inside_people_images?.some(img => img)) {
      tabs.push("people");
    }
    
    if (companyData?.inside_workplace_images?.some(img => img)) {
      tabs.push("workplace");
    }
    
    setAvailableTabs(tabs);
    
    // Set default active tab to the first available one
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0]);
    }
  }, [companyData]);

  // If there are no tabs to show and we're not editing, don't render anything
  if (availableTabs.length === 0 && !isEditing) {
    return null;
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempImageFiles({
        cultureImgs: Array(3).fill(null),
        peopleImgs: Array(3).fill(null),
        workplaceImgs: Array(3).fill(null),
      });
    }
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && activeTab) {
      setTempImageFiles(prev => ({
        ...prev,
        [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
          i === selectedImageIndex ? file : item
        )
      }));
    }
    setShowModal(false);
  };

  const handleUpdate = async () => {
    try {
      // Add all tabs to available tabs when editing
      if (isEditing) {
        const allTabs = ["culture", "people", "workplace"];
        const updatedTabs = new Set([...availableTabs]);
        
        for (const tab of allTabs) {
          if (tempImageFiles[`${tab}Imgs`].some(file => file)) {
            updatedTabs.add(tab);
          }
        }
        
        setAvailableTabs([...updatedTabs]);
      }
      
      // Upload all changed images to the backend
      for (const tab of ['culture', 'people', 'workplace']) {
        const files = tempImageFiles[`${tab}Imgs`];
        
        for (let i = 0; i < files.length; i++) {
          if (files[i]) {
            const formDataObj = new FormData();
            formDataObj.append(uploadFieldNames[tab], files[i]);
            formDataObj.append("image_indexes", i.toString());

            const apiUrl = `${BASEURL}/company-inside-${tab}`;
            const response = await fetch(apiUrl, {
              method: "PATCH",
              headers: {
                Authorization: `${token}`,
              },
              body: formDataObj,
            });

            if (!response.ok) {
              throw new Error(`Failed to upload ${tab} image ${i}`);
            }
          }
        }
      }

      // Reset temporary files and exit edit mode
      setTempImageFiles({
        cultureImgs: Array(3).fill(null),
        peopleImgs: Array(3).fill(null),
        workplaceImgs: Array(3).fill(null),
      });
      setIsEditing(false);
      
      // You might want to refresh the company data here
      // by calling an API or triggering a parent component refresh
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const getImageUrl = (tab, index) => {
    const backendImages = {
      culture: companyData?.inside_culture_images || [],
      people: companyData?.inside_people_images || [],
      workplace: companyData?.inside_workplace_images || []
    };

    // Show default image when in edit mode and no image exists yet
    if (isEditing && (!backendImages[tab] || !backendImages[tab][index])) {
      return "/api/placeholder/400/300";
    }

    const images = backendImages[tab];
    return images && images[index] 
      ? `${BASEIMAGEURL}${images[index]}` 
      : "/api/placeholder/400/300";
  };

  // If we're editing, show all tabs; otherwise, show only tabs with content
  const tabsToShow = isEditing ? ["culture", "people", "workplace"] : availableTabs;
  
  // If there are no tabs to show and we're not editing, don't render the section
  if (tabsToShow.length === 0 && !isEditing) {
    return null;
  }
  const handleEditClick =()=>{
    navigate('/employers-dashboard/company-profile/?edit=images')

  }

  return (
    <section className="inside-company py-12">
      <div className="auto-container w-[90%] mx-auto">
        <div className="sec-title text-center mb-6">
          <p className="font-bold text-xl sm:text-3xl text-black">
            Inside {companyData?.company_name || "Company"}
          </p>
        </div>

        <div className="flex justify-end mb-4">
       
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-200 font-medium rounded-md px-5 py-2.5 flex items-center gap-2"
                  onClick={() => handleEditClick()}
                >
                  <Edit />
                  Edit 
                </button>
        </div>

        {tabsToShow.length > 0 && (
          <Tabs 
            value={activeTab || tabsToShow[0]} 
            className="w-full flex flex-col justify-center align-middle" 
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="w-full flex justify-center mb-6">
              <TabsList className={`grid ${tabsToShow.length === 1 ? 'w-[200px]' : tabsToShow.length === 2 ? 'w-[400px] grid-cols-2' : 'w-full sm:w-[600px] grid-cols-3'}`}>
                {tabsToShow.includes("culture") && (
                  <TabsTrigger value="culture">Culture</TabsTrigger>
                )}
                {tabsToShow.includes("people") && (
                  <TabsTrigger value="people">People</TabsTrigger>
                )}
                {tabsToShow.includes("workplace") && (
                  <TabsTrigger value="workplace">Workplace</TabsTrigger>
                )}
              </TabsList>
            </div>

            {tabsToShow.includes("culture") && (
              <TabsContent value="culture">
                <Card className="w-full border-none shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative h-auto lg:h-full">
                      <img 
                        src={getImageUrl('culture', 2)} 
                        alt="Culture 3" 
                        className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => openImageModal(2)}
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="relative">
                          <img 
                            src={getImageUrl('culture', index)} 
                            alt={`Culture ${index + 1}`} 
                            className="w-full h-[250px] object-cover rounded-lg"
                          />
                          {isEditing && (
                            <button
                              onClick={() => openImageModal(index)}
                              className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )}

            {tabsToShow.includes("people") && (
              <TabsContent value="people">
                <Card className="w-full border-none shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative h-auto lg:h-full">
                      <img 
                        src={getImageUrl('people', 2)} 
                        alt="People 3" 
                        className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => openImageModal(2)}
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="relative">
                          <img 
                            src={getImageUrl('people', index)} 
                            alt={`People ${index + 1}`} 
                            className="w-full h-[250px] object-cover rounded-lg"
                          />
                          {isEditing && (
                            <button
                              onClick={() => openImageModal(index)}
                              className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )}

            {tabsToShow.includes("workplace") && (
              <TabsContent value="workplace">
                <Card className="w-full border-none shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative h-auto lg:h-full">
                      <img 
                        src={getImageUrl('workplace', 2)} 
                        alt="Workplace 3" 
                        className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => openImageModal(2)}
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="relative">
                          <img 
                            src={getImageUrl('workplace', index)} 
                            alt={`Workplace ${index + 1}`} 
                            className="w-full h-[250px] object-cover rounded-lg"
                          />
                          {isEditing && (
                            <button
                              onClick={() => openImageModal(index)}
                              className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        )}

        {isEditing && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleUpdate}
              className="mt-6 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              Update
            </button>
          </div>
        )}

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Image</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default InsideCompany;