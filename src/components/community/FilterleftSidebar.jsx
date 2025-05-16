import { Link } from "react-router-dom";

const FilterleftSidebar = () => {
  return (
      <div className=" pd-right ">
          <div className="filters-outer text-center">
          <h4 className="">SPOT COURSES          </h4>
             <div className="flex-row flex justify-center">
             <img src="https://img.freepik.com/premium-vector/people-talking-discussing-together-vector-young-man-woman-people-talking-have-funny-discussion-planning-togetherness-characters-boy-girl-communication-flat-cartoon-illustration_87720-5022.jpg"
              className="rounded-full w-36 h-40 "
              alt="" />
             </div>

             <p className="text-xs my-2">
             Find and enroll in courses to enhance your skills, grow your expertise, and advance your career.
              </p>
               <Link to={'/courses'}>
              <button className="py-1 px-4 m-3 bg-blue-950 text-white">Get Started</button>
                 
               </Link>
          </div>
          <div className="filters-outer text-center bg-">
              
             <div className="flex-row flex justify-center">
             <img src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
              className="rounded-full w-28 h-28"
              alt="" />
             </div>

              <h6 className="m-3">AD 1</h6>
              {/* <p className="text-xs my-2">
              Discover and join groups with like-minded women who share your interests, profession, and lifestyle.
              </p> */}
              <button className="my-2 text-blue-950">Explore</button>
          </div>
          <div className="filters-outer text-center">
              
             <div className="flex-row flex justify-center">
             <img src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
              className="rounded-full w-28 h-28"
              alt="" />
             </div>

             <h6 className="m-3">AD 2</h6>
              {/* <p className="text-xs my-2">
             Get alerted when there are new employee reviews.
              </p> */}
              <button className="my-2 text-blue-950">Explore</button>
              
          </div>
      </div>
  );
};

export default FilterleftSidebar;
