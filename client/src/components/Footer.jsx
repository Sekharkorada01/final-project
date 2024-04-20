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
  "Selling on Freelance",
  "Buying on Freelance",
  "Freelance Guides",
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

const More_From_Freelance = [
  "Freelance Enterprise",
  "Freelance Business",
  "Freelance Pro",
  "Freelance Logo Maker",
  "Get Inspired",
  "Freelance Select",
  "ClearVoice",
  "Content Marketing",
  "Freelance Workspace",
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
      
        <hr className=" border-gray-300 mt-[10px]" />

        
        <div className="py-[10px] flex justify-between sm-md:flex-col  ">
          <div className="flex gap-10 items-center">
            <div className="flex items-end">
              <h1 className="FreelanceWorkplace text-[#555] font-extrabold tracking-[-3px]	 text-[40px]">
                FreelanceWorkplace
              </h1>
              <p className="text-[#555] pl-[10px] pb-[6px]">&reg;</p>
            </div>
            <p className=" text-[#939191] sm-md:text-[13px]">© Avanthi Institution Ltd. 2023</p>
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
