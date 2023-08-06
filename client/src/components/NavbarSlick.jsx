import React from "react";
import Slider from "react-slick";
import { Link, useLocation, useParams } from "react-router-dom";

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  if (!onClick) {
    return null; 
  }
  return (
    <div
      className={className + " z-10 left-[1px] "}
      style={{ ...style,backgroundColor: "white", borderRadius: "50%", padding: "25px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      <svg className="absolute left-2 top-2" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="34px" height="34px">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M15.59 7.41L14.17 6l-6 6 6 6 1.41-1.41L10.83 12l4.76-4.59z" />
      </svg>
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  if (!onClick) {
    return null; 
  }
  return (
    <div
      className={className + " z-10 right-[1px]"}
      style={{ ...style, backgroundColor: "white", borderRadius: "50%", padding: "25px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      <svg className="absolute left-2 top-2" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="34px" height="34px">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M8.41 16.59L9.83 18l6-6-6-6-1.41 1.41L13.17 12l-4.76 4.59z" />
      </svg>
    </div>
  );
}
const SecondNavBar = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Photography",
  "Business",
  "AI Services",
];
export default function NavbarSlick() {
  const location = useLocation();
  const {id} = useParams()
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 2,
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />,

      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
      
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    
    };
    return (
      <div>
      <Slider {...settings} className={`pl-[12px] w-full  mx-auto active2 sm:hidden   ${location.pathname === "/message/" + id && "hidden"}`}>
        {SecondNavBar?.map((item, index) => {
            return (
              <li
                key={index}
                className="mr-[20px]  relative  pt-[14px]  !w-[150px] text-[15px] font-medium h-[50px]  "
              >
                <Link to={""} className="hover:bg-[--primaryColor] !text-[--primaryColor]   hover:!text-white transition-all  flex rounded-md truncate justify-center  border border-[--primaryColor] " >{item}</Link>
              </li>
            );
          })}
        </Slider>
      </div>
    );
  }
