import React from 'react';
const data = [
  "Talent matching",
  "Team collaboration tools",
  "Business payment solutions",
  "Dedicated account management",
]
const FiverrBusiness = () => {
  return (
    <div className='bg-[#0d084d] sm-md:flex-col flex justify-between sm:px-[20px] p-[100px]'>
    <div className='flex flex-col gap-[30px] sm:items-center'>
        <div className='text-white flex items-start '>
          <h1 className='sm:text-center text-[30px] font-bold tracking-[-2px] mr-1'>fiverr </h1> 
          <h1 className='sm:text-center text-[30px] font-medium tracking-[-2px]'>Business.</h1>
           <h1 className='bg-[#584AFF] text-[11px] mt-2  py-[1px] px-[10px] font-bold rounded-full ml-4'>NEW</h1>
        </div>
        <h1 className='sm:text-center text-[35px] text-white font-semibold'>A solution built for business</h1>
        <h1 className='sm:text-center text-[20px] text-white font-medium sm:w-full w-[70%]'>Upgrade to a curated experience to access vetted talent and exclusive tools</h1>
        <ul className=''>
          {data?.map((item , index) => (
              <div key={index}>
                <div  className='flex items-center gap-x-2 mb-3 '>
                 <span><svg fill="#888" width="26" height="26" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path><path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path></svg></span>
                   <span className='sm:text-centertext-[20px] font-bold text-white'>{item}</span>
                </div>
              </div>
                )
              )}
        </ul>

        <button className='text-white text-[18px] font-semibold bg-[var(--primaryColor)] w-[300px] py-[10px] rounded-[5px] hover:opacity-[0.9] transition-all'>Explore Fiverr Business</button>
      
    </div>

      <div>
        <img className='h-[500px] sm:hidden object-contain' src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png" alt="image" />
      </div>
      
    </div>
  );
}

export default FiverrBusiness;
