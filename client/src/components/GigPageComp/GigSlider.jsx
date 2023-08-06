import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " z-10  "}
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
  return (
    <div
      className={className + " z-10"}
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

const SlickSlider = ({children}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    
    
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      
    
    ]
  };
    return (
      <div className="">
        <Slider {...settings} className="max-w-[60%] w-full max-1200:mx-auto max-1200:max-w-[800px] mt-[20px]">
        {children}
        </Slider>
        
          
      </div>
    );
  }



export default SlickSlider;
