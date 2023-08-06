import React from 'react';
const Loading = () => {
  return (
    <div  className="fixed top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] flex items-center justify-center bg-white z-[10000] ">    
      <h1
        className={`fiverr font-extrabold tracking-[-3px] text-[60px] text-black  `}
      >
        kizerr
      </h1>
      <span className="relative flex h-3 w-3 mt-10 justify-center items-center ">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--primaryColor] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[--primaryColor]"></span>
      </span>
  </div>
   
   
  );
}

export default Loading;
