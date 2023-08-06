import {React , useState} from 'react';
import { Link } from 'react-router-dom';
const Careers = [
  {
    title:'Graphics & Design',
    img: "https://res.cloudinary.com/db9soo1qo/image/upload/v1689343628/jobsSvg/grahpic_nfqro4.svg"
  } ,
  {
    title:'Digital Marketing',
    img: "https://res.cloudinary.com/db9soo1qo/image/upload/v1689343629/jobsSvg/Digital_oakunp.svg",
  } ,
  {
    title:'Writing & Translation',
    img : "https://res.cloudinary.com/db9soo1qo/image/upload/v1689343631/jobsSvg/writing_ltlz6l.svg"
  },
  {
    title:'Video & Animation',
    img:"https://res.cloudinary.com/db9soo1qo/image/upload/v1689343630/jobsSvg/video_mtqkum.svg"
  },
  {
    title:'Music & Audio',
    img: "https://res.cloudinary.com/db9soo1qo/image/upload/v1689343629/jobsSvg/music_zs2hbz.svg"
  },
  {
    title:'Programming & Tech',
    img:"https://res.cloudinary.com/db9soo1qo/image/upload/v1689343630/jobsSvg/programming_qq58qh.svg"
  },
  {
    title:'Business',
    img :"https://res.cloudinary.com/db9soo1qo/image/upload/v1689343628/jobsSvg/business_vvid9j.svg"
  },
  {
    title: "Photography",
    img:"https://res.cloudinary.com/db9soo1qo/image/upload/v1689343630/jobsSvg/photo_skuamg.svg"
  },
  {
    title: "Data",
    img: "https://res.cloudinary.com/db9soo1qo/image/upload/v1689343629/jobsSvg/data_qhzfru.svg"
  },
  {
    title: "Lifestyle",
    img : "https://res.cloudinary.com/db9soo1qo/image/upload/v1689343629/jobsSvg/lifestyle_bdaygo.svg"
  }
]
const Career = () => {
  const [isHovering, setIsHovering] = useState("");
  const [currItem, setCurrItem] = useState("");
  return (
    <div className='my-[100px]'>
      <h1 className='w-[90%] mx-auto sm:text-[30px] text-[35px] font-bold text-[#292929]'>You need it, we&apos;ve got it</h1>
      <ul className='grid grid-cols-5 md-lg:grid-cols-4 md:!grid-cols-3 sm:!grid-cols-2  gap-8 w-[80%] mx-auto mt-[50px] '>
        {Careers.map((item , index) => (
          <Link
           onMouseOver={() => {
            setIsHovering("borderBottom");
            setCurrItem(index);
           }}
            onMouseLeave={() => {
              setIsHovering("");
            }}

          to={"/"} key={index} className='flex flex-col justify-center items-center'>
            <img className={`h-[50px] w-[50px]`} src={item.img} alt="" />
            <hr className={`w-[50px] border-[1px] ${index === currItem ? isHovering : ""}`} />
            <h3 className='mt-1 sm:text-[13px]'>{item.title}</h3>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Career;
