import  React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import NewRequest from "../../utils/NewRequest";
import Loading from "../../components/Loading";
const GigCard = ({ item }) => {
  const { isLoading, error, data:user } = useQuery({
    queryKey: "userId",
    queryFn: () => NewRequest(`users/${item?.userId}`).then((res) => res.data),
    enabled:!!item
  });
  if(isLoading) return <Loading/>
  if(error) return <div>error</div>
  const itemCover = item?.cover?.includes("https")
      ? item?.cover
      : item?.cover?.replace("http", "https");
      const userImg = user?.img?.includes("https")
      ? user?.img
      : user?.img?.replace("http", "https");
  return (
    <div>
      <Link
        key={item?._id}
        to={`/gig/${item?._id}`}
        className="flex flex-col gap-2 border-[1px] border-[#d2cccc] shadow-lg rounded-sm mt-[50px] w-[320px]  "
      >
        <div className="">
          <img
            className="w-full h-[250px] rounded-t-sm object-fill"
            src={
              itemCover ||
              "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
            }
            alt="img"
          />
        </div>
        <div className="px-6 flex flex-col gap-2">
          <div className=" flex items-center gap-3 ">
            <img
              className="rounded-full h-[40px] w-[40px] !object-cover  "
              src={
                userImg ||
                "/no_avatar.png"
              }
              alt="img"
            />
            <h1 className="font-semibold text-[#333]">
              {item?.username || "Lannie Coleman"}
            </h1>
          </div>
          <p className="truncate">
            {item?.title ||  "I will create a professional logo design for your brand"}
          </p>
          <div className="text-[#ffc108] flex items-center gap-1  ">
            <AiFillStar />
            <p className="text-[#444]">({item.starNumber})</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center px-6 ">
          <div>
            <AiFillHeart className="text-[#333] text-[20px]" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>STARTING AT</p>{" "}
            <p>
              {item?.price} <sup>99</sup>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;
