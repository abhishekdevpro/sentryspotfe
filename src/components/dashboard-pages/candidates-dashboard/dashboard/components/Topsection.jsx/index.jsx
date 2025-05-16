import React from 'react';

import './Home.css'
import Home_Image from './Home_Image';
import image from './homeimage1.jpg'
// import image1 from './homeimage1.png'

const TopSection = () => {   
  return (
    <div className=" min-w-screen  rounded-lg mb-10 text-black" id='bghome'>   
      <main className="p-2 md:px-10">
        <section>
        {/* <SlidingText/>   */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl bg-white/50">
            <div className=" p-5 rounded">
                <div className=' text-center text-xl font-semibold'>Resumes</div>
                <Home_Image/>
              {/* <img src="https://clearanceresume.ai/static/media/1.75ff0ba8c05a1fb690b3.png" alt="Resume 1" /> */}
            </div>
            <div className=" p-5 rounded">
            <div className=' text-center text-xl font-semibold'>Introduction</div>
              {/* <video src={video} alt="Resume 2" autoPlay loop 
                muted 
                playsInline className=' h-[370px]' /> */}
                <img src={image} alt="" />
            </div>
            <div className=" p-5 rounded">
            <div className=' text-center text-xl font-semibold'>Certification</div>
              <img src={image} alt="Resume 3" className=' h-[380px]' />
            </div>
          </div>
        </section>
        
      </main>

         {/* <div className=' '>
            <h1 className=' font-bold text-3xl text-white text-center py-5'>Verify Your Skills </h1>
            <div className=' text-white flex flex-wrap justify-evenly py-5'>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> C++</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> React</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> Java</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> Angular</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> Javascript</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> Tailwind/Bootstrap</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> Javascript</div>
                <div className='  shadow-lg bg-gray-600 px-3 py-2 rounded-lg font-bold'> Tailwind/Bootstrap</div>
            </div>
         </div> */}



      {/* <div className=' py-3 bg-gray-700'>
        
            <h1 className=' text-end px-5 ' id='group'><i className="fa-solid fa-circle-info"></i></h1>
            <div className='  text-gray-200 text-center font-semibold py-2' id='live'> Scheduled to be Live on 29th July 2024, Monday</div>
            <div className=' px-4 md:px-10 flex flex-wrap gap-3'>
            <div className=' border-2 border-gray-500 text-gray-500  w-[300px] flex flex-col gap-2 align-middle px-3 py-4 rounded-xl '>
                <div className=' flex flex-col gap-3 rounded-xl  bg-gray-700 px-3 py-4'>
                    <div className=' flex justify-between '>
                        <div className=' border-2 px-4 text-gray-500 py-1 rounded-full'>20 May</div>
                        <div className=' bg-white px-2 py-1 rounded-full  text-gray-500'><i class="fa-solid fa-arrow-down"></i></div>
                    </div>
                    <div>Amazon</div>
                    <div className=' font-bold text-gray-500 text-2xl'>Senior UI/UX Designer</div>
                    <div className=' flex gap-3'>
                        <div className=' border-2 border-gray-500 text-gray-500 rounded-md px-1 py-1'>Part Time</div>
                        <div className=' border-2 border-gray-500 text-gray-500 rounded-md px-1 py-1'>Senior Level</div>
                    </div>
                    <div className=' flex gap-3' >
                        <div className=' border-2 border-gray-500 text-gray-500  rounded-md px-1 py-1'>Distant</div>
                        <div className=' border-2 border-gray-500 text-gray-500 rounded-md px-1 py-1'>Project Work</div>
                    </div>
                </div>
                <div className=' flex justify-between '>
                    <div> $250/hr </div>
                    <div className=' border-2 px-2 py-2 bg-white border-gray-500 text-gray-500  rounded-2xl'><button>Details</button></div>
                </div>
            </div>
            <div className=' border-2 border-gray-500 text-gray-500  w-[300px] flex flex-col gap-2 align-middle  px-3 py-4 rounded-xl '>
                <div className=' flex flex-col gap-3 rounded-xl  bg-gray-700 px-3 py-4'>
                    <div className=' flex justify-between '>
                        <div className=' border-2 px-4 py-1 rounded-full text-gray-500'>20 May</div>
                        <div className=' bg-white px-2 py-1 rounded-full  text-gray-500'><i class="fa-solid fa-arrow-down"></i></div>
                    </div>
                    <div>Amazon</div>
                    <div className=' font-bold text-2xl text-gray-500'>Senior UI/UX Designer</div>
                    <div className=' flex gap-3'>
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Part Time</div>
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Senior Level</div>
                    </div>
                    <div className=' flex gap-3' >
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Distant</div>
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Project Work</div>
                    </div>
                </div>
                <div className=' flex justify-between '>
                    <div> $250/hr </div>
                    <div className=' border-2 px-2 py-2 bg-white  text-gray-500 rounded-2xl' ><button>Details</button></div>
                </div>
            </div>
            <div className='  border-2 border-gray-500 text-gray-500 w-[300px] flex flex-col gap-2 align-middle  px-3 py-4 rounded-xl '>
                <div className=' flex flex-col gap-3 rounded-xl  bg-gray-700 px-3 py-4'>
                    <div className=' flex justify-between '>
                        <div className=' border-2 px-4 py-1 text-gray-500 rounded-full'>20 May</div>
                        <div className=' bg-white px-2 py-1 text-gray-500 rounded-full '><i class="fa-solid fa-arrow-down"></i></div>
                    </div>
                    <div>Amazon</div>
                    <div className=' font-bold text-gray-500 text-2xl'>Senior UI/UX Designer</div>
                    <div className=' flex gap-3'>
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Part Time</div>
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Senior Level</div>
                    </div>
                    <div className=' flex gap-3' >
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Distant</div>
                        <div className=' border-2 rounded-md text-gray-500 px-1 py-1'>Project Work</div>
                    </div>
                </div>
                <div className=' flex justify-between '>
                    <div> $250/hr </div>
                    <div className=' border-2 px-2 py-2 bg-white text-gray-500  rounded-2xl'><button>Details</button></div>
                </div>
            </div>
        </div>
      </div> */}
      
      {/* <div className=' px-3 py-5'>
        <div className=' flex gap-5 flex-wrap justify-center'>
            <div className=' flex flex-col gap-4 '>
                <div className=' border-2 px-2 py-2 text-2xl font-bold'>LINKEDIN - LINK - VERIFIED - LAST VERIFY DATE - COIN</div>
                <div className=' border-2 px-2 py-2 text-2xl font-bold'>Google - LINK - VERIFIED - LAST VERIFY DATE - COIN</div>
            </div>
            <div className=' border-2 flex flex-col px-6 py-6 items-center'>
                <div>LinkedIn</div>
                <div>Google</div>
            </div>
        </div>
      </div> */}
      
    </div>
  );
}

export default TopSection;
