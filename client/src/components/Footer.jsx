import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import {  ImPinterest2 } from "react-icons/im";
import { IoLogoInstagram } from "react-icons/io";
import { AiFillLinkedin } from "react-icons/ai";
import { BsUniversalAccessCircle } from "react-icons/bs";
import {TfiWorld} from "react-icons/tfi";
import {BiDollar} from "react-icons/bi";
import { useLocation } from "react-router";
import { useParams } from "react-router";
const Categories = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Data",
  "Business",
  "Lifestyle",
  "Photography",
  "End-to-End Projects",
  "Sitemap",
];
const About = [
  "Careers",
  "Press & News",
  "Partnerships",
  "Privacy Policy",
  "Terms of Service",
  "Intellectual Property Claims",
  "Investor Relations",
  "Contact Sales",
];
const Support = [
  "Help & Support",
  "Trust & Safety",
  "Selling on Kizerr",
  "Buying on Kizerr",
  "Kizerr Guides",
];
const Community = [
  "Community",
  "Customer Success Stories",
  "Community Hub",
  "Forum",
  "Events",
  "Blog",
  "Influencers",
  "Affiliates",
  "Podcast",
  "Invite a Friend",
  "Become a Seller",
  "Community Standards",
];

const More_From_Kizerr = [
  "Kizerr Enterprise",
  "Kizerr Business",
  "Kizerr Pro",
  "Kizerr Logo Maker",
  "Get Inspired",
  "Kizerr Select",
  "ClearVoice",
  "Content Marketing",
  "Kizerr Workspace",
  "Invoice Software",
  "Learn",
  "Online Courses",
  "Working Not Working",
];
const Footer = () => {
  const location = useLocation();
  const { id } = useParams();
  return (
    <div className={`${location.pathname === ('/message/' + id) && "hidden"}  `}>
      <hr className=" border-gray-300 sm:hidden" />
      <div className="px-[4%] pt-[2%]">
        <div className="grid grid-cols-5 md:grid-cols-3 sm:hidden gap-[20px]">
          <div>
            <h1 className="text-[#383838] font-bold text-[20px]">Categories</h1>
            <ul className="mt-[20px]">
              {Categories?.map((item, index) => (
                <li
                  key={index}
                  className="text-[#514f4f] text-[15px] mb-[10px] hover:text-[#1dbf73] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        
      
          <div>
            <h1 className="text-[#514f4f] font-bold text-[20px]">Community</h1>
            <ul className="mt-[20px]">
              {Community?.map((item, index) => (
                <li
                  key={index}
                  className="text-[#514f4f] text-[15px] mb-[10px] hover:text-[#1dbf73] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-[#514f4f] font-bold text-[20px]">
              More From Kizerr
            </h1>
            <ul className="mt-[20px]">
              {More_From_Kizerr?.map((item, index) => (
                <li
                  key={index}
                  className="text-[#514f4f] text-[15px] mb-[10px] hover:text-[#1dbf73] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-[#514f4f] font-bold text-[20px]">Support</h1>
            <ul className="mt-[20px]">
              {Support?.map((item, index) => (
                <li
                  key={index}
                  className="text-[#514f4f] text-[15px] mb-[10px] hover:text-[#1dbf73] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-[#514f4f] font-bold text-[20px]">About</h1>
            <ul className="mt-[20px]">
              {About?.map((item, index) => (
                <li
                  key={index}
                  className="text-[#514f4f] text-[15px] mb-[10px]   hover:text-[#1dbf73] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className=" border-gray-300 mt-[10px]" />

        
        <div className="py-[10px] flex justify-between sm-md:flex-col  ">
          <div className="flex gap-10 items-center">
            <div className="flex items-end">
              <h1 className="Kizerr text-[#555] font-extrabold tracking-[-3px]	 text-[40px]">
                kizerr
              </h1>
              <p className="text-[#555] pl-[10px] pb-[6px]">&reg;</p>
            </div>
            <p className=" text-[#939191] sm-md:text-[13px]">© Kizerr International Ltd. 2023</p>
          </div>
          <div className=" flex gap-[100px] ">
            <div className="flex items-center sm-md:mt-[10px] sm-md:mx-auto   ">
              <div className="flex gap-[20px]">
                <ImPinterest2 className=" cursor-pointer text-[20px] text-gray-600" />
                <AiOutlineTwitter className=" cursor-pointer text-[20px] text-gray-600" />
                <AiFillLinkedin className=" cursor-pointer text-[20px] text-gray-600" />
                <IoLogoInstagram  className=" cursor-pointer text-[20px] text-gray-600"/>
                <BsFacebook className=" cursor-pointer text-[20px] text-gray-600" />
              </div>
            </div>
            <div className="flex items-center gap-[20px] sm-md:hidden ">
              <p className="flex items-center gap-1 cursor-pointer text-[13px] text-gray-600"><TfiWorld/>English</p>
              <p className="cursor-pointer text-[13px] text-gray-600 flex items-center gap-1"><BiDollar/>USD</p>
              <p className="cursor-pointer text-[30px] text-gray-600 hover:text-gray-900">
                <BsUniversalAccessCircle />
              </p>
            </div>
            </div>
          </div>



      </div>
    </div>
  );
};

export default Footer;
