import React from 'react';
import { useState , useRef , useEffect } from 'react';
const data = [
  {
    title:"Stick to your budget",
    desc:"Find the right service for every price point. No hourly rates, just project-based pricing."
  },
  {
    title:"Get quality work done quickly",
    desc:"Hand your project over to a talented freelancer in minutes, get long-lasting results."
  },
  {
    title:"Pay when you're happy",
    desc:"Upfront quotes mean no surprises. Payments only get released when you approve."
  },
  {
    title:"Count on 24/7 support",
    desc:"Our round-the-clock support team is available to help anytime, anywhere."
  },
]



const BestPart = () => {
  const [playVideo , setplayVideo] = useState(false)
  const videoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (videoRef.current && !videoRef.current.contains(event.target)) {
        setplayVideo(false);
        document.body.style.overflow = "unset";
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [videoRef]);
  const bgHero = "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png";
  const videoBtn = "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/desktop-play-button.bab1740.png"
  return (
    <div className='min-h-[500px] sm:pl-4 bg-[#e5f5ed]  flex flex-col items-center lg:flex-row lg:items-start  py-[100px] px-[2%] mt-[100px] gap-[40px] '>
      <div className='flex flex-col gap-x-[20px] gap-y-[20px]  w-full '> 
        <h1 className='text-[35px] sm:text-[30px] font-bold text-[#1d1d1d] mb-2 '>The best Part? Everything.</h1>
        {data.map((item , index) => (
          <div key={index}>
            <div  className='flex items-center gap-x-2'>
             <span><svg fill="#444" width="26" height="26" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path><path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path></svg></span>
               <span className='text-[20px] font-bold '>{item.title}</span>
            </div>
               <p className='text-[20px] text-gray-500 max-w-[600px]'>{item.desc}</p>
          </div>
            )
          )}
      </div>
      <div style={{ backgroundImage: `url(${bgHero})`}} className='w-full  bg-center bg-contain sm-md:max-h-[600px] max-w-[100%]  bg-no-repeat    min-h-[500px] flex items-center justify-center pt-6 relative cursor-pointer'
       onClick={() => {
        setplayVideo(true)
        document.body.style.overflow = "hidden";
       }}
      >
        <img className='w-[100px] h-[100px]'  src={videoBtn} alt="" />
      </div>
     {playVideo && (
        <div className='fixed top-0 left-0 right-0 bottom-0 h-[100vh] w-[100vw] bg-[#00000080] z-[1002] flex justify-center items-center '>
          <video ref={videoRef} className='h-[500px] z-[1000]' src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7" controls autoPlay={true}>Your browser does not support HTML video</video>
    </div>
     )}




       
    </div>
  );
}

export default BestPart;
