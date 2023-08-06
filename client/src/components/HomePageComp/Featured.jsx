import React, { useState } from "react";
import { useEffect } from "react";
import {BsSearch} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import { useNavigate } from "react-router";

const HeroBg = [
  {
    name: "andrea",
    prof: "Fashion Designer",
    url:
      "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/bg-hero-1-1792-x1.png",
  },
  {
    name: "moon",
    prof: "Web Developer",
    url:
      "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203045/bg-hero-2-1792-x1.png",
  },
  {
    name: "ritika",
    prof: "AI Artist",
    url:
      "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783966/bg-hero-3-1792-x1.png",
  },
  {
    name: "zach",
    prof: "Marketing Expert",
    url:
      "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/93085acc959671e9e9e77f3ca8147f82-1599427734108/bg-hero-4-1792-x1.png",
  },
  {
    name: "gabrielle",
    prof: "Video Editor",
    url:
      "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/bg-hero-5-1792-x1.png",
  },
];
const Popular = ["Website Design", "Logo Design", "AI Services"];
function Featured() {
  const [search, setsearch] = useState("");
  const [index, setindex] = useState(0);
  useEffect(() => {
   setInterval(() => {
      setindex((prevCount) => (prevCount + 1) % HeroBg.length);
    }, 5000);
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    navigate(`/gigs?search=${search}`);
  }
  return (
    <div
      style={{ backgroundImage: `url(${HeroBg[index].url})` }}
      className=" pt-[10vh] !bg-[#1a1b1d] sm-md:!bg-none bg-center bg-no-repeat	bg-cover h-[90vh] sm-md:h-[60vh]  w-full transition-all duration-1000"
    >
      <div className="h-[90vh] pl-[2%] w-[50%] flex flex-col items-start gap-[25px]  justify-center sm-md:justify-start sm-md:pt-[50px]  sm-md:w-[70%] sm-md:mx-auto">
        <h1 className="text-white sm:text-[20px] sm-md:text-center  lg-xl:text-[35px] xl:text-[45px] text-[30px] font-bold ">
          Find the perfect freelance services for your business
        </h1>
        <form onSubmit={handleSubmit} className="flex sm-md:flex-col sm-md:gap-3 items-center w-full ">
          <input
            type="text"
            onChange={(e) => setsearch(e.target.value)}
            className="p-[15px] sm-md:h-[45px] w-full rounded-md lg:rounded-none lg:rounded-l-md focus:outline-none"
            placeholder="Search for any service..."
          />
          <button className="px-[30px] sm-md:w-full flex rounded-md justify-center items-center h-full sm-md:h-[45px] text-white hover:bg-[#079e58] transition-all lg:rounded-none  lg:rounded-r-md bg-[#1dbf73]">
            <BsSearch />
          </button>
        </form>

        <ul className="w-full">
          <h6 className="inline-block text-white text-[15px] sm:block sm:text-center sm:mb-2 sm:text-[10px] font-semibold">
            Popular: &nbsp;
          </h6>

          {Popular.map((item, index) => (
            <li
              key={index}
              className="mb-2 inline-block border-[1px] mr-2 sm:!text-[8px] hover:bg-white transition-all hover:text-black cursor-pointer border-white rounded-full p-[5px] px-[10px] text-white text-[8px] sm-md:text-[10px] lg:text-[17px] font-semibold"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-[120px] sm-md:hidden right-[60px]">
        {(index%2 === 1) && <p className="flex gap-1 text-[var(--starColor)] text-[20px]">
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          </p>}
        <span className="font-[300] text-white capitalize">{HeroBg[index].name + ', ' }</span>
        <span className="font-bold text-white capitalize">{HeroBg[index].prof}</span>
      </div>
    </div>
  );
}

export default Featured;
