import React from 'react';

const JoinFiver = () => {
  return (
    <div className='relative  w-[90%] mx-auto sm:mb-[30px] sm:mt-[50px] mb-[100px] '>
      <img className='bg-center bg-no-repeat	bg-fill w-full max-h-[350px]' src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png" alt="" />
    <div className='absolute sm:left-[10px] xl:left-[100px] xl:top-[100px] left-[30px] top-[30px] flex flex-col gap-[30px]  sm:gap-2'>
        <h1 className='text-[50px] sm:text-[20px] md:!text-[25px] md-lg:text-[40px] text-white'>Suddenly it&apos;s all so doable.</h1>
        <button className=' text-white text-[18px] px-3 font-semibold bg-[var(--primaryColor)] w-fit sm:p-2 sm:text-[12px] sm:py-2 py-[10px] rounded-[5px] hover:opacity-[0.9] transition-all'>Join Kizerr</button>
    </div>

    </div>
  );
} 

export default JoinFiver;
