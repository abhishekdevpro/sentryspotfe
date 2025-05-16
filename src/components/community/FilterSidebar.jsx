// import { Constant } from "@/utils/constant/constant";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const FilterSidebar = () => {
//     const token = localStorage.getItem(Constant.USER_TOKEN); // Get token from local storage
//     const [user, setUser] = useState(null); // State to store fetched user data

//     // Function to fetch user profile
//     const fetchProfile = async () => {
//         try {
//             const response = await axios.get(
//                 "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
//                 {
//                     headers: {
//                         Authorization: token, // Attach token in request header
//                     },
//                 }
//             );


//             console.log("response",response.data.data.personal_details);
//             // Check for successful response
//             if (response.data.status === "success" || response.data.code === 200) {
//                 setUser(response.data.data.personal_details); // Set user data
//             }
//         } catch (error) {
//             console.error("Error fetching user profile:", error);
//         }
//     };

//     // Fetch user profile only if token exists
//     useEffect(() => {
//         if (token) {
//             fetchProfile();
//         }
//     },[token]);
//     console.log(user,"user bhuuu");
//     return (
//         <div className=" pd-right ">
//             {token?<div className="filters-outer text-center">
                
//                <div className="flex-row flex justify-center">
//                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
//                 className="rounded-full w-28 h-28"
//                 alt="" />
//                </div>

//                 <h4 className="m-3">{user.first_name}{" "}{user.last_name}</h4>
                
//             </div>:<div></div>}
//             <div className="filters-outer text-center bg-">
                
//                <div className="flex-row flex justify-center">
//                <img src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
//                 className="rounded-full w-28 h-28"
//                 alt="" />
//                </div>

//                 <Link to={'/job-list-v3'}>
//                 <h6 className="m-3">SPOT JOBS</h6>
//                 </Link>
//                 <p className="text-xs my-2">
//                 Discover and join groups with like-minded women who share your interests, profession, and lifestyle.
//                 </p>
//                 <button className="my-2 text-blue-950">Explore</button>
//             </div>
//             <div className="filters-outer text-center">
                
//                <div className="flex-row flex justify-center">
//                <img src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
//                 className="rounded-full w-28 h-28"
//                 alt="" />
//                </div>

//                <h6 className="m-3">COMPANIES YOU FOLLOW</h6>
//                 <p className="text-xs my-2">
//                Get alerted when there are new employee reviews.
//                 </p>
//                 <button className="my-2 text-blue-950">Explore</button>
                
//             </div>
//         </div>
//     );
// };

// export default FilterSidebar;
import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilterSidebar = () => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch user profile
    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data.status === "success" || response.data.code === 200) {
                setUser(response.data.data.personal_details);
                setError(null);
            } else {
                setError("Unable to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setError("Failed to load user profile");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user profile only if token exists
    useEffect(() => {
        if (token) {
            fetchProfile();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    // Render user name safely
    const renderUserName = () => {
        if (!user) return "User";
        return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    };

    // Render profile image with fallback
    const renderProfileImage = (defaultSrc) => {
        return `https://api.sentryspot.co.uk${user.photo}` || defaultSrc;
    };

    // Conditional rendering with loading and error states
    if (isLoading) {
        return (
            <div className="pd-right">
                <div className="filters-outer text-center">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pd-right">
            {token && user ? (
                <div className="filters-outer text-center">
                    <div className="flex-row flex justify-center">
                        <img 
                            src={renderProfileImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s")}
                            className="rounded-full w-28 h-28"
                            alt="Profile" 
                        />
                    </div>
                    <h4 className="m-3">{renderUserName()}</h4>
                </div>
            ) : null}

            <div className="filters-outer text-center bg-">
                <div className="flex-row flex justify-center">
                    <img 
                        src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
                        className="rounded-full w-28 h-28"
                        alt="Spot Jobs" 
                    />
                </div>
                
                    <h6 className="m-3">SPOT JOBS</h6>
                <p className="text-xs my-2">
                Discover and apply to jobs that align with your skills, interests, and professional goals.
                </p>
                <Link to='/job-list-v3'>
                   <button className="my-2 text-blue-950">Explore</button>
                </Link>
            </div>

            <div className="filters-outer text-center">
                <div className="flex-row flex justify-center">
                    <img 
                        src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
                        className="rounded-full w-28 h-28"
                        alt="Companies" 
                    />
                </div>
                <h6 className="m-3">SPOT COMPANIES</h6>
                <p className="text-xs my-2">
                Explore and connect with verified companies that match your career aspirations and values.
                </p>
                <Link to='/job-list-v7#tab2'>
                <button className="my-2 text-blue-950">Explore</button>
                </Link>
            </div>
        </div>
    );
};

export default FilterSidebar;