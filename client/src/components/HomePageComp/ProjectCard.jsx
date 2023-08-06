import React from 'react';
const ServiceCard = ({card}) => {
  return (
    <div 
    className='mr-[20px]  relative hover:opacity-[0.85] transition-all duration-500 cursor-pointer rounded-md '>
      <div className='h-[260px] w-full  rounded-t-md'>
        <img className='h-full w-full rounded-t-nd' src={card?.img} alt="service" />
      </div>
      <div  className='flex gap-[15px] py-[20px] pl-4 bg-white rounded-md  '>
        <div className=''>
          <img className='h-[50px] object-cover w-[50px] rounded-full' src={card?.subImg} alt="" />
          </div>
        <div className=''>
          <h1 className='font-semibold text-[#404040]'>{card?.title}</h1>
          <p className='text-gray-500'>by {card?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
